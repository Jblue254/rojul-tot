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
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">

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
              <h3 className="font-semibold text-lg">
                {message.fullName}
              </h3>

              <p className="text-gray-500">
                {message.email}
              </p>

              <p className="text-gray-500">
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
              {message.status}
            </span>

          </div>

          <div className="mb-3">
            <p className="font-medium text-slate-700">
              Subject:
            </p>
            <p>{message.subject}</p>
          </div>

          <div className="mb-4">
            <p className="font-medium text-slate-700">
              Message:
            </p>
            <p className="text-gray-600">
              {message.message}
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={() => markAsRead(message.id)}
              className="bg-[#1495CC] text-white px-4 py-2 rounded-lg"
            >
              Mark Read
            </button>

            <button
              onClick={() => deleteMessage(message.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
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