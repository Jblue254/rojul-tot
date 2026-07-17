import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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
        const hireSnap = await getDocs(
          collection(db, "hireRequests")
        );

        const planSnap = await getDocs(
          collection(db, "planRequests")
        );

        const hires = hireSnap.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (request) => request.email === user.email
          );

        const plans = planSnap.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (request) => request.email === user.email
          );

        setHireRequests(hires);
        setPlanRequests(plans);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user]);

  const allRequests = [
    ...hireRequests,
    ...planRequests,
  ];

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

        <h1 className="text-3xl font-bold mb-8">
          My Dashboard
        </h1>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-4 mb-10">

          <div className="border rounded-lg p-4">
            <h3>Total Requests</h3>
            <p className="text-2xl font-bold">
              {totalRequests}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3>Pending</h3>
            <p className="text-2xl font-bold">
              {pendingRequests}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3>Approved</h3>
            <p className="text-2xl font-bold">
              {approvedRequests}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3>Rejected</h3>
            <p className="text-2xl font-bold">
              {rejectedRequests}
            </p>
          </div>

        </div>

        {/* Hire Requests */}

        <div className="mb-10">

          <h2 className="text-xl font-semibold mb-4">
            My Hire Requests
          </h2>

          <table className="w-full border">

            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 text-left">
                  Machine
                </th>

                <th className="p-2 text-left">
                  Hire Date
                </th>

                <th className="p-2 text-left">
                  Return Date
                </th>

                <th className="p-2 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>

              {hireRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-4"
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
                    <td className="p-2">
                      {request.machineName}
                    </td>

                    <td className="p-2">
                      {request.hireDate
                        ?.toDate()
                        .toLocaleDateString()}
                    </td>

                    <td className="p-2">
                      {request.returnDate
                        ?.toDate()
                        .toLocaleDateString()}
                    </td>

                    <td className="p-2">
                      {request.status}
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

        {/* Plan Requests */}

        <div>

          <h2 className="text-xl font-semibold mb-4">
            My Plan Requests
          </h2>

          <table className="w-full border">

            <thead>
              <tr className="bg-gray-100 border-b">

                <th className="p-2 text-left">
                  Plan
                </th>

                <th className="p-2 text-left">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {planRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center p-4"
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
                    <td className="p-2">
                      {request.planName}
                    </td>

                    <td className="p-2">
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