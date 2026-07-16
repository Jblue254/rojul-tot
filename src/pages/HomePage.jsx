import UserNavbar from "@/components/UserNavbar";
import { Link } from "react-router-dom";
import { Truck, Compass } from "lucide-react"; // Imported missing icons

function HomePage() {
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

      {/* Products & Services Section */}
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
    </>
  );
}

export default HomePage;