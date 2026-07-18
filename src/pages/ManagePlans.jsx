import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

function ManagePlans() {
  const [plans, setPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [planName, setPlanName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("available");

  // Custom Text-Only Blue Toast State
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 4000);
  };

  const fetchPlans = async () => {
    try {
      const snapshot = await getDocs(collection(db, "plans"));

      const planList = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setPlans(planList);
    } catch (error) {
      console.error(error);
      showToast("Failed to fetch plan catalog records.");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const clearForm = () => {
    setPlanName("");
    setCategory("");
    setDescription("");
    setPrice("");
    setImage("");
    setStatus("available");
    setEditingId(null);
  };

  const addPlan = async () => {
    if (!planName || !category || !description || !price) {
      showToast("Please fill all required fields");
      return;
    }

    try {
      await addDoc(collection(db, "plans"), {
        planName,
        category,
        description,
        image,
        price: Number(price),
        status,
      });

      clearForm();
      fetchPlans();

      showToast("Plan cataloged and added successfully");
    } catch (error) {
      console.error(error);
      showToast("Failed to add plan specifications to database.");
    }
  };

  const handleEdit = (plan) => {
    setEditingId(plan.id);

    setPlanName(plan.planName);
    setCategory(plan.category);
    setDescription(plan.description);
    setPrice(plan.price);
    setImage(plan.image);
    setStatus(plan.status);
  };

  const updatePlan = async () => {
    try {
      await updateDoc(doc(db, "plans", editingId), {
        planName,
        category,
        description,
        image,
        price: Number(price),
        status,
      });

      clearForm();
      fetchPlans();

      showToast("Building plan profile updated successfully");
    } catch (error) {
      console.error(error);
      showToast("Failed to commit updates to database record.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this plan?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "plans", id));
      fetchPlans();
      showToast("Plan registry entry removed successfully");
    } catch (error) {
      console.error(error);
      showToast("Failed to remove structural asset entry.");
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen relative">
      
      {/* TEXT-ONLY BLUE TOASTER */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-white border-l-4 border-[#1495CC] shadow-2xl rounded-r-2xl p-4 max-w-md min-w-[320px]">
            <p className="text-sm font-semibold text-slate-700 leading-snug">
              {toast.message}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Manage Plans
        </h1>

        <p className="text-slate-500">
          Create, update and manage building plans.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          {editingId ? "Edit Plan" : "Add New Plan"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Plan Name"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1495CC]"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1495CC]"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1495CC]"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1495CC]"
          />

          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1495CC]"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-slate-300 p-3 rounded-lg md:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#1495CC]"
            rows="4"
          />

        </div>

        <div className="flex gap-3 mt-5">

          {editingId ? (
            <>
              <button
                onClick={updatePlan}
                className="bg-[#1495CC] text-white px-5 py-2 rounded-lg hover:bg-[#1185B5]"
              >
                Update Plan
              </button>

              <button
                onClick={clearForm}
                className="bg-slate-200 text-slate-700 px-5 py-2 rounded-lg hover:bg-slate-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addPlan}
              className="bg-[#1495CC] text-white px-5 py-2 rounded-lg hover:bg-[#1185B5]"
            >
              Add Plan
            </button>
          )}

        </div>

      </div>

      {/* Plans Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-slate-800">
            Available Plans
          </h2>
        </div>

        <table className="w-full">

          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-4 text-left font-semibold text-slate-700">Plan Name</th>
              <th className="p-4 text-left font-semibold text-slate-700">Category</th>
              <th className="p-4 text-left font-semibold text-slate-700">Price</th>
              <th className="p-4 text-left font-semibold text-slate-700">Status</th>
              <th className="p-4 text-left font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>

          <tbody>

            {plans.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-500"
                >
                  No plans available.
                </td>
              </tr>
            ) : (
              plans.map((plan) => (
                <tr
                  key={plan.id}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="p-4 font-medium">
                    {plan.planName}
                  </td>

                  <td className="p-4">
                    {plan.category}
                  </td>

                  <td className="p-4 font-semibold text-[#1495CC]">
                    KSh {plan.price}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        plan.status === "available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {plan.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() => handleEdit(plan)}
                      className="bg-[#1495CC] text-white px-3 py-1 rounded-lg hover:bg-[#1185B5]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
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

    </div>
  );
}

export default ManagePlans;