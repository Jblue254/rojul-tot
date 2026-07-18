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

            {/* Dynamic Filters */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-center gap-4">
                    
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
                            filter === "all"
                                ? "bg-[#1495CC] text-white"
                                : "border border-[#1495CC] text-[#1495CC] hover:bg-blue-50"
                        }`}
                    >
                        All
                    </button>

                    <button
                        onClick={() => setFilter("machines")}
                        className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
                            filter === "machines"
                                ? "bg-[#1495CC] text-white"
                                : "border border-[#1495CC] text-[#1495CC] hover:bg-blue-50"
                        }`}
                    >
                        Machines
                    </button>

                    <button
                        onClick={() => setFilter("plans")}
                        className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
                            filter === "plans"
                                ? "bg-[#4ED088] text-white"
                                : "border border-[#4ED088] text-[#4ED088] hover:bg-green-50"
                        }`}
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
                            <div className="col-span-full text-center py-12 text-gray-500">
                                No products available under this filter.
                            </div>
                        ) : (
                            filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between h-full"
                                >
                                    <div>
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

                                        <div className="p-5 pb-0">
                                            <span
                                                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                                    product.type === "Machine"
                                                        ? "bg-blue-100 text-blue-600"
                                                        : "bg-green-100 text-green-600"
                                                }`}
                                            >
                                                {product.type}
                                            </span>

                                            <h3 className="mt-4 text-xl font-bold line-clamp-1">
                                                {product.type === "Machine"
                                                    ? product.machineName
                                                    : product.planName}
                                            </h3>

                                            <p className="mt-2 text-gray-600 line-clamp-2 text-sm">
                                                {product.description}
                                            </p>

                                            <p className="mt-2 text-sm text-gray-500">
                                                Status: <span className="capitalize font-medium text-gray-700">{product.status}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-5 pt-0">
                                        <p className="mt-4 text-[#1495CC] font-bold text-lg">
                                            {product.type === "Machine"
                                                ? `KSh ${Number(product.pricePerHour || 0).toLocaleString()}/hr`
                                                : `KSh ${Number(product.price || 0).toLocaleString()}`}
                                        </p>
                                        <button
                                            onClick={() =>
                                                product.type === "Machine"
                                                    ? navigate(`/hire/${product.id}`)
                                                    : navigate(`/products/${product.id}`)
                                            }
                                            className="mt-4 w-full bg-[#1495CC] hover:bg-[#117fae] text-white py-3 rounded-xl transition-colors duration-200"
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