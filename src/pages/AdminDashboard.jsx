import React from 'react'
import {Users,FileText,Truck,ClipboardList} from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

const [stats, setStats] = useState({users: 0,plans: 0,machines: 0,hires: 0});


function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Admin Dashboard
      </h1>

     
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">

        <div className="border rounded-lg p-4">
          <Users size={24} />
          <h2>Total Users</h2>
          <p>0</p>
        </div>

        <div className="border rounded-lg p-4">
          <FileText size={24} />
          <h2>Total Plans</h2>
          <p>0</p>
        </div>

        <div className="border rounded-lg p-4">
          <Truck size={24} />
          <h2>Total Machines</h2>
          <p>0</p>
        </div>

        <div className="border rounded-lg p-4">
          <ClipboardList size={24} />
          <h2>Hire Requests</h2>
          <p>0</p>
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