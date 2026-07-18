import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { FaBell } from "react-icons/fa";

import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/firebase";

function UserNavbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    let hireData = [];
    let planData = [];

    const updateNotifications = () => {
      const combined = [...hireData, ...planData]
        .sort(
          (a, b) =>
            (b.createdAt?.seconds || 0) -
            (a.createdAt?.seconds || 0)
        )
        .slice(0, 1);

      setNotifications(combined);

 const lastRead =
  localStorage.getItem("lastReadNotification");

if (
  combined.length > 0 &&
  combined[0].id !== lastRead &&
  (combined[0].status === "Approved" ||
    combined[0].status === "Rejected")
) {
  setUnreadCount(1);
} else {
  setUnreadCount(0);
}
    };

    const hireQuery = query(
      collection(db, "hireRequests"),
      where("email", "==", user.email),
      orderBy("createdAt", "desc"),
      limit(3)
    );

    const planQuery = query(
      collection(db, "planRequests"),
      where("email", "==", user.email),
      orderBy("createdAt", "desc"),
      limit(3)
    );

    const unsubscribeHire = onSnapshot(
      hireQuery,
      (snapshot) => {
        hireData = snapshot.docs.map((doc) => ({
          id: doc.id,
          type: "Machine Hire",
          ...doc.data(),
        }));

        updateNotifications();
      }
    );

    const unsubscribePlan = onSnapshot(
      planQuery,
      (snapshot) => {
        planData = snapshot.docs.map((doc) => ({
          id: doc.id,
          type: "Plan Request",
          ...doc.data(),
        }));

        updateNotifications();
      }
    );

    return () => {
      unsubscribeHire();
      unsubscribePlan();
    };
  }, [user]);

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

  
  const latestNotification = notifications[0];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6">

        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Rojul
            <span className="text-[#1495CC]">
              Tot
            </span>
          </h1>

          <span className="text-xs text-gray-500 tracking-widest uppercase">
            We Listen. Plan. Build.
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 font-medium">
          <NavLink to="/" className={navLink}>
            Home
          </NavLink>

          <NavLink to="/about" className={navLink}>
            About
          </NavLink>

          <NavLink
            to="/products"
            className={navLink}
          >
            Products
          </NavLink>

          <NavLink
            to="/gallery"
            className={navLink}
          >
            Gallery
          </NavLink>

          <NavLink
            to="/contact"
            className={navLink}
          >
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
          <div className="flex items-center gap-4">

            {/* Notifications */}
            <div className="relative">

              <button
                onClick={() => {
                  setShowNotifications(
                    !showNotifications
                  );

                  if (!showNotifications && notifications.length > 0) {
  localStorage.setItem(
    "lastReadNotification",
    notifications[0].id
  );

  setUnreadCount(0);
}
                }}
                className="relative p-3 rounded-full hover:bg-gray-100"
              >
                <FaBell className="text-xl text-[#1495CC]" />

                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl border z-50">

                  <div className="p-3 border-b font-semibold">
                    Notifications
                  </div>

                  {notifications.length === 0 ? (
                    <p className="p-4 text-gray-500">
                      No notifications
                    </p>
                  ) : (
                    <div className="p-4">
                      <p className="font-semibold text-sm">
                        {latestNotification?.type}
                      </p>

                      <p className="text-sm text-gray-600 mt-1">
                        {latestNotification?.machineName || latestNotification?.planName}
                      </p>

                      <p
                        className={`text-sm font-semibold mt-2 ${
                          latestNotification?.status === "Approved"
                            ? "text-green-600"
                            : latestNotification?.status === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {latestNotification?.status}
                      </p>
                    </div>
                  )}
                </div>
              )}

            </div>

            <Link
              to={
                isAdmin
                  ? "/admin"
                  : "/dashboard"
              }
              className="bg-[#1495CC] text-white px-5 py-2 rounded-full hover:bg-[#1185B5] transition"
            >
              {isAdmin
                ? "Admin Panel"
                : "Dashboard"}
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