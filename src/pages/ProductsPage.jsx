import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

function ProductsPage() {
    const [machines, setMachines] = useState([]);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
  const fetchProducts = async () => {
    try {
      const machineSnap = await getDocs(collection(db, "machines"));
      const planSnap = await getDocs(collection(db, "plans"));

      const machineList = machineSnap.docs.map((doc) => ({
        id: doc.id,
        type: "Machine",
        ...doc.data(),
      }));

      const planList = planSnap.docs.map((doc) => ({
        id: doc.id,
        type: "Plan",
        ...doc.data(),
      }));

      setMachines(machineList);
      setPlans(planList);

    } catch (error) {
      console.error(error);
    }
  };

  fetchProducts();
}, []);

const products = [...machines, ...plans];
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

  {products.map((product) => (

    <div
      key={product.id}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
    >

      <img
        src={product.image}
        alt={product.type === "Machine" ? product.machineName : product.planName}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            product.type === "Machine"
              ? "bg-[#1495CC]/10 text-[#1495CC]"
              : "bg-[#4ED088]/10 text-[#4ED088]"
          }`}
        >
          {product.type}
        </span>

        <h3 className="mt-4 text-xl font-bold">
          {product.type === "Machine"
            ? product.machineName
            : product.planName}
        </h3>

        <p className="mt-2 text-gray-600">
          {product.description}
        </p>

        <p className="mt-4 text-[#1495CC] font-bold text-lg">
          {product.type === "Machine"
            ? `KSh ${product.pricePerHour}/day`
            : `KSh ${product.price}`}
        </p>

        <button className="mt-5 w-full bg-[#1495CC] text-white py-3 rounded-xl hover:bg-[#1185B5] transition">
          View Details
        </button>

      </div>

    </div>

  ))}

</div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProductsPage;