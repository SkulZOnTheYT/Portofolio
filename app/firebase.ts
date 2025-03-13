import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.apiKey || "",
    authDomain: process.env.authDomain || "",
    projectId: process.env.projectID || "",
    storageBucket: process.env.storageBucket || "",
    messagingSenderId: process.env.messagingSenderId || "",
    appId: process.env.appId || "",
    measurementId: process.env.measurementId || "",
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth };