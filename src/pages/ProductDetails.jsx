import React from 'react'
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";

function ProductDetails() {
  return (
    <div>ProductDetails</div>
  )
}

export default ProductDetails