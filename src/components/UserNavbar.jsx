import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function UserNavbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const navLink = ({ isActive }) =>
    `transition font-medium ${
      isActive
        ? "text-[#1495CC]"
        : "text-gray-700 hover:text-[#1495CC]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="RojulTot"
            className="h-12 w-12 object-contain"
          />

          <div>
            <h1 className="font-bold text-2xl text-gray-800">
              RojulTot
            </h1>

            <p className="text-xs text-gray-500">
              We Listen. Plan. Build.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Right Side */}
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

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t shadow-md">
          <nav className="flex flex-col p-4 gap-4">

            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/about" onClick={() => setMenuOpen(false)}>
              About
            </NavLink>

            <NavLink to="/products" onClick={() => setMenuOpen(false)}>
              Products
            </NavLink>

            <NavLink to="/gallery" onClick={() => setMenuOpen(false)}>
              Gallery
            </NavLink>

            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>

            <hr />

            {!user ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            ) : (
              <>
                <NavLink to={isAdmin ? "/admin" : "/dashboard"}>
                  {isAdmin ? "Admin Panel" : "Dashboard"}
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              </>
            )}

          </nav>
        </div>
      )}
    </header>
  );
}

export default UserNavbar;