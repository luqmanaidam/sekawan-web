import { Timestamp, doc, setDoc } from 'firebase/firestore';
import firebaseApps from './Firebase'

async function insertBooking(bookingData) {
    

    const data = {
        bookingId: bookingData.bookingId,
        brideName: bookingData.bride,
        groomName: bookingData.groom,
        package:{
            service: bookingData.service,
            package: bookingData.package,
        },
        bookingDate: Timestamp.fromDate(new Date()),
        event: {
            eventDate:bookingData.eventDate,
            startTime: bookingData.startTime,
            endTime: bookingData.endTime,
            eventAddress: bookingData.eventAddress,
        },
        email: bookingData.email,
        phoneWA: bookingData.phoneWA,
        brideInstagram: bookingData.brideInstagram,
        groomInstagram: bookingData.groomInstagram,
        vendorInstagram: bookingData.vendorInstagram,
        price: bookingData.price,
        minimalDp: bookingData.minimalDp
      };
    
      try {
        await setDoc(doc(firebaseApps.db, "booking", bookingData.bookingId), data);
        console.log("Document booking written with ID: ", bookingData.bookingId);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
}

export default insertBooking;



