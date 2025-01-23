import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyApQE1fj9y1gNIHwa-qn-oNVz6jkN-i6FI",
  authDomain: "skulz-website.firebaseapp.com",
  projectId: "skulz-website",
  storageBucket: "skulz-website.firebasestorage.app",
  messagingSenderId: "778278481733",
  appId: "1:778278481733:web:b9374b1e334ffe3a9b582c",
  measurementId: "G-2S2Z954MGS",
}

// Initialize Firebase
const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      })
    : getApps()[0]

export const firestore = getFirestore(app)