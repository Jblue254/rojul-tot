import {createContext,useContext,useEffect,useState} from "react";
import { auth, db } from "@/firebase";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,updateProfile} from "firebase/auth";
import {doc,setDoc,getDoc,serverTimestamp} from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const register = async (name, email, password) => {
    // Create Firebase Authentication account
    const userCredential = await createUserWithEmailAndPassword(auth,email,password);
    const firebaseUser = userCredential.user;
    

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


     setUser({ ...personalDetails, createdAt: new Date() });

    return firebaseUser;
  };


  const login = async (email, password) => {
  try {
    // Authenticate user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseUser = userCredential.user;

    // Get user details from Firestore
    const userDoc = await getDoc(
      doc(db, "users", firebaseUser.uid)
    );

    if (!userDoc.exists()) {
      throw new Error("User details not found.");
    }

    const personalDetails = userDoc.data();

    setUser(personalDetails);

    return personalDetails;

  } catch (error) {
    switch (error.code) {
      case "auth/invalid-credential":
        throw new Error("Invalid email or password.");

      case "auth/invalid-email":
        throw new Error("Please enter a valid email address.");

      case "auth/too-many-requests":
        throw new Error("Too many login attempts. Please try again later.");

      default:
        throw new Error("Unable to sign in.");
    }
  }
};

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (!firebaseUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        try {
          const userDoc = await getDoc(
            doc(db, "users", firebaseUser.uid)
          );

          if (userDoc.exists()) {
            setUser(userDoc.data());
          }
        } catch (error) {
          console.error("Authentication Error:", error);
        }

        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const value = {user,loading,login,register,logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}
