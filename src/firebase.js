// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBqsvlrTB5tkO85DOqPWIv4Z_B7MliCe78",
  authDomain: "rojul-tot.firebaseapp.com",
  projectId: "rojul-tot",
  storageBucket: "rojul-tot.firebasestorage.app",
  messagingSenderId: "210584621989",
  appId: "1:210584621989:web:11231c010be4bec12ece4c",
  measurementId: "G-88WXEJVVMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);