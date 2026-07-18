import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";

function PurchasePlan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [plan, setPlan] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");
  
  // Custom Toast State Management
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 4000);
  };

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const snap = await getDoc(doc(db, "plans", id));

        if (snap.exists()) {
          setPlan({
            id: snap.id,
            ...snap.data(),
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlan();
  }, [id]);

  if (!plan) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slate-50">
        <UserNavbar />
        <div className="flex-grow flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-[#1495CC]" />
          <p className="text-slate-500 font-medium">Loading plan details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const submitRequest = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!phoneNumber.trim()) {
      showToast("Please enter your phone number.");
      return;
    }

    try {
      await addDoc(collection(db, "planRequests"), {
        userId: user.uid,
        fullName: user.displayName || user.name || "",
        email: user.email || "",
        phoneNumber,
        planId: plan.id,
        planName: plan.planName,
        category: plan.category,
        price: plan.price,
        notes,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      showToast("Plan request submitted successfully");

      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } catch (error) {
      console.error(error);
      showToast("Failed to submit request. Please try again.");
    }
  };

  return (
    <>
      <UserNavbar />

      {/* TEXT-ONLY BLUE TOASTER */}
      {toast.show && (
        <div className="fixed top-24 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-white border-l-4 border-[#1495CC] shadow-2xl rounded-r-2xl p-4 max-w-md min-w-[320px]">
            <p className="text-sm font-semibold text-slate-700 leading-snug">
              {toast.message}
            </p>
          </div>
        </div>
      )}

      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-lg">

          <h1 className="text-3xl font-bold mb-6">
            Request {plan.planName}
          </h1>

          <div className="space-y-6">

            <div>
              <label className="block mb-2 font-medium">
                Plan Name
              </label>
              <input
                type="text"
                value={plan.planName}
                disabled
                className="w-full border rounded-xl p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Price
              </label>
              <input
                type="text"
                value={`KSh ${plan.price}`}
                disabled
                className="w-full border rounded-xl p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Phone Number
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Additional Notes
              </label>
              <textarea
                rows="4"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any extra information..."
                className="w-full border rounded-xl p-3"
              />
            </div>

            <button
              onClick={submitRequest}
              className="w-full bg-[#4ED088] text-white py-4 rounded-xl font-semibold transition hover:opacity-90"
            >
              Submit Request
            </button>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default PurchasePlan;