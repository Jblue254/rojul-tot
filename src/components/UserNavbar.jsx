import React from 'react'

function UserNavbar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];


  return (
    <div>
          <nav className="bg-[#162427] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        
        <Link to="/" className="flex flex-col">
          <span className="text-2xl font-bold text-[#8CB7A9]">
            RojulTot
          </span>
          <span className="text-xs text-gray-300">
            We Listen. Plan. Build.
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-[#8CB7A9] font-semibold"
                    : "hover:text-[#8CB7A9]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/login"
            className="border border-[#8CB7A9] px-4 py-2 rounded-md hover:bg-[#8CB7A9] hover:text-[#162427] transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-[#8CB7A9] text-[#162427] px-4 py-2 rounded-md font-semibold hover:opacity-90 transition"
          >
            Register
          </Link>
        </div>

        
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      
      {isOpen && (
        <div className="md:hidden bg-[#162427] px-6 pb-6 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block hover:text-[#8CB7A9]"
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/login"
            className="block border border-[#8CB7A9] rounded-md px-4 py-2 text-center"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="block bg-[#8CB7A9] text-[#162427] rounded-md px-4 py-2 text-center font-semibold"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
    </div>
  )
}

export default UserNavbar


