import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, addDoc, collection, Timestamp, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";
import { Calendar, Phone, Info, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

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

  // Custom Toast State Management
  const [toast, setToast] = useState({ show: false, message: "", type: "info" });

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "info" });
    }, 4000); // Automatically closes after 4 seconds
  };

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

        const activeBookings = requests.filter(
          (req) => req.status === "Pending" || req.status === "Approved"
        );
        setBookedDates(activeBookings);
      } catch (error) {
        console.error("Error fetching hiring context:", error);
      }
    };

    fetchData();
  }, [id]);

  const parseLocalMidnight = (dateStr) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split("-");
    return new Date(year, month - 1, day, 0, 0, 0, 0);
  };

  const calculateTotalCost = () => {
    if (!hireDate || !returnDate || !machine) return 0;
    
    const start = parseLocalMidnight(hireDate);
    const end = parseLocalMidnight(returnDate);
    
    const timeDiff = end.getTime() - start.getTime();
    if (timeDiff < 0) return 0;

    const days = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1);
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
      showToast("Please enter your phone number.", "warning");
      return;
    }
    if (!hireDate || !returnDate) {
      showToast("Please select hire and return dates.", "warning");
      return;
    }
    if (phoneNumber.replace(/\D/g, "").length < 10) {
      showToast("Please enter a valid phone number.", "warning");
      return;
    }

    const startDate = parseLocalMidnight(hireDate);
    const endDate = parseLocalMidnight(returnDate);

    if (startDate > endDate) {
      showToast("Return date must be on or after the hire date.", "warning");
      return;
    }

    setSubmitting(true);

    try {
      const existingQuery = query(
        collection(db, "hireRequests"),
        where("userId", "==", user.uid),
        where("machineId", "==", machine.id),
        where("status", "==", "Pending")
      );
      
      const existingRequests = await getDocs(existingQuery);
      if (!existingRequests.empty) {
        showToast("You already have a pending request submitted for this asset.", "warning");
        setSubmitting(false);
        return;
      }

      let overlapFound = false;
      bookedDates.forEach((booking) => {
        if (booking.hireDate && booking.returnDate) {
          const bookedStart = booking.hireDate.toDate();
          const bookedEnd = booking.returnDate.toDate();

          bookedStart.setHours(0,0,0,0);
          bookedEnd.setHours(0,0,0,0);

          const overlap = startDate <= bookedEnd && endDate >= bookedStart;
          if (overlap) overlapFound = true;
        }
      });

      if (overlapFound) {
        showToast("This machinery asset is already reserved for those selected dates.", "warning");
        setSubmitting(false);
        return;
      }

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

      showToast("Your hire request has been submitted successfully", "success");
      
      setTimeout(() => {
        navigate("/products");
      }, 2000);
      
    } catch (error) {
      console.error("Error creating rental transaction:", error);
      showToast("Failed to submit request. Please try again.", "error");
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

      {/* FIXED TOASTER NOTIFICATION BOX CONTAINER */}
      {toast.show && (
        <div className="fixed top-24 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3 bg-white border-l-4 border-[#1495CC] shadow-2xl rounded-r-2xl p-4 max-w-md min-w-[320px]">
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-[#1495CC] flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-[#1495CC] flex-shrink-0" />
            )}
            <p className="text-sm font-semibold text-slate-700 leading-snug">
              {toast.message}
            </p>
          </div>
        </div>
      )}

      <section className="bg-[#F8FAFC] py-12 lg:py-20 min-h-[calc(100vh-80px)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* DETAILS BLOCK CARD */}
            <div className="lg:col-span-5 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden lg:sticky lg:top-6">
              <img
                src={machine.image || "/images/fallback-placeholder.png"}
                alt={machine.machineName}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#1495CC]/15 text-[#1495CC] mb-3">
                  {machine.category || "Machinery Asset"}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {machine.machineName}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {machine.description}
                </p>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                      Base Rental Rate
                    </p>
                    <p className="text-xl font-black text-slate-900 mt-0.5">
                      KSh {(machine.pricePerHour || machine.price || 0).toLocaleString()}
                      <span className="text-sm font-normal text-slate-500"> / hr</span>
                    </p>
                  </div>

                  <div
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      machine.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {machine.status}
                  </div>
                </div>
              </div>
            </div>

            {/* FORM PROCESSOR */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Secure Rental Allocation
              </h1>
              <p className="text-slate-500 text-sm mb-8">
                Complete the configuration scheduling metrics down below to queue validation.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" /> Phone Number 
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 0700000000"
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#1495CC]/20 focus:border-[#1495CC] transition placeholder:text-slate-300"
                  />
                </div>

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

                {totalCost > 0 && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Estimated Work Total</p>
                      <p className="text-xs text-slate-500 mt-0.5">(Based on standard 8-hour daily run limits)</p>
                    </div>
                    <p className="text-2xl font-black text-[#1495CC]">
                      KSh {totalCost.toLocaleString()}
                    </p>
                  </div>
                )}

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

                <button
                  onClick={submitRequest}
                  disabled={submitting}
                  className="w-full bg-[#1495CC] hover:bg-[#1185B5] disabled:bg-slate-300 text-white py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 text-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Submission...
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