import React, { useEffect, useState } from "react";
import {
  Users,
  FileText,
  Truck,
  ClipboardList,
  DollarSign,
} from "lucide-react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/firebase";

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    plans: 0,
    machines: 0,
    hires: 0,
    planRequests: 0,
    totalHireRevenue: 0,
    totalPlanRevenue: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentHires, setRecentHires] = useState([]);

  useEffect(() => {
    const unsubUsers = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRecentUsers(users.slice(-5).reverse());

        setStats((prev) => ({
          ...prev,
          users: snapshot.size,
        }));
      }
    );

    const unsubPlans = onSnapshot(
      collection(db, "plans"),
      (snapshot) => {
        setStats((prev) => ({
          ...prev,
          plans: snapshot.size,
        }));
      }
    );

    const unsubMachines = onSnapshot(
      collection(db, "machines"),
      (snapshot) => {
        setStats((prev) => ({
          ...prev,
          machines: snapshot.size,
        }));
      }
    );

    const unsubHires = onSnapshot(
      collection(db, "hireRequests"),
      (snapshot) => {
        let hireRevenue = 0;

        const hires = snapshot.docs.map((doc) => {
          const data = doc.data();

          if (data.status === "Approved") {
            hireRevenue += Number(
              data.estimatedCost || 0
            );
          }

          return {
            id: doc.id,
            ...data,
          };
        });

        setRecentHires(hires.slice(-5).reverse());

        setStats((prev) => ({
          ...prev,
          hires: snapshot.size,
          totalHireRevenue: hireRevenue,
        }));
      }
    );

    const unsubPlanRequests = onSnapshot(
      collection(db, "planRequests"),
      (snapshot) => {
        let planRevenue = 0;

        snapshot.docs.forEach((doc) => {
          const data = doc.data();

          if (data.status === "Approved") {
            planRevenue += Number(
              data.price || 0
            );
          }
        });

        setStats((prev) => ({
          ...prev,
          planRequests: snapshot.size,
          totalPlanRevenue: planRevenue,
        }));
      }
    );

    return () => {
      unsubUsers();
      unsubPlans();
      unsubMachines();
      unsubHires();
      unsubPlanRequests();
    };
  }, []);

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-10">

        <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-[#1495CC]">
          <Users className="text-[#1495CC] mb-3" />
          <p className="text-sm text-gray-500">
            Total Users
          </p>
          <h2 className="text-3xl font-bold">
            {stats.users}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-[#1495CC]">
          <FileText className="text-[#1495CC] mb-3" />
          <p className="text-sm text-gray-500">
            Total Plans
          </p>
          <h2 className="text-3xl font-bold">
            {stats.plans}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-[#1495CC]">
          <Truck className="text-[#1495CC] mb-3" />
          <p className="text-sm text-gray-500">
            Total Machines
          </p>
          <h2 className="text-3xl font-bold">
            {stats.machines}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-[#1495CC]">
          <ClipboardList className="text-[#1495CC] mb-3" />
          <p className="text-sm text-gray-500">
            Hire Requests
          </p>
          <h2 className="text-3xl font-bold">
            {stats.hires}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-[#1495CC]">
          <FileText className="text-[#1495CC] mb-3" />
          <p className="text-sm text-gray-500">
            Plan Requests
          </p>
          <h2 className="text-3xl font-bold">
            {stats.planRequests}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-[#1495CC]">
          <DollarSign className="text-[#1495CC] mb-3" />
          <p className="text-sm text-gray-500">
            Hire Revenue
          </p>
          <h2 className="text-2xl font-bold">
            KSh {stats.totalHireRevenue.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-[#1495CC]">
          <DollarSign className="text-[#1495CC] mb-3" />
          <p className="text-sm text-gray-500">
            Plan Revenue
          </p>
          <h2 className="text-2xl font-bold">
            KSh {stats.totalPlanRevenue.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-[#1495CC]">
          <DollarSign className="text-[#1495CC] mb-3" />
          <p className="text-sm text-gray-500">
            Total Revenue
          </p>
          <h2 className="text-2xl font-bold">
            KSh {(stats.totalHireRevenue + stats.totalPlanRevenue).toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#1495CC]">
          Recent Users
        </h2>

        {recentUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          recentUsers.map((user) => (
            <div
              key={user.id}
              className="border-b py-3 last:border-b-0"
            >
              <p className="font-medium">
                {user.name}
              </p>

              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Recent Hire Requests */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#1495CC]">
          Recent Hire Requests
        </h2>

        {recentHires.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          recentHires.map((hire) => (
            <div
              key={hire.id}
              className="border-b py-3 last:border-b-0"
            >
              <p className="font-medium">
                {hire.fullName}
              </p>

              <p className="text-sm text-gray-500">
                {hire.machineName}
              </p>

              <span
                className={`text-xs font-semibold ${
                  hire.status === "Approved"
                    ? "text-green-600"
                    : hire.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {hire.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;