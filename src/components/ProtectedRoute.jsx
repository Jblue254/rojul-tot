import React from 'react'
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ adminOnly = false }) {
     const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  return (
    <div>

    </div>
  )
}

