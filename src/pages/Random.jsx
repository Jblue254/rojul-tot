import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase";

function Random() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const snapshot = await getDocs(collection(db, "hireRequests"));

      const requestList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        
      }));
      console.log(requestList)

      setRequests(requestList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "hireRequests", id), {
        status,
      });

      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Machine Hiring Requests
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-2 text-left">Client</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Machine</th>
            <th className="p-2 text-left">Hire Date</th>
            <th className="p-2 text-left">Return Date</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-4">
                No hire requests found.
              </td>
            </tr>
          ) : (
            requests.map((request) => (
              <tr key={request.id} className="border-b">
                <td className="p-2">{request.fullName}</td>
                <td className="p-2">{request.email}</td>
                <td className="p-2">{request.phoneNumber}</td>
                <td className="p-2">{request.machineName}</td>
                <td>{request.hireDate?.toDate().toLocaleDateString()}</td>
                <td>{request.returnDate?.toDate().toLocaleDateString()}</td>
                <td className="p-2">{request.status}</td>

                <td className="p-2 flex gap-2">
                  <button
                    onClick={() =>
                      updateStatus(request.id, "Approved")
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(request.id, "Rejected")
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
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

export default Random;