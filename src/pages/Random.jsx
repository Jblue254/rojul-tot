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
  <div className="p-6 bg-slate-50 min-h-screen">

    {/* Header */}
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-slate-800">
        Machine Hiring Requests
      </h1>

      <p className="text-slate-500">
        Manage machine hire requests submitted by clients.
      </p>
    </div>

    {/* Table Card */}
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="px-6 py-4 border-b bg-slate-50">
        <h2 className="font-semibold text-slate-700">
          All Hire Requests
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="bg-slate-100 border-b">

              <th className="p-4 text-left font-semibold text-slate-700">
                Client
              </th>

              <th className="p-4 text-left font-semibold text-slate-700">
                Email
              </th>

              <th className="p-4 text-left font-semibold text-slate-700">
                Phone
              </th>

              <th className="p-4 text-left font-semibold text-slate-700">
                Machine
              </th>

              <th className="p-4 text-left font-semibold text-slate-700">
                Hire Date
              </th>

              <th className="p-4 text-left font-semibold text-slate-700">
                Return Date
              </th>

              <th className="p-4 text-left font-semibold text-slate-700">
                Status
              </th>

              <th className="p-4 text-left font-semibold text-slate-700">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-10 text-gray-500"
                >
                  No hire requests found.
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="p-4 font-medium text-slate-800">
                    {request.fullName}
                  </td>

                  <td className="p-4 text-slate-600">
                    {request.email}
                  </td>

                  <td className="p-4 text-slate-600">
                    {request.phoneNumber ||
                      request.PhoneNumber ||
                      "-"}
                  </td>

                  <td className="p-4 text-slate-600">
                    {request.machineName ||
                      request.MachineName ||
                      "-"}
                  </td>

                  <td className="p-4 text-slate-600">
                    {request.hireDate?.toDate
                      ? request.hireDate
                          .toDate()
                          .toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-4 text-slate-600">
                    {request.returnDate?.toDate
                      ? request.returnDate
                          .toDate()
                          .toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        request.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : request.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-[#1495CC]"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() =>
                        updateStatus(
                          request.id,
                          "Approved"
                        )
                      }
                      className="bg-[#4ED088] hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          request.id,
                          "Rejected"
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
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

    </div>

  </div>
);
}

export default Random;