// StoreData.js
import { db } from './firebaseconfig';
import { collection, addDoc } from "firebase/firestore";

async function storeData(otp) {
  try {
    const docRef = await addDoc(collection(db, "otpcollector"), {
      otp,
      timestamp: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default storeData;
