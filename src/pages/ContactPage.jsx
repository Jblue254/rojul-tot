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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !subject ||
      !message
    ) {
      alert("Please fill all fields");
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

      alert("Message sent successfully");

      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  };

  return (
    <>
      <UserNavbar />

      {/* Hero Section */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <span className="uppercase tracking-[0.3em] text-[#1495CC] font-semibold">
            Contact Us
          </span>

          <h1 className="mt-4 text-5xl font-extrabold text-gray-900">
            Get In Touch
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            Have questions about machinery hire or building plans?
            Send us a message and we'll get back to you.
          </p>

        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-white">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">

          {/* Contact Details */}
          <div>

            <h2 className="text-3xl font-bold mb-8">
              Contact Information
            </h2>

            <div className="space-y-6">

              <div>
                <h3 className="font-semibold text-lg">
                  Phone
                </h3>
                <p className="text-gray-600">
                  +254 753 626 358
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Email
                </h3>
                <p className="text-gray-600">
                  info@rojultot.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Location
                </h3>
                <p className="text-gray-600">
                  Nairobi, Kenya
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
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
              className="bg-[#F8FAFC] p-8 rounded-2xl shadow"
            >

              <h2 className="text-2xl font-bold mb-6">
                Send Message
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  className="w-full border p-3 rounded"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full border p-3 rounded"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value)
                  }
                  className="w-full border p-3 rounded"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.value)
                  }
                  className="w-full border p-3 rounded"
                />

                <textarea
                  rows="6"
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  className="w-full border p-3 rounded"
                />

                <button
                  type="submit"
                  className="w-full bg-[#1495CC] text-white py-3 rounded-xl"
                >
                  Send Message
                </button>

              </div>

            </form>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default ContactUs;