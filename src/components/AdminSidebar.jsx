import React from 'react'
import { NavLink } from "react-router-dom";
import {LayoutDashboard,Users,FileText,Truck,MessageSquare,LogOut} from "lucide-react";

function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen border-r p-4">
      <h2 className="text-xl font-semibold mb-6">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-2">

        <NavLink
          to="/admin"
          className="flex items-center gap-2 p-2"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className="flex items-center gap-2 p-2"
        >
          <Users size={18} />
          Users
        </NavLink>

        <NavLink
          to="/admin/plans"
          className="flex items-center gap-2 p-2"
        >
          <FileText size={18} />
          Plans
        </NavLink>

        <NavLink
          to="/admin/machines"
          className="flex items-center gap-2 p-2"
        >
          <Truck size={18} />
          Machine Management
        </NavLink>

        <NavLink
          to="/admin/messages"
          className="flex items-center gap-2 p-2"
        >
          <MessageSquare size={18} />
          Messages
        </NavLink>

        <button className="flex items-center gap-2 p-2 text-left">
          <LogOut size={18} />
          Logout
        </button>

      </nav>
    </aside>
  );
}

export default AdminSidebar;