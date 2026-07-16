import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";



function UserNavbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const navLink = ({ isActive }) =>
    `transition font-medium ${isActive
      ? "text-[#1495CC]"
      : "text-gray-700 hover:text-[#1495CC]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6">


        <Link to="/" className="flex flex-col leading-none">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Rojul
            <span className="text-[#1495CC]">Tot</span>
          </h1>

          <span className="text-xs text-gray-500 tracking-widest uppercase">
            We Listen. Plan. Build.
          </span>
        </Link>


        <nav className="flex items-center gap-8 font-medium">

 <NavLink to="/" className={navLink}>
  Home
</NavLink>

<NavLink to="/about" className={navLink}>
  About
</NavLink>

<NavLink to="/products" className={navLink}>
  Products
</NavLink>

<NavLink to="/gallery" className={navLink}>
  Gallery
</NavLink>

<NavLink to="/contact" className={navLink}>
  Contact
</NavLink>

</nav>


      {!user ? (
  <div className="flex gap-3">
    <Link
      to="/login"
      className="border border-[#1495CC] text-[#1495CC] px-5 py-2 rounded-full hover:bg-[#1495CC] hover:text-white transition"
    >
      Login
    </Link>

    <Link
      to="/register"
      className="bg-[#1495CC] text-white px-5 py-2 rounded-full hover:bg-[#1185B5] transition"
    >
      Register
    </Link>
  </div>
) : (
  <div className="flex gap-3">

    <Link
      to={isAdmin ? "/admin" : "/dashboard"}
      className="bg-[#1495CC] text-white px-5 py-2 rounded-full hover:bg-[#1185B5] transition"
    >
      {isAdmin ? "Admin Panel" : "Dashboard"}
    </Link>

    <button
      onClick={handleLogout}
      className="border border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-500 hover:text-white transition"
    >
      Logout
    </button>

  </div>
)}
      </div>


    </header>
  );
}

export default UserNavbar;