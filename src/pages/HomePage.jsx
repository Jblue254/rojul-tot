import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Link } from "react-router-dom";
import { Truck, Compass, Star } from "lucide-react"; 
import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

        // Merging first 2 machines and first 2 plans
        setProducts([
          ...machineList.slice(0, 2),
          ...planList.slice(0, 2),
        ]);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <UserNavbar />

      {/* Hero Section */}
      <section className="bg-[#F8FAFC]">
        <div className="grid max-w-7xl px-6 py-8 mx-auto lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero */}
          <div className="lg:col-span-7">
            <span className="inline-block px-4 py-1 mb-5 rounded-full text-[#1495CC] font-semibold">
              We Listen. Plan. Build.
            </span>

            <h1 className="max-w-2xl mb-6 text-2xl font-extrabold tracking-tight leading-tight text-gray-900 lg:text-3xl">
              Building Your
              <span className="text-[#1495CC]"> Vision</span>
              <br />
              With Quality &
              <span className="text-[#1495CC]"> Innovation.</span>
            </h1>

            <p className="max-w-xl mb-8 text-lg text-gray-600">
              RojulTot provides reliable construction machinery,
              professional architectural drawings, and trusted
              construction services for residential and commercial
              projects.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="px-7 py-4 rounded-xl bg-[#1495CC] text-white font-semibold hover:bg-[#1185B5] transition"
              >
                Explore Products
              </Link>

              <Link
                to="/contact"
                className="px-7 py-4 rounded-xl border-2 border-[#1495CC] text-[#1495CC] font-semibold hover:bg-[#1495CC] hover:text-white transition"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Hero */}
          <div className="lg:col-span-5">
            <img
              src="/images/hero-construction.png"
              alt="Construction"
              className="w-full"
            />
          </div>

        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#F8FAFC] py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side */}
            <div>
              <span className="uppercase tracking-[0.3em] text-[#1495CC] font-semibold">
                About RojulTot
              </span>

              <h2 className="mt-4 text-4xl font-extrabold text-gray-900 leading-tight">
                Building Strong Foundations
                <br />
                For Every Project
              </h2>

              <p className="mt-8 text-lg text-gray-600 leading-8">
                RojulTot is a modern construction company committed to
                delivering reliable machinery hire, professional
                architectural drawings, and quality construction
                services. We work closely with every client to transform
                ideas into successful projects through innovation,
                professionalism and trust.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="px-5 py-2 rounded-full bg-[#1495CC]/10 text-[#1495CC] font-semibold">
                  Reliable Machinery
                </div>
                <div className="px-5 py-2 rounded-full bg-[#4ED088]/10 text-[#4ED088] font-semibold">
                  Professional Drawings
                </div>
                <div className="px-5 py-2 rounded-full bg-[#1495CC]/10 text-[#1495CC] font-semibold">
                  Quality Construction
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="grid gap-4">
              <div className="bg-[#1495CC] text-white rounded-2xl p-5 shadow-lg">
                <h3 className="text-2xl font-bold mb-2">We Listen</h3>
                <p>
                  Every successful project begins by understanding your
                  goals, budget and vision.
                </p>
              </div>

              <div className="bg-[#4ED088] text-white rounded-2xl p-5 shadow-lg">
                <h3 className="text-2xl font-bold mb-3">We Plan</h3>
                <p>
                  We provide professional planning, architectural
                  solutions and project preparation.
                </p>
              </div>

              <div className="text-white bg-[#1495CC] rounded-2xl p-5 shadow-lg">
                <h3 className="text-2xl font-bold mb-3">We Build</h3>
                <p>
                  From machinery hire to complete construction support,
                  we help deliver quality results that last.
                </p>
              </div>
            </div>

          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <h3 className="text-5xl font-bold text-[#1495CC]">50+</h3>
              <p className="mt-2 text-gray-600">Machines</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-[#4ED088]">300+</h3>
              <p className="mt-2 text-gray-600">Projects</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-[#4ED088]">500+</h3>
              <p className="mt-2 text-gray-600">Happy Clients</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-[#1495CC]">10+</h3>
              <p className="mt-2 text-gray-600">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products & Services Selection Info Section */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="uppercase tracking-[0.3em] text-[#1495CC] font-semibold">
              Our Products & Services
            </span>
            <h2 className="mt-4 text-5xl font-extrabold text-gray-900">
              Everything You Need
              <br />
              To Build Your Home
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you're hiring construction equipment or purchasing
              professional architectural drawings, RojulTot provides
              dependable solutions to keep your project moving forward.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            
            {/* Machine Hire Card */}
            <div className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-2xl transition flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#1495CC]/10 flex items-center justify-center mb-6">
                  <Truck className="w-8 h-8 text-[#1495CC]" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Machine Hire</h3>
                <p className="mt-5 text-gray-600 leading-8">
                  Hire reliable construction machinery suitable for
                  residential, commercial and industrial projects.
                </p>
                <ul className="mt-8 space-y-3 text-gray-700 list-disc list-inside mb-8">
                  <li>Excavators</li>
                  <li>Bulldozers</li>
                  <li>Cranes</li>
                  <li>Concrete Mixers</li>
                </ul>
              </div>
              <Link
                to="/products"
                className="inline-block w-fit px-7 py-4 rounded-xl bg-[#1495CC] text-white font-semibold hover:bg-[#1185B5] transition text-center"
              >
                Explore Products
              </Link>
            </div>

            {/* Architectural Drawings Card */}
            <div className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-2xl transition flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#4ED088]/10 flex items-center justify-center mb-6">
                  <Compass className="w-8 h-8 text-[#4ED088]" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Architectural Drawings</h3>
                <p className="mt-5 text-gray-600 leading-8">
                  Purchase professionally designed architectural plans
                  created for modern residential and commercial projects.
                </p>
                <ul className="mt-8 space-y-3 text-gray-700 list-disc list-inside mb-8">
                  <li>Residential Houses</li>
                  <li>Apartments</li>
                  <li>Modern Villas</li>
                  <li>Commercial Buildings</li>
                </ul>
              </div>
              <Link
                to="/products/drawings"
                className="inline-block w-fit bg-[#4ED088] text-white px-8 py-4 rounded-xl hover:opacity-90 transition text-center font-semibold"
              >
                Browse Drawings
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ================= FEATURED PRODUCTS SECTION ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <span className="uppercase tracking-[0.3em] text-[#1495CC] font-semibold">
              Featured Products
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-extrabold text-gray-900">
              Hire Machinery & Purchase Plans
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
              Discover our most popular construction machinery and professionally designed architectural plans.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              // Tailwind animated loading skeleton placeholders
              [...Array(4)].map((_, i) => (
                <div key={i} className="bg-[#F8FAFC] rounded-2xl h-96 animate-pulse" />
              ))
            ) : products.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No featured products found.</p>
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#F8FAFC] rounded-2xl shadow overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >
                  <div>
                    <img
                      src={product.image || "/images/fallback-placeholder.png"}
                      alt={product.type === "Machine" ? product.machineName : product.planName}
                      className="w-full h-52 object-cover"
                    />

                    <div className="p-5">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                        product.type === "Machine" ? "bg-[#1495CC]/15 text-[#1495CC]" : "bg-[#4ED088]/15 text-[#4ED088]"
                      }`}>
                        {product.type}
                      </span>

                      <h3 className="font-bold text-xl line-clamp-1">
                        {product.type === "Machine" ? product.machineName : product.planName}
                      </h3>

                      <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <p className="mt-3 font-bold text-lg text-[#1495CC]">
                      {product.type === "Machine"
                        ? `KSh ${product.pricePerHour || product.price}/hour`
                        : `KSh ${product.price}`}
                    </p>

                    <Link
                      to={product.type === "Machine" ? `/products?hire=${product.id}` : `/products/drawings`}
                      className="inline-block w-full text-center mt-4 bg-[#1495CC] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#1185B5] transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      {/* COMPLETED PROJECTS SECTION */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <span className="uppercase tracking-[0.3em] text-[#1495CC] font-semibold">
              Our Portfolio
            </span>
            <h2 className="mt-4 text-5xl font-extrabold text-gray-900">
              Completed Projects
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
              We take pride in delivering quality construction projects across
              residential, commercial, and infrastructure developments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Residential */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
              <img
                src="/images/gallery/residential.jpg"
                alt="Residential Project"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="bg-[#1495CC]/10 text-[#1495CC] px-3 py-1 rounded-full text-sm font-semibold">
                  Residential
                </span>
                <h3 className="text-2xl font-bold mt-4">
                  Modern Family Home
                </h3>
                <p className="mt-3 text-gray-600">
                  A beautifully designed residential project completed with
                  quality workmanship and attention to detail.
                </p>
              </div>
            </div>

            {/* Commercial */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
              <img
                src="/images/gallery/commercial.jpg"
                alt="Commercial Project"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="bg-[#4ED088]/10 text-[#4ED088] px-3 py-1 rounded-full text-sm font-semibold">
                  Commercial
                </span>
                <h3 className="text-2xl font-bold mt-4">
                  Office Complex
                </h3>
                <p className="mt-3 text-gray-600">
                  Commercial construction completed using modern machinery and
                  professional project planning.
                </p>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
              <img
                src="/images/gallery/road.jpg"
                alt="Road Project"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="bg-[#F7C678]/20 text-[#B88400] px-3 py-1 rounded-full text-sm font-semibold">
                  Infrastructure
                </span>
                <h3 className="text-2xl font-bold mt-4">
                  Road Construction
                </h3>
                <p className="mt-3 text-gray-600">
                  Large-scale road construction completed efficiently using
                  heavy-duty construction equipment.
                </p>
              </div>
            </div>

          </div>

          <div className="text-center mt-14">
            <Link
              to="/gallery"
              className="inline-block bg-[#1495CC] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1185B5] transition"
            >
              View Full Gallery 
            </Link>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <span className="uppercase tracking-[0.3em] text-[#1495CC] font-semibold">
              Testimonials
            </span>
            <h2 className="mt-4 text-5xl font-extrabold text-gray-900">
              What Our Clients Say
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
              Customer satisfaction is at the heart of everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-[#F8FAFC] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 fill-[#F7C678] text-[#F7C678]" />
                ))}
              </div>
              <p className="text-gray-600 leading-8 italic">
                "Hiring an excavator from RojulTot was smooth and
                affordable. The machine arrived on time and was in
                excellent condition."
              </p>
              <div className="mt-8">
                <h4 className="font-bold text-xl text-gray-900">
                  James Kiptoo
                </h4>
                <p className="text-[#1495CC]">Contractor</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#F8FAFC] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 fill-[#F7C678] text-[#F7C678]" />
                ))}
              </div>
              <p className="text-gray-600 leading-8 italic">
                "The architectural plans exceeded our expectations.
                Professional designs and excellent customer support
                throughout the purchase process."
              </p>
              <div className="mt-8">
                <h4 className="font-bold text-xl text-gray-900">
                  Sarah Wanjiru
                </h4>
                <p className="text-[#4ED088]">Home Owner</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#F8FAFC] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 fill-[#F7C678] text-[#F7C678]" />
                ))}
              </div>
              <p className="text-gray-600 leading-8 italic">
                "Professional team, quality machinery, and reliable
                service. We successfully completed our commercial
                project ahead of schedule."
              </p>
              <div className="mt-8">
                <h4 className="font-bold text-xl text-gray-900">
                  Peter Mwangi
                </h4>
                <p className="text-[#1495CC]">Project Manager</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-lg text-center">
            <span className="uppercase tracking-[0.3em] text-[#1495CC] font-semibold">
              Ready To Get Started?
            </span>
            <h2 className="mt-4 text-4xl font-extrabold text-gray-900">
              Let's Build Something
              <span className="text-[#1495CC]"> Great Together.</span>
            </h2>
            <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
              Hire reliable construction machinery or purchase professional
              architectural plans for your next project.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                to="/products"
                className="bg-[#1495CC] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1185B5] transition"
              >
                Explore Products
              </Link>
              <Link
                to="/contact"
                className="border-2 border-[#1495CC] text-[#1495CC] px-8 py-3 rounded-xl font-semibold hover:bg-[#1495CC] hover:text-white transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;