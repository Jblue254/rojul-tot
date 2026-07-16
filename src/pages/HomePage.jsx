import UserNavbar from "@/components/UserNavbar";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <UserNavbar />

 <section className="bg-[#F8FAFC]">
  <div className="grid max-w-7xl px-6 py-20 mx-auto lg:grid-cols-12 gap-10 items-center">

    {/* Left */}
    <div className="lg:col-span-7">

      <span className="inline-block px-4 py-1 mb-5 rounded-full bg-[#F7C678]/30 text-[#1495CC] font-semibold">
        We Listen. Plan. Build.
      </span>

      <h1 className="max-w-2xl mb-6 text-5xl font-extrabold tracking-tight leading-tight text-gray-900 lg:text-6xl">
        Building Your
        <span className="text-[#1495CC]"> Vision</span>
        <br />
        With Quality &
        <span className="text-[#4ED088]"> Innovation.</span>
      </h1>

      <p className="max-w-xl mb-8 text-lg text-gray-600">
        RojulTot provides reliable construction machinery,
        professional architectural drawings, and trusted
        construction services for residential and commercial
        projects.
      </p>

      <div className="flex flex-wrap gap-4">

        <a
          href="/products"
          className="px-7 py-4 rounded-xl bg-[#1495CC] text-white font-semibold hover:bg-[#1185B5] transition"
        >
          Explore Products
        </a>

        <a
          href="/contact"
          className="px-7 py-4 rounded-xl border-2 border-[#1495CC] text-[#1495CC] font-semibold hover:bg-[#1495CC] hover:text-white transition"
        >
          Contact Us
        </a>

      </div>

    </div>

    {/* Right */}

    <div className="lg:col-span-5">

      <img
        src="/images/hero-construction.png"
        alt="Construction"
        className="w-full"
      />

    </div>

  </div>
</section>

    </>
  );
}

export default HomePage;