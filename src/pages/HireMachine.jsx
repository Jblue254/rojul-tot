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
  const [phoneNumber, setPhoneNumber] = useState("");
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

  const submitRequest = async () => {

  if (!user) {
    navigate("/login");
    return;
  }

  try {

    await addDoc(collection(db,"hireRequests"),{

      fullName:user.name,
      email:user.email,
      phoneNumber,

      machineId:machine.id,
      machineName:machine.machineName,

      hireDate:Timestamp.fromDate(new Date(hireDate)),
      returnDate:Timestamp.fromDate(new Date(returnDate)),

      status:"Pending",
      createdAt:Timestamp.now()

    });

    alert("Hire request submitted!");

    navigate("/products");

  } catch(error){

    console.error(error);

  }

};

  return (
    <>
      <UserNavbar />
       <section className="bg-[#F8FAFC] py-16">

<div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-lg">

<h1 className="text-3xl font-bold mb-6">
Hire {machine.machineName}
</h1>

<div className="space-y-6">

<div>

<label className="block mb-2 font-medium">
Machine
</label>

<input
type="text"
value={machine.machineName}
disabled
className="w-full border rounded-xl p-3 bg-gray-100"
/>

</div>
<div>
  <label className="block mb-2 font-medium">
    Phone Number
  </label>

  <input
    type="tel"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    placeholder="Enter your phone number"
    className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#1495CC]"
  />
</div>

<div>

<label className="block mb-2 font-medium">
Hire Date
</label>

<input
type="date"
value={hireDate}
onChange={(e)=>setHireDate(e.target.value)}
className="w-full border rounded-xl p-3"
/>

</div>

<div>

<label className="block mb-2 font-medium">
Return Date
</label>

<input
type="date"
value={returnDate}
onChange={(e)=>setReturnDate(e.target.value)}
className="w-full border rounded-xl p-3"
/>

</div>

<button
onClick={submitRequest}
className="w-full bg-[#1495CC] text-white py-4 rounded-xl font-semibold"
>
Submit Hire Request
</button>

</div>

</div>

</section>
      

      <Footer />
    </>
  );
}

export default HireMachine;