import React from 'react'
import {createContext,useContext,useEffect,useState,} from "react";
import { auth, db } from "@/services/firebase";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,updateProfile,} from "firebase/auth";
import {doc,setDoc,getDoc,serverTimestamp,} from "firebase/firestore";


function AuthContext() {
  return (
    <div>

    </div>
  )
}

export default AuthContext