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

      

      <Footer />
      </>
  )
}

export default ProductDetails