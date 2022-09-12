// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCW8Q-ss9B_Ls4QywYfkKkQteBUG8Cpm1s",
  authDomain: "todoapp-a8544.firebaseapp.com",
  projectId: "todoapp-a8544",
  storageBucket: "todoapp-a8544.appspot.com",
  messagingSenderId: "558289622052",
  appId: "1:558289622052:web:87828d4ecb8f64526374b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)