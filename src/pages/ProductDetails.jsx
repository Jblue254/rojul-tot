import React from 'react'
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
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
                document = await getDoc(doc(db, "plans", id));

        if (document.exists()) {
          setProduct({
            id: document.id,
            type: "Plan",
            ...document.data(),
          });
        }

      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };
     fetchProduct();
  }, [id]);

  if (loading) {
    return <h2 className="text-center mt-20">Loading...</h2>;
  }

  if (!product) {
    return <h2 className="text-center mt-20">Product not found.</h2>;
  }


  return (
    <>
    <UserNavbar />
    <section className="bg-[#F8FAFC] py-16">

  <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12">

    <img
      src={product.image || "/images/placeholder.jpg"}
      alt={product.type === "Machine"
        ? product.machineName
        : product.planName}
      className="w-full rounded-3xl shadow-lg"
    />

    <div>

      <span
        className={`px-4 py-2 rounded-full text-sm font-semibold ${
          product.type === "Machine"
            ? "bg-[#1495CC]/10 text-[#1495CC]"
            : "bg-[#4ED088]/10 text-[#4ED088]"
        }`}
      >
        {product.category}
      </span>

      <h1 className="mt-5 text-4xl font-bold">

        {product.type === "Machine"
          ? product.machineName
          : product.planName}

      </h1>

      <p className="mt-6 text-gray-600 leading-8">
        {product.description}
      </p>

      <h2 className="mt-8 text-3xl font-bold text-[#1495CC]">

        {product.type === "Machine"
          ? `KSh ${product.pricePerHour}/hour`
          : `KSh ${product.price}`}

      </h2>

      <p className="mt-4">
        Status:
        <span className="ml-2 font-semibold text-green-600">
          {product.status}
        </span>
      </p>

      {product.type === "Machine" ? (

        <Link
          to={`/hire/${product.id}`}
          className="inline-block mt-10 bg-[#1495CC] text-white px-8 py-4 rounded-xl hover:bg-[#1185B5]"
        >
          Hire Machine
        </Link>

      ) : (

        <Link
          to={`/purchase/${product.id}`}
          className="inline-block mt-10 bg-[#4ED088] text-white px-8 py-4 rounded-xl hover:opacity-90"
        >
          Purchase Plan
        </Link>

      )}

    </div>

  </div>

</section>

      

      <Footer />
      </>
  )
}

export default ProductDetails