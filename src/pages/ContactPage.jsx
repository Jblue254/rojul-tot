import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";

import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";

function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Custom Text-Only Blue Toast State
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !subject ||
      !message
    ) {
      showToast("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        fullName,
        email,
        phoneNumber,
        subject,
        message,
        status: "Unread",
        createdAt: Timestamp.now(),
      });

      showToast("Message sent successfully");

      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      showToast("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <UserNavbar />

      {/* TEXT-ONLY BLUE TOASTER */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-white border-l-4 border-[#1495CC] shadow-2xl rounded-r-2xl p-4 max-w-md min-w-[320px]">
            <p className="text-sm font-semibold text-slate-700 leading-snug">
              {toast.message}
            </p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <span className="uppercase tracking-[0.3em] text-[#1495CC] font-semibold">
            Contact Us
          </span>

          <h1 className="mt-4 text-5xl font-extrabold text-gray-900">
            GET IN TOUCH
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            Have questions about machinery hire or building plans?
            Send us a message and we'll get back to you.
          </p>

        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-white flex-grow">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">

          {/* Contact Details */}
          <div>

            <h2 className="text-3xl font-bold mb-8 text-slate-800">
              Contact Information
            </h2>

            <div className="space-y-6">

              <div>
                <h3 className="font-semibold text-lg text-slate-800">
                  Phone
                </h3>
                <p className="text-gray-600">
                  +254 753 626 358
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-slate-800">
                  Email
                </h3>
                <p className="text-gray-600">
                  rojultot@gmail.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-slate-800">
                  Location
                </h3>
                <p className="text-gray-600">
                  Nairobi, Kenya
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-slate-800">
                  Working Hours
                </h3>
                <p className="text-gray-600">
                  Monday - Saturday
                </p>
                <p className="text-gray-600">
                  8:00 AM - 6:00 PM
                </p>
              </div>

            </div>

          </div>

          {/* Contact Form */}
          <div>

            <form
              onSubmit={handleSubmit}
              className="bg-[#F8FAFC] p-8 rounded-2xl shadow border border-slate-100"
            >

              <h2 className="text-2xl font-bold mb-6 text-slate-800">
                Send Message
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1495CC] bg-white text-slate-800"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1495CC] bg-white text-slate-800"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1495CC] bg-white text-slate-800"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1495CC] bg-white text-slate-800"
                />

                <textarea
                  rows="6"
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1495CC] bg-white text-slate-800 resize-none"
                />

                <button
                  type="submit"
                  className="w-full bg-[#1495CC] text-white py-3 rounded-xl hover:bg-[#1185B5] transition font-medium"
                >
                  Send Message
                </button>

              </div>

            </form>

          </div>

        </div>

      </section>

      <Footer />
    </div>
  );
}

export default ContactUs;