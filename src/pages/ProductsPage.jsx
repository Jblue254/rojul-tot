import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

function ProductsPage() {
  return (
    <>
      <UserNavbar />

      {/* Hero */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <span className="uppercase tracking-[0.3em] text-[#1495CC] font-semibold">
            Products
          </span>

          <h1 className="mt-4 text-5xl font-extrabold text-gray-900">
            Machinery & Building Plans
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            Browse our construction machinery available for hire
            and professionally designed architectural plans for
            your next project.
          </p>

        </div>
      </section>

      {/* Filters */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-center gap-4">

          <button className="px-6 py-2 rounded-full bg-[#1495CC] text-white font-semibold">
            All
          </button>

          <button className="px-6 py-2 rounded-full border border-[#1495CC] text-[#1495CC] hover:bg-[#1495CC] hover:text-white transition">
            Machines
          </button>

          <button className="px-6 py-2 rounded-full border border-[#4ED088] text-[#4ED088] hover:bg-[#4ED088] hover:text-white transition">
            Plans
          </button>

        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-[#F8FAFC] py-12">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Cards will come here */}

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProductsPage;