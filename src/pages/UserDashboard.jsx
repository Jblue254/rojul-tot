import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";

import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";

function UserDashboard() {
  const { user } = useAuth();

  const [hireRequests, setHireRequests] = useState([]);
  const [planRequests, setPlanRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const hireQuery = query(
          collection(db, "hireRequests"),
          where("userId", "==", user.uid)
        );

        const planQuery = query(
          collection(db, "planRequests"),
          where("userId", "==", user.uid)
        );

        const hireSnap = await getDocs(hireQuery);
        const planSnap = await getDocs(planQuery);

        const hires = hireSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const plans = planSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setHireRequests(hires);
        setPlanRequests(plans);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user]);

  const allRequests = [...hireRequests, ...planRequests];

  const totalRequests = allRequests.length;

  const pendingRequests = allRequests.filter(
    (request) => request.status === "Pending"
  ).length;

  const approvedRequests = allRequests.filter(
    (request) => request.status === "Approved"
  ).length;

  const rejectedRequests = allRequests.filter(
    (request) => request.status === "Rejected"
  ).length;

  return (
    <>
      <UserNavbar />

      <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          My Dashboard
        </h1>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-4 mb-10">

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500 text-sm">
              Total Requests
            </h3>
            <p className="text-3xl font-bold text-[#1495CC]">
              {totalRequests}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500 text-sm">
              Pending
            </h3>
            <p className="text-3xl font-bold text-yellow-500">
              {pendingRequests}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500 text-sm">
              Approved
            </h3>
            <p className="text-3xl font-bold text-green-500">
              {approvedRequests}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500 text-sm">
              Rejected
            </h3>
            <p className="text-3xl font-bold text-red-500">
              {rejectedRequests}
            </p>
          </div>

        </div>

        {/* Hire Requests */}

        <div className="bg-white rounded-xl shadow mb-8 overflow-hidden">

          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">
              My Hire Requests
            </h2>
          </div>

          <table className="w-full">

            <thead>
              <tr className="bg-slate-100">
                <th className="p-3 text-left">
                  Machine
                </th>
                <th className="p-3 text-left">
                  Hire Date
                </th>
                <th className="p-3 text-left">
                  Return Date
                </th>
                <th className="p-3 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>

              {hireRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6"
                  >
                    No hire requests found.
                  </td>
                </tr>
              ) : (
                hireRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b"
                  >
                    <td className="p-3">
                      {request.machineName}
                    </td>

                    <td className="p-3">
                      {request.hireDate?.toDate
                        ? request.hireDate
                            .toDate()
                            .toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-3">
                      {request.returnDate?.toDate
                        ? request.returnDate
                            .toDate()
                            .toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-3">
                      {request.status}
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

        {/* Plan Requests */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">
              My Plan Requests
            </h2>
          </div>

          <table className="w-full">

            <thead>
              <tr className="bg-slate-100">
                <th className="p-3 text-left">
                  Plan
                </th>

                <th className="p-3 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>

              {planRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center p-6"
                  >
                    No plan requests found.
                  </td>
                </tr>
              ) : (
                planRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b"
                  >
                    <td className="p-3">
                      {request.planName}
                    </td>

                    <td className="p-3">
                      {request.status}
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default UserDashboard;