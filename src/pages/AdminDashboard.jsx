import React, { useEffect, useState } from "react";
import { Users, FileText, Truck, ClipboardList } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

function AdminDashboard() {
  const [stats, setStats] = useState({users: 0,plans: 0,machines: 0,hires: 0});

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentHires, setRecentHires] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const plansSnap = await getDocs(collection(db, "plans"));
        const machinesSnap = await getDocs(collection(db, "machines"));
        const hiresSnap = await getDocs(collection(db, "hireRequests"));

        setStats({
          users: usersSnap.size,
          plans: plansSnap.size,
          machines: machinesSnap.size,
          hires: hiresSnap.size,
        });

        const users = usersSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRecentUsers(users.slice(0, 5));

        const hires = hiresSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRecentHires(hires.slice(0, 5));

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">

        <div className="border rounded-lg p-4">
          <Users size={24} className="mb-2" />
          <h2 className="font-medium">Total Users</h2>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>

        <div className="border rounded-lg p-4">
          <FileText size={24} className="mb-2" />
          <h2 className="font-medium">Total Plans</h2>
          <p className="text-2xl font-bold">{stats.plans}</p>
        </div>

        <div className="border rounded-lg p-4">
          <Truck size={24} className="mb-2" />
          <h2 className="font-medium">Total Machines</h2>
          <p className="text-2xl font-bold">{stats.machines}</p>
        </div>

        <div className="border rounded-lg p-4">
          <ClipboardList size={24} className="mb-2" />
          <h2 className="font-medium">Hire Requests</h2>
          <p className="text-2xl font-bold">{stats.hires}</p>
        </div>

      </div>

      
      <div className="border rounded-lg p-4 mb-6">
        <h2 className="text-lg font-medium mb-3">
          Recent Users
        </h2>

        {recentUsers.length === 0 ? (
          <p>No users available.</p>
        ) : (
          recentUsers.map((user) => (
            <div
              key={user.id}
              className="border-b py-2 last:border-b-0"
            >
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          ))
        )}
      </div>

     
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-3">
          Recent Hire Requests
        </h2>

        {recentHires.length === 0 ? (
          <p>No requests available.</p>
        ) : (
          recentHires.map((hire) => (
            <div
              key={hire.id}
              className="border-b py-2 last:border-b-0"
            >
              <p className="font-medium">{hire.fullName}</p>
              <p className="text-sm text-gray-500">
                Machine: {hire.machineName}
              </p>
              <p className="text-xs text-gray-400">
                Status: {hire.status}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;