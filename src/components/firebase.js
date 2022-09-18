
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "todoapp-a8544.firebaseapp.com",
  projectId: "todoapp-a8544",
  storageBucket: "todoapp-a8544.appspot.com",
  messagingSenderId: "558289622052",
  appId: "1:558289622052:web:87828d4ecb8f64526374b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const auth = getAuth();