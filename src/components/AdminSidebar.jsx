import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardList,
  Truck,
  Wrench,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside className="w-64 min-h-screen border-r p-4 bg-white">

  <div className="mb-8 pb-4 border-b">
  <h1 className="text-3xl font-extrabold">
    Rojul
    <span className="text-[#1495CC]">Tot</span>
  </h1>

  <p className="text-xs uppercase tracking-widest text-gray-500 pt-6">
    Admin Dashboard
  </p>
  </div>

  <nav className="flex flex-col gap-2">

    <NavLink to="/admin" className="flex items-center gap-2 p-2">
      <LayoutDashboard size={18} />
      Dashboard
    </NavLink>

    <NavLink to="/admin/users" className="flex items-center gap-2 p-2">
      <Users size={18} />
      User Management
    </NavLink>

    <NavLink to="/admin/plans" className="flex items-center gap-2 p-2">
      <FileText size={18} />
      Manage Plans
    </NavLink>

    <NavLink
      to="/admin/request-plans"
      className="flex items-center gap-2 p-2"
    >
      <ClipboardList size={18} />
      Plan Requests
    </NavLink>

    <NavLink to="/admin/machines" className="flex items-center gap-2 p-2">
      <Truck size={18} />
      Machine Management
    </NavLink>

    <NavLink
      to="/admin/random"
      className="flex items-center gap-2 p-2"
    >
      <Wrench size={18} />
      Hire Requests
    </NavLink>

    <NavLink to="/admin/messages" className="flex items-center gap-2 p-2">
      <MessageSquare size={18} />
      Messages
    </NavLink>

    <button
      onClick={handleLogout}
      className="flex items-center gap-2 p-2 text-left text-red-600 hover:bg-red-50 rounded"
    >
      <LogOut size={18} />
      Logout
    </button>

  </nav>

</aside>
  );
}

export default AdminSidebar;