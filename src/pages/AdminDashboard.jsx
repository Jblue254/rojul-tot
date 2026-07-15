import React from 'react'
import {Users,FileText,Truck,ClipboardList} from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";


function AdminDashboard() {
const [stats, setStats] = useState({users: 0,plans: 0,machines: 0,hires: 0});


useEffect(() => {
  const fetchStats = async () => {
    try {
      const usersSnap = await getDocs(
        collection(db, "users")
      );

      setStats({
        users: usersSnap.size,
        plans: 0,
        machines: 0,
        hires: 0,
      });

    } catch (error) {
      console.error(error);
    }
  };

  fetchStats();
}, []);

const plansSnap = await getDocs(collection(db, "plans"));
setStats({
  users: usersSnap.size,
  plans: plansSnap.size,
  machines: 0,
  hires: 0,
});

const machinesSnap = await getDocs(
  collection(db, "machines")
);
setStats({
  users: usersSnap.size,
  plans: plansSnap.size,
  machines: machinesSnap.size,
  hires: hiresSnap.size,
});
const hiresSnap = await getDocs(
  collection(db, "hireRequests")
);

const [recentUsers, setRecentUsers] = useState([]);
const users = usersSnap.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

setRecentUsers(users.slice(0, 5));
{recentUsers.length === 0 ? (
  <p>No users available.</p>
) : (
  recentUsers.map((user) => (
    <div
      key={user.id}
      className="border-b py-2"
    >
      <p className="font-medium">{user.name}</p>
      <p className="text-sm text-gray-500">
        {user.email}
      </p>
    </div>
  ))
)}
const [recentHires, setRecentHires] = useState([]);
const hires = hiresSnap.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

setRecentHires(hires.slice(0, 5));

{recentHires.length === 0 ? (
  <p>No requests available.</p>
) : (
  recentHires.map((hire) => (
    <div key={hire.id} className="border-b py-2">
      <p className="font-medium">{hire.fullName}</p>
      <p className="text-sm text-gray-500">
        {hire.machineName}
      </p>
      <p className="text-xs text-gray-400">
        {hire.status}
      </p>
    </div>
  ))
)}




  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Admin Dashboard
      </h1>

     
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">

        <div className="border rounded-lg p-4">
          <Users size={24} />
          <h2>Total Users</h2>
          <p>{stats.users}</p>
        </div>

        <div className="border rounded-lg p-4">
          <FileText size={24} />
          <h2>Total Plans</h2>
          <p>{stats.plans}</p>
        </div>

        <div className="border rounded-lg p-4">
          <Truck size={24} />
          <h2>Total Machines</h2>
          <p>{stats.machines}</p>
        </div>

        <div className="border rounded-lg p-4">
          <ClipboardList size={24} />
          <h2>Hire Requests</h2>
          <p>{stats.hires}</p>
        </div>

      </div>

      
      <div className="border rounded-lg p-4 mb-6">
        <h2 className="text-lg font-medium mb-3">
          Recent Users
        </h2>

        <p>No users available.</p>
      </div>

      
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-3">
          Recent Hire Requests
        </h2>

        <p>No requests available.</p>
      </div>
    </div>
  );
}

export default AdminDashboard;