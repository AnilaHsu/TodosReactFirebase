import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { config } from "./firebaseConfig"


export function initFirebase() {

  // Replace the following with your app's Firebase project configuration
  const firebaseConfig = config();
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore  and get a reference to the service
  const db = getFirestore(app);
  return db;
}

