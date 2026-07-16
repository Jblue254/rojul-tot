import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";


function UserNavbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
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


        <nav className="hidden lg:flex items-center gap-8">

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


        <div className="hidden lg:flex items-center gap-3">

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg border border-gray-300 hover:border-[#1495CC] hover:text-[#1495CC] transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-lg bg-[#1495CC] hover:bg-[#0F7EAD] text-white transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to={isAdmin ? "/admin" : "/dashboard"}
                className="px-5 py-2 rounded-lg bg-[#4ED088] hover:bg-green-600 text-white transition"
              >
                {isAdmin ? "Admin Panel" : "Dashboard"}
              </Link>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          )}

        </div>


      </div>


    </header>
  );
}

export default UserNavbar;