import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyApQE1fj9y1gNIHwa-qn-oNVz6jkN-i6FI",
    authDomain: "skulz-website.firebaseapp.com",
    projectId: "skulz-website",
    storageBucket: "skulz-website.firebasestorage.app",
    messagingSenderId: "778278481733",
    appId: "1:778278481733:web:b9374b1e334ffe3a9b582c",
    measurementId: "G-2S2Z954MGS"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)