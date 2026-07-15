import React from 'react'
import {createContext,useContext,useEffect,useState,} from "react";
import { auth, db } from "@/services/firebase";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,updateProfile,} from "firebase/auth";
import {doc,setDoc,getDoc,serverTimestamp,} from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  const register = async (name, email, password) => {
    // Create Firebase Authentication account
    const userCredential = await createUserWithEmailAndPassword(auth,email,password);

    const firebaseUser = userCredential.user;

    // Update Firebase Authentication profile
    await updateProfile(firebaseUser, {displayName: name,});

    
    const personalDetails = {
      uid: firebaseUser.uid,
      name,
      email,
      role: "user",
      wishlist: [],
      createdAt: serverTimestamp(),
    };

    
    await setDoc(
      doc(db, "users", firebaseUser.uid),
      personalDetails
    );


    setUser(personalDetails);

    return firebaseUser;
  };


  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseUser = userCredential.user;

    const userDoc = await getDoc(
      doc(db, "users", firebaseUser.uid)
    );

    if (userDoc.exists()) {
      setUser(userDoc.data());
    }
  return (
    <div>

    </div>
  )
}

export default AuthContext