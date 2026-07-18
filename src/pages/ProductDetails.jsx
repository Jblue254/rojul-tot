import React from 'react'
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Loader2, ArrowLeft, ShieldCheck, Hammer, Sparkles } from "lucide-react";
import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Try Machines first
        let document = await getDoc(doc(db, "machines", id));

        if (document.exists()) {
          setProduct({
            id: document.id,
            type: "Machine",
            ...document.data(),
          });
          setLoading(false);
          return;
        }

        // Try Plans next
        document = await getDoc(doc(db, "plans", id));

        if (document.exists()) {
          setProduct({
            id: document.id,
            type: "Plan",
            ...document.data(),
          });
        }
      } catch (error) {
        console.error("Error retrieving product details:", error);
      }
      setLoading(false);
    };
    
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slate-50">
        <UserNavbar />
        <div className="flex-grow flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-[#1495CC]" />
          <p className="text-slate-500 font-medium">Fetching details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slate-50">
        <UserNavbar />
        <div className="flex-grow flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
          <Link to="/products" className="flex items-center gap-2 text-[#1495CC] font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isMachine = product.type === "Machine";
  const productName = isMachine ? product.machineName : product.planName;
  const isReserved = product.status === "Reserved";

  return (
    <>
      <UserNavbar />
      <section className="bg-[#F8FAFC] py-12 lg:py-20 min-h-[calc(100vh-80px)]">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT SIDE: PRODUCT IMAGE */}
            <div className="lg:col-span-6 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
              <img
                src={product.image || "/images/placeholder.jpg"}
                alt={productName}
                className="w-full h-[400px] object-cover rounded-2xl"
              />
            </div>

            {/* RIGHT SIDE: SPECIFICS & TRANSACTION TRIGGER */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              
              <div className="flex flex-wrap gap-2 items-center mb-5">
                {/* Product Meta Category Tag */}
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${
                  isMachine ? "bg-[#1495CC]/10 text-[#1495CC]" : "bg-[#4ED088]/10 text-[#4ED088]"
                }`}>
                  {product.category || (isMachine ? "Heavy Machinery" : "Service Plan")}
                </span>

                {/* Integrated Smart Status Badges */}
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border ${
                  product.status === "Reserved"
                    ? "bg-red-100 text-red-600 border-red-200"
                    : product.status === "Available"
                    ? "bg-green-100 text-green-600 border-green-200"
                    : "bg-yellow-100 text-yellow-600 border-yellow-200"
                }`}>
                  {product.status || "Unknown Status"}
                </span>
              </div>

              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                {isMachine ? <Hammer className="w-8 h-8 text-[#1495CC]" /> : <Sparkles className="w-8 h-8 text-[#4ED088]" />}
                {productName}
              </h1>

              <p className="mt-6 text-slate-600 leading-relaxed text-base">
                {product.description}
              </p>

              <div className="mt-8 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Pricing Terms</p>
                  <p className="text-3xl font-black text-slate-900 mt-1">
                    {isMachine ? (
                      <>KSh {(product.pricePerHour || 0).toLocaleString()} <span className="text-sm font-normal text-slate-500">/ hr</span></>
                    ) : (
                      <>KSh {(product.price || 0).toLocaleString()}</>
                    )}
                  </p>
                </div>
                {isMachine && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl">
                    <ShieldCheck className="w-4 h-4" /> Fully Covered
                  </div>
                )}
              </div>

              {/* ACTION LINKS WITH STATUS GATING */}
              <div className="mt-10">
                {isMachine ? (
                  isReserved ? (
                    <button
                      disabled
                      className="inline-block text-center bg-slate-200 text-slate-500 px-8 py-4 rounded-xl font-bold border border-slate-300 cursor-not-allowed w-full sm:w-auto"
                    >
                      Machine Reserved
                    </button>
                  ) : (
                    <Link
                      to={`/hire/${product.id}`}
                      className="inline-block text-center bg-[#1495CC] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1185B5] transition shadow-md shadow-[#1495CC]/10 w-full sm:w-auto"
                    >
                      Hire Machine
                    </Link>
                  )
                ) : (
                  <Link
                    to={`/purchase/${product.id}`}
                    className="inline-block text-center bg-[#4ED088] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#3fb874] transition shadow-md shadow-[#4ED088]/10 w-full sm:w-auto"
                  >
                    Purchase Plan
                  </Link>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProductDetails;