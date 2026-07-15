import React, { useEffect, useState } from "react";
import {collection,getDocs,deleteDoc,doc} from "firebase/firestore";
import { db } from "@/firebase";

function ManagePlans() {
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    try {
      const snapshot = await getDocs(collection(db, "plans"));

      const planList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPlans(planList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this plan?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "plans", id));
      fetchPlans();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Manage Plans
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Plan
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left">Plan Name</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {plans.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No plans available.
              </td>
            </tr>
          ) : (
            plans.map((plan) => (
              <tr key={plan.id} className="border-b">
                <td className="p-2">{plan.planName}</td>
                <td className="p-2">{plan.category}</td>
                <td className="p-2">₱{plan.price}</td>
                <td className="p-2">{plan.status}</td>

                <td className="p-2 flex gap-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManagePlans;