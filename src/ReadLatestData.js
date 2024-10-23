// ReadData.js
import { db } from './firebaseconfig';
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

async function readLatestData() {
  const q = query(collection(db, "locations"), orderBy("timestamp", "desc"), limit(1));
  const querySnapshot = await getDocs(q);
  const latestData = querySnapshot.docs.map(doc => doc.data());
  return latestData[0];
}


export default readLatestData;
