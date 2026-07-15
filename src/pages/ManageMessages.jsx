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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Manage Messages
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Subject</th>
            <th className="p-2 text-left">Message</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No messages found.
              </td>
            </tr>
          ) : (
            messages.map((message) => (
              <tr key={message.id} className="border-b">
                <td className="p-2">{message.fullName}</td>
                <td className="p-2">{message.email}</td>
                <td className="p-2">{message.phoneNumber}</td>
                <td className="p-2">{message.subject}</td>
                <td className="p-2">{message.message}</td>
                <td className="p-2">{message.status}</td>

                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => markAsRead(message.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Mark as Read
                  </button>

                  <button
                    onClick={() => deleteMessage(message.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageMessages;