import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

function UserNavbar() {
  const { user, logout } = useAuth();
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
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-xl font-bold"
        >
          ROJUL-TOT
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <NavLink to="/dashboard">
            Dashboard
          </NavLink>

          <NavLink to="/products">
            Machines
          </NavLink>

          <NavLink to="/gallery">
            Gallery
          </NavLink>

          <NavLink to="/wishlist">
            Wishlist
          </NavLink>

          <NavLink to="/orders">
            My Hires
          </NavLink>
        </div>

        
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Hi, {user?.name || user?.displayName}
          </span>

          <Link to="/profile">
            <Button variant="outline">
              Profile
            </Button>
          </Link>

          <Button
            variant="destructive"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;