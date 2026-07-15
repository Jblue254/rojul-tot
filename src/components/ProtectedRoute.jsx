import React from 'react'
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function ProtectedRoute() {
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute