import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";

import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";

function HireMachine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [machine, setMachine] = useState(null);

  const [hireDate, setHireDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    const fetchMachine = async () => {
      const snap = await getDoc(doc(db, "machines", id));

      if (snap.exists()) {
        setMachine({
          id: snap.id,
          ...snap.data(),
        });
      }
    };

    fetchMachine();
  }, [id]);

  if (!machine) return <p>Loading...</p>;

  return (
    <>
      <UserNavbar />

      

      <Footer />
    </>
  );
}

export default HireMachine;