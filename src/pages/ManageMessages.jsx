import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase";

function ManageMessages() {
  const [messages, setMessages] = useState([]);

  // Custom Text-Only Blue Toast State
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 4000);
  };

  const fetchMessages = async () => {
    try {
      const snapshot = await getDocs(collection(db, "messages"));

      const messageList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(messageList);
    } catch (error) {
      console.error(error);
      showToast("Failed to fetch customer inquiries.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    try {
      await updateDoc(doc(db, "messages", id), {
        status: "Read",
      });

      fetchMessages();
      showToast("Message marked as read successfully");
    } catch (error) {
      console.error(error);
      showToast("Failed to update message status.");
    }
  };

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "messages", id));
      fetchMessages();
      showToast("Message deleted successfully");
    } catch (error) {
      console.error(error);
      showToast("Failed to remove message entry.");
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen relative">
      
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

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Manage Messages
        </h1>

        <p className="text-slate-500">
          Customer inquiries and feedback.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No messages found.
        </div>
      ) : (
        <div className="grid gap-4">

          {messages.map((message) => (
            <div
              key={message.id}
              className="bg-white rounded-xl shadow p-5"
            >

              <div className="flex justify-between items-start mb-4">

                <div>
                  <h3 className="font-semibold text-lg text-slate-800">
                    {message.fullName}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {message.email}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {message.phoneNumber}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    message.status === "Read"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-[#1495CC]"
                  }`}
                >
                  {message.status || "New"}
                </span>

              </div>

              <div className="mb-3">
                <p className="font-medium text-sm text-slate-700">
                  Subject:
                </p>
                <p className="text-slate-800 font-medium">{message.subject}</p>
              </div>

              <div className="mb-4">
                <p className="font-medium text-sm text-slate-700">
                  Message:
                </p>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>

              <div className="flex gap-3">

                {message.status !== "Read" && (
                  <button
                    onClick={() => markAsRead(message.id)}
                    className="bg-[#1495CC] text-white px-4 py-2 rounded-lg hover:bg-[#1185B5] transition text-sm font-medium"
                  >
                    Mark Read
                  </button>
                )}

                <button
                  onClick={() => deleteMessage(message.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default ManageMessages;