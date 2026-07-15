import React from 'react'
import { Routes, Route } from "react-router-dom";
import { cn } from "@/lib/utils";
import UserNavbar from './components/UserNavbar';
import { Link, NavLink } from "react-router-dom";
import Home from './context/home';
import Login from "./pages/Login";
import Register from "./pages/Register";



function App() {
  return (
    <>
    <Routes>
            <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />

      
    </Routes>
  
    </>
  )
}

export default App


