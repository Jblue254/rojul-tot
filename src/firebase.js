import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqsvlrTB5tkO85DOqPWIv4Z_B7MliCe78",
  authDomain: "rojul-tot.firebaseapp.com",
  projectId: "rojul-tot",
  storageBucket: "rojul-tot.firebasestorage.app",
  messagingSenderId: "210584621989",
  appId: "1:210584621989:web:11231c010be4bec12ece4c",
  measurementId: "G-88WXEJVVMB",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;