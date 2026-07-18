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

  // Dynamic class matching for active states
  const sidebarLink = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded-xl transition-all duration-200 font-medium ${
      isActive
        ? "bg-slate-100 text-[#1495CC]" // Highlights current page with a light gray background and signature blue text
        : "text-gray-700 hover:bg-slate-50 hover:text-[#1495CC]" // Standard layout style
    }`;

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

        {/* Note: 'end' stops this main dashboard route from staying active on sub-routes */}
        <NavLink to="/admin" className={sidebarLink} end>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/users" className={sidebarLink}>
          <Users size={18} />
          User Management
        </NavLink>

        <NavLink to="/admin/plans" className={sidebarLink}>
          <FileText size={18} />
          Manage Plans
        </NavLink>

        <NavLink to="/admin/request-plans" className={sidebarLink}>
          <ClipboardList size={18} />
          Plan Requests
        </NavLink>

        <NavLink to="/admin/machines" className={sidebarLink}>
          <Truck size={18} />
          Machine Management
        </NavLink>

        <NavLink to="/admin/random" className={sidebarLink}>
          <Wrench size={18} />
          Hire Requests
        </NavLink>

        <NavLink to="/admin/messages" className={sidebarLink}>
          <MessageSquare size={18} />
          Messages
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 text-left font-medium text-red-600 hover:bg-red-50 rounded-xl transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </nav>

    </aside>
  );
}

export default AdminSidebar;