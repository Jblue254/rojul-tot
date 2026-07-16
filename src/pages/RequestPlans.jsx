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
    <div className="p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Plan Requests
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left">Client</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Plan</th>
            <th className="p-2 text-left">Notes</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>

          {requests.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="text-center p-4"
              >
                No plan requests found.
              </td>
            </tr>
          ) : (
            requests.map((request) => (
              <tr
                key={request.id}
                className="border-b"
              >
                <td className="p-2">
                  {request.fullName}
                </td>

                <td className="p-2">
                  {request.email}
                </td>

                <td className="p-2">
                  {request.phoneNumber}
                </td>

                <td className="p-2">
                  {request.planName}
                </td>

                <td className="p-2">
                  {request.notes || "-"}
                </td>

                <td className="p-2 font-medium">
                  {request.status}
                </td>

                <td className="p-2 flex gap-2 flex-wrap">

                  <button
                    onClick={() =>
                      updateStatus(
                        request.id,
                        "Approved"
                      )
                    }
                    className="border px-3 py-1 rounded"
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
                    className="border px-3 py-1 rounded"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        request.id,
                        "Completed"
                      )
                    }
                    className="border px-3 py-1 rounded"
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
  );
}

export default RequestPlans;