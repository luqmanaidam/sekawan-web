const path = require('path');
const fs = require('fs');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const { RemoteAuth } = require('whatsapp-web.js');

class FirebaseRemoteStore {
  constructor({ db, bucket, dataPath, storageFolder = 'wwebjs_sessions' }) {
    this.db = db;
    this.bucket = bucket;
    this.dataPath = dataPath;
    this.storageFolder = storageFolder;
  }

  // Called by RemoteAuth after compressing session to `${dataPath}/${session}.zip`
  async save({ session }) {
    const localZip = path.join(this.dataPath, `${session}.zip`);
    const dest = `${this.storageFolder}/${session}.zip`;

    if (!fs.existsSync(localZip)) {
      throw new Error(`Local session zip not found: ${localZip}`);
    }

    const file = this.bucket.file(dest);
    await this.bucket.upload(localZip, { destination: dest });

    // Optionally keep a small metadata doc in Firestore
    await this.db.collection('whatsapp_sessions').doc(session).set(
      {
        sessionName: session,
        storagePath: dest,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  }

  // Download the zip from storage to the provided path
  async extract({ session, path: destinationPath }) {
    const src = `${this.storageFolder}/${session}.zip`;
    const file = this.bucket.file(src);
    const [exists] = await file.exists();
    if (!exists) {
      throw new Error(`Remote session not found in storage: ${src}`);
    }
    await file.download({ destination: destinationPath });
  }

  async sessionExists({ session }) {
    const src = `${this.storageFolder}/${session}.zip`;
    const file = this.bucket.file(src);
    const [exists] = await file.exists();
    return exists;
  }

  async delete({ session }) {
    const src = `${this.storageFolder}/${session}.zip`;
    const file = this.bucket.file(src);
    const [exists] = await file.exists();
    if (exists) await file.delete().catch(() => {});
    await this.db.collection('whatsapp_sessions').doc(session).delete().catch(() => {});
  }
}

class FirebaseAuthStrategy extends RemoteAuth {
  constructor(sessionId = 'sekawan-admin', serviceAccountPath) {
    // We'll initialize Firebase first
    const { db, bucket, dataPath } = FirebaseAuthStrategy.initFirebase(serviceAccountPath);

    const store = new FirebaseRemoteStore({ db, bucket, dataPath });

    // Pass store to RemoteAuth
    super({ clientId: sessionId, store, dataPath, backupSyncIntervalMs: 60000 });
  }

  static initFirebase(serviceAccountPath) {
    let serviceAccount;
    if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
      serviceAccount = require(serviceAccountPath);
    } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      } catch (err) {
        throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT JSON');
      }
    } else {
      throw new Error('Provide FIREBASE_SERVICE_ACCOUNT env var or serviceAccountPath');
    }

    // Determine storage bucket
    const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || `${serviceAccount.project_id}.appspot.com`;

    const app = initializeApp({
      credential: cert(serviceAccount),
      storageBucket,
    });

    const db = getFirestore(app);
    const storage = getStorage(app);
    const bucket = storage.bucket(storageBucket);

    // Use same dataPath as RemoteAuth default
    const dataPath = path.resolve('./.wwebjs_auth/');

    console.log('Firebase initialized for RemoteAuth store');
    return { db, bucket, dataPath };
  }
}

module.exports = FirebaseAuthStrategy;
