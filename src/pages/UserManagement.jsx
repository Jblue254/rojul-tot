import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";


function UserManagement() {
    const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));

      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(userList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
<div className="p-6 bg-slate-50 min-h-screen">

  <div className="mb-6">
    <h1 className="text-3xl font-bold text-slate-800">
      User Management
    </h1>

    <p className="text-slate-500">
      View all registered system users.
    </p>
  </div>

  <div className="bg-white rounded-xl shadow overflow-hidden">

    <table className="w-full">

      <thead>
        <tr className="bg-slate-100 border-b">
          <th className="p-4 text-left font-semibold text-slate-700">
            Name
          </th>

          <th className="p-4 text-left font-semibold text-slate-700">
            Email
          </th>

          <th className="p-4 text-left font-semibold text-slate-700">
            Role
          </th>
        </tr>
      </thead>

      <tbody>

        {users.length === 0 ? (
          <tr>
            <td
              colSpan="3"
              className="text-center py-8 text-gray-500"
            >
              No users found.
            </td>
          </tr>
        ) : (
          users.map((user) => (
            <tr
              key={user.id}
              className="border-b hover:bg-slate-50 transition"
            >
              <td className="p-4 font-medium text-slate-800">
                {user.name}
              </td>

              <td className="p-4 text-slate-600">
                {user.email}
              </td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === "admin"
                      ? "bg-blue-100 text-[#1495CC]"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.role}
                </span>

              </td>
            </tr>
          ))
        )}

      </tbody>

    </table>

  </div>

</div>
  )
}

export default UserManagement

