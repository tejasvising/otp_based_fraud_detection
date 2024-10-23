// ReadData.js
import { db } from './firebaseconfig';
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";


async function readLatestOtp() {
    const q = query(collection(db, "otpcollector"), orderBy("timestamp", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    const latestData = querySnapshot.docs.map(doc => doc.data());
    return latestData[0].otp;
  }


export default readLatestOtp;
