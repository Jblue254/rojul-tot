import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, addDoc, collection, Timestamp, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";
import { Calendar, Phone, Info, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

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
  const [bookedDates, setBookedDates] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Get today's date formatted as YYYY-MM-DD to set minimum selection constraints
  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const machineSnap = await getDoc(doc(db, "machines", id));

        if (machineSnap.exists()) {
          setMachine({
            id: machineSnap.id,
            ...machineSnap.data(),
          });
        }

        const q = query(
          collection(db, "hireRequests"),
          where("machineId", "==", id)
        );

        const requestSnap = await getDocs(q);
        const requests = requestSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter out rejected requests from causing frontend visual noise
        const activeBookings = requests.filter(req => req.status !== "Rejected");
        setBookedDates(activeBookings);
      } catch (error) {
        console.error("Error fetching hiring context:", error);
      }
    };

    fetchData();
  }, [id]);

  // Dynamic cost calculation based on days selected
  const calculateTotalCost = () => {
    if (!hireDate || !returnDate || !machine) return 0;
    const start = new Date(hireDate);
    const end = new Date(returnDate);
    const timeDiff = end.getTime() - start.getTime();
    if (timeDiff < 0) return 0;

    // Convert milliseconds to days (minimum 1 day block tracking)
    const days = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1);
    
    // Assuming an operational 8-hour workday factor for standard rate scaling
    const rate = machine.pricePerHour || machine.price || 0;
    return days * 8 * rate;
  };

  const totalCost = calculateTotalCost();

  const submitRequest = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!phoneNumber.trim()) {
  alert("Please enter your phone number.");
  return;
}

if (!hireDate || !returnDate) {
  alert("Please select hire and return dates.");
  return;
}

if (phoneNumber.length < 10) {
  alert("Please enter a valid phone number.");
  return;
}

    const startDate = new Date(hireDate);
    const endDate = new Date(returnDate);

    if (startDate > endDate) {
      alert("Return date must be on or after the hire date.");
      return;
    }

    let overlapFound = false;
    bookedDates.forEach((booking) => {
      if (booking.hireDate && booking.returnDate) {
        const bookedStart = booking.hireDate.toDate();
        const bookedEnd = booking.returnDate.toDate();

        const overlap = startDate <= bookedEnd && endDate >= bookedStart;
        if (overlap) overlapFound = true;
      }
    });

    if (overlapFound) {
      alert("This machine is already reserved for the selected dates.");
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, "hireRequests"), {
        userId: user.uid,
        fullName: user.displayName || user.name || "Valued Client",
        email: user.email,
        phoneNumber,
        machineId: machine.id,
        machineName: machine.machineName,
        hireDate: Timestamp.fromDate(startDate),
        returnDate: Timestamp.fromDate(endDate),
        estimatedCost: totalCost,
        status: "Pending",
        createdAt: Timestamp.now(),
      });

      alert("Your hire request has been submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating rental transaction:", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!machine) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slate-50">
        <UserNavbar />
        <div className="flex-grow flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-[#1495CC]" />
          <p className="text-slate-500 font-medium">Loading asset specifics...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <UserNavbar />
      <section className="bg-[#F8FAFC] py-12 lg:py-20 min-h-[calc(100vh-80px)]">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDE: MACHINE DETAILS CARD */}
            <div className="lg:col-span-5 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden sticky top-6">
              <img
                src={machine.image || "/images/fallback-placeholder.png"}
                alt={machine.machineName}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#1495CC]/15 text-[#1495CC] mb-3">
                  {machine.category || "Heavy Machinery"}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {machine.machineName}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {machine.description}
                </p>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Base Rental Rate</p>
                    <p className="text-xl font-black text-slate-900 mt-0.5">
                      KSh {(machine.pricePerHour || machine.price || 0).toLocaleString()} <span className="text-sm font-normal text-slate-500">/ hr</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <ShieldCheck className="w-4 h-4" /> Fully Insured
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: HIRE ORDER SCHEDULING FORM */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Secure Rental Allocation
              </h1>
              <p className="text-slate-500 text-sm mb-8">
                Complete the configuration scheduling metrics down below to queue validation.
              </p>

              <div className="space-y-6">
                {/* Contact Input */}
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g., +254 700 000000"
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#1495CC]/20 focus:border-[#1495CC] transition placeholder:text-slate-300"
                  />
                </div>

                {/* Date Inputs Container */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" /> Desired Start Date *
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={hireDate}
                      onChange={(e) => setHireDate(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#1495CC]/20 focus:border-[#1495CC] text-slate-700 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" /> Intended Return Date *
                    </label>
                    <input
                      type="date"
                      min={hireDate || todayStr}
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#1495CC]/20 focus:border-[#1495CC] text-slate-700 font-medium"
                    />
                  </div>
                </div>

                {/* Real-time Dynamic Cost Summary */}
                {totalCost > 0 && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between animate-fadeIn">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Estimated Work Total</p>
                      <p className="text-xs text-slate-500 mt-0.5">(Based on standard 8-hour daily run limits)</p>
                    </div>
                    <p className="text-2xl font-black text-[#1495CC]">
                      KSh {totalCost.toLocaleString()}
                    </p>
                  </div>
                )}

                {/* Unavailable Date Blocks Alert */}
                {bookedDates.length > 0 && (
                  <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4">
                    <h3 className="font-bold text-amber-800 text-sm flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      Unavailable Blocks Alert
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {bookedDates.map((booking) => (
                        <div key={booking.id} className="text-xs font-semibold text-amber-700 bg-white border border-amber-100 px-3 py-1.5 rounded-xl flex items-center justify-between">
                          <span>{booking.hireDate?.toDate().toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                          <ArrowRight className="w-3 h-3 text-amber-400 mx-1" />
                          <span>{booking.returnDate?.toDate().toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Submit */}
                <button
                  onClick={submitRequest}
                  disabled={submitting}
                  className="w-full bg-[#1495CC] hover:bg-[#1185B5] disabled:bg-slate-300 text-white py-4 rounded-xl font-bold shadow-md shadow-[#1495CC]/10 hover:shadow-lg transition flex items-center justify-center gap-2 text-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Request...
                    </>
                  ) : (
                    "Submit Hire Request"
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>
      <Footer />
    </>
  );
}

export default HireMachine;