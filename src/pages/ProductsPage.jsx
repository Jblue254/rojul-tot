import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useNavigate } from "react-router-dom";

function ProductsPage() {
    const navigate = useNavigate();

    const [machines, setMachines] = useState([]);
    const [plans, setPlans] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const machineSnap = await getDocs(
                    collection(db, "machines")
                );

                const planSnap = await getDocs(
                    collection(db, "plans")
                );

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

    const filteredProducts =
        filter === "all"
            ? products
            : filter === "machines"
                ? machines
                : plans;

    return (
        <>
            <UserNavbar />

            {/* Hero Section */}
            <section className="bg-[#F8FAFC] py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">

                    <span className="uppercase tracking-[0.3em] text-[#1495CC] font-semibold">
                        Products
                    </span>

                    <h1 className="mt-4 text-5xl font-extrabold text-gray-900">
                        Machinery & Building Plans
                    </h1>

                    <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
                        Browse construction machinery available for hire
                        and professional building plans for your next project.
                    </p>

                </div>
            </section>

            {/* Filters */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-center gap-4">

                    <button
                        onClick={() => setFilter("all")}
                        className="px-6 py-2 rounded-full bg-[#1495CC] text-white font-semibold"
                    >
                        All
                    </button>

                    <button
                        onClick={() => setFilter("machines")}
                        className="px-6 py-2 rounded-full border border-[#1495CC] text-[#1495CC]"
                    >
                        Machines
                    </button>

                    <button
                        onClick={() => setFilter("plans")}
                        className="px-6 py-2 rounded-full border border-[#4ED088] text-[#4ED088]"
                    >
                        Plans
                    </button>

                </div>
            </section>

            {/* Products Grid */}
            <section className="bg-[#F8FAFC] py-12">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                        {filteredProducts.length === 0 ? (
                            <p>No products available.</p>
                        ) : (
                            filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                                >

                                    <img
                                        src={
                                            product.image ||
                                            "https://via.placeholder.com/400x250?text=No+Image"
                                        }
                                        alt={
                                            product.type === "Machine"
                                                ? product.machineName
                                                : product.planName
                                        }
                                        className="w-full h-52 object-cover"
                                    />

                                    <div className="p-5">

                                        <span
                                            className={`text-xs font-semibold px-3 py-1 rounded-full ${product.type === "Machine"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-green-100 text-green-600"
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

                                        <p className="mt-2 text-sm text-gray-500">
                                            Status: {product.status}
                                        </p>

                                        <p className="mt-4 text-[#1495CC] font-bold text-lg">
                                            {product.type === "Machine"
                                                ? `KSh ${product.pricePerHour}`
                                                : `KSh ${product.price}`}
                                        </p>
                                        <button
                                            onClick={() =>
                                                product.type === "Machine"
                                                    ? navigate(`/hire/${product.id}`)
                                                    : navigate(`/products/${product.id}`)
                                            }
                                            className="mt-5 w-full bg-[#1495CC] text-white py-3 rounded-xl"
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>
                            ))
                        )}

                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
}

export default ProductsPage;