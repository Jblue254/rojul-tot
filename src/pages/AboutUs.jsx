import React from "react";
import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";

function AboutUs() {
  return (
    <>
      <UserNavbar />

      {/* Hero Section */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <span className="uppercase tracking-[0.3em] text-[#1495CC] font-semibold">
            About Us
          </span>

          <h1 className="mt-4 text-5xl font-extrabold text-gray-900">
            BUILDING BETTER FUTURES
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            RojulTot provides reliable construction machinery
            hire services and professional architectural plans
            to support residential, commercial, and industrial
            development projects.
          </p>

        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <img
              src="\images\pic 4.jpg"
              alt="About RojulTot"
              className="rounded-2xl shadow-lg"
            />
          </div>

          <div>

            <h2 className="text-3xl font-bold mb-6">
              Who We Are
            </h2>

            <p className="text-gray-600 leading-8 mb-4">
              RojulTot is a construction solutions company
              dedicated to making construction projects easier,
              faster, and more efficient. We provide access to
              high-quality machinery for hire and professionally
              designed building plans for clients across Kenya.
            </p>

            <p className="text-gray-600 leading-8">
              Through our digital platform, customers can browse,
              hire machinery, purchase building plans, and
              communicate directly with our team from anywhere.
            </p>

          </div>

        </div>

      </section>

      {/* Mission & Vision */}
      <section className="bg-[#F8FAFC] py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow">

              <h2 className="text-2xl font-bold mb-4">
                Our Mission
              </h2>

              <p className="text-gray-600 leading-8">
                To provide affordable construction machinery
                and innovative architectural solutions that
                help individuals, businesses, and communities
                successfully complete their projects.
              </p>

            </div>

            <div className="bg-white p-8 rounded-2xl shadow">

              <h2 className="text-2xl font-bold mb-4">
                Our Vision
              </h2>

              <p className="text-gray-600 leading-8">
                To become the leading digital construction
                services platform in Kenya by connecting
                clients with reliable machinery and quality
                building designs.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="border p-6 rounded-2xl">

              <h3 className="text-xl font-semibold mb-3">
                Quality Equipment
              </h3>

              <p className="text-gray-600">
                Access reliable and well-maintained machinery
                for your construction projects.
              </p>

            </div>

            <div className="border p-6 rounded-2xl">

              <h3 className="text-xl font-semibold mb-3">
                Professional Plans
              </h3>

              <p className="text-gray-600">
                Browse expertly designed architectural plans
                suitable for different construction needs.
              </p>

            </div>

            <div className="border p-6 rounded-2xl">

              <h3 className="text-xl font-semibold mb-3">
                Easy Online Access
              </h3>

              <p className="text-gray-600">
                Request machinery, purchase plans, and contact
                our team through a simple online platform.
              </p>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default AboutUs;