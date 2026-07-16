import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import ManagePlans from "./pages/ManagePlans";
import RequestPlans from "./pages/RequestPlans";
import MachineManagement from "./pages/MachineManagement";

import ManageMessages from "./pages/ManageMessages";
import Random from "./pages/Random";

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="plans" element={<ManagePlans />} />
        <Route path="request-plans" element={<RequestPlans />} />
        <Route path="machines" element={<MachineManagement />} />
        <Route path="messages" element={<ManageMessages />} />
        <Route path="random" element={<Random />} />
      </Route>
    </Routes>
  );
}

export default App;