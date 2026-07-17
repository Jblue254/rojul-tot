import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase";

function RequestPlans() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "planRequests")
      );

      const requestList = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

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
      await updateDoc(
        doc(db, "planRequests", id),
        {
          status,
        }
      );

      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

return (
  <div className="p-6 bg-slate-50 min-h-screen">

    {/* Header */}
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-slate-800">
        Plan Requests
      </h1>

      <p className="text-slate-500">
        Review and manage customer plan requests.
      </p>
    </div>

    {/* Table Card */}
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-slate-800">
          Customer Requests
        </h2>
      </div>

      <table className="w-full">

        <thead>
          <tr className="bg-slate-100 border-b">
            <th className="p-4 text-left">Client</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Plan</th>
            <th className="p-4 text-left">Notes</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>

          {requests.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="text-center py-8 text-gray-500"
              >
                No plan requests found.
              </td>
            </tr>
          ) : (
            requests.map((request) => (
              <tr
                key={request.id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="p-4 font-medium">
                  {request.fullName || "-"}
                </td>

                <td className="p-4 text-slate-600">
                  {request.email || "-"}
                </td>

                <td className="p-4">
                  {request.phoneNumber || "-"}
                </td>

                <td className="p-4">
                  {request.planName || "-"}
                </td>

                <td className="p-4">
                  {request.notes || "-"}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : request.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : request.status === "Completed"
                        ? "bg-blue-100 text-[#1495CC]"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {request.status || "Pending"}
                  </span>
                </td>

                <td className="p-4 flex gap-2 flex-wrap">

                  <button
                    onClick={() =>
                      updateStatus(request.id, "Approved")
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(request.id, "Rejected")
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(request.id, "Completed")
                    }
                    className="bg-[#1495CC] text-white px-3 py-1 rounded-lg hover:bg-[#1185B5]"
                  >
                    Complete
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>

  </div>
);
}

export default RequestPlans;