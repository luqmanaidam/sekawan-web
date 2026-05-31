require('dotenv').config();
const express = require('express');
const cors = require('cors');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const FirebaseAuthStrategy = require('./whatsapp-firebase-auth');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.WHATSAPP_SERVER_PORT || 4000;
const ADMIN_NUMBER = process.env.WHATSAPP_ADMIN_NUMBER;
const SESSION_ID = process.env.WHATSAPP_SESSION_ID || 'sekawan-admin';
const SERVICE_ACCOUNT_PATH = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!ADMIN_NUMBER) {
  console.error('Missing WHATSAPP_ADMIN_NUMBER environment variable');
}

// Initialize Firebase auth strategy
let authStrategy;
try {
  authStrategy = new FirebaseAuthStrategy(SESSION_ID, SERVICE_ACCOUNT_PATH);
} catch (error) {
  console.error('Failed to initialize Firebase auth strategy:', error.message);
  process.exit(1);
}

const client = new Client({
  authStrategy: authStrategy,
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

let isReady = false;

client.on('qr', (qr) => {
  console.log('WhatsApp QR code received');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  isReady = true;
  console.log('WhatsApp client ready');
});

client.on('authenticated', (session) => {
  console.log('WhatsApp client authenticated');
  if (authStrategy && typeof authStrategy.saveSession === 'function') {
    authStrategy.saveSession(session).catch((error) => {
      console.error('Failed to save session after authentication:', error);
    });
  }
});

client.on('auth_failure', (msg) => {
  console.error('WhatsApp auth failure:', msg);
});

client.on('disconnected', (reason) => {
  isReady = false;
  console.warn('WhatsApp client disconnected:', reason);
  client.initialize();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', ready: isReady });
});

app.post('/api/send-booking', async (req, res) => {
  if (!ADMIN_NUMBER) {
    return res.status(500).json({ error: 'WHATSAPP_ADMIN_NUMBER is not configured' });
  }

  if (!isReady) {
    return res.status(503).json({ error: 'WhatsApp client is not ready yet' });
  }

  const booking = req.body || {};
  const number = `${ADMIN_NUMBER.replace(/[^0-9]/g, '')}@c.us`;

  const messageLines = [
    '*Booking Baru*',
    '',
    `*Nama Paket:* ${booking.package || booking.packageTitle || '-'}`,
    `*Harga:* ${booking.price || '-'}`,
    `*Minimal DP:* ${booking.minimalDp || '-'}`,
    '',
    `*Nama Pengantin Wanita:* ${booking.brideValue || booking.bride || '-'}`,
    `*Nama Pengantin Pria:* ${booking.groomValue || booking.groom || '-'}`,
    `*Lokasi Acara:* ${booking.addressValue || booking.eventAddress || '-'}`,
    `*Tanggal Acara:* ${booking.dateValue || booking.eventDate || '-'}`,
    `*Mulai:* ${booking.startValue || booking.startTime || '-'}`,
    `*Selesai:* ${booking.endValue || booking.endTime || '-'}`,
    `*Email:* ${booking.emailValue || booking.email || '-'}`,
    `*No. Whatsapp:* ${booking.waValue || booking.phoneWA || '-'}`,
    `*IG Pengantin Wanita:* ${booking.igBrideValue || booking.brideInstagram || '-'}`,
    `*IG Pengantin Pria:* ${booking.igGroomValue || booking.groomInstagram || '-'}`,
    `*IG Vendor:* ${booking.igVendorValue || booking.vendorInstagram || '-'}`,
    `*Catatan:* ${booking.noteValue || booking.note || '-'}`,
  ];

  const message = messageLines.join('\n');

  try {
    const response = await client.sendMessage(number, message);
    res.json({ ok: true, messageId: response.id._serialized });
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
    res.status(500).json({ error: error.message || 'Failed to send WhatsApp message' });
  }
});

client.initialize();

app.listen(PORT, () => {
  console.log(`WhatsApp server listening on http://localhost:${PORT}`);
});
