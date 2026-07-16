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
      alert("Please fill all required fields");
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

      alert("Plan added successfully");
    } catch (error) {
      console.error(error);
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

      alert("Plan updated successfully");
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Manage Plans
      </h1>

      <div className="border p-4 rounded mb-6">

        <h2 className="text-lg font-medium mb-4">
          {editingId ? "Edit Plan" : "Add New Plan"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Plan Name"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded md:col-span-2"
          />

        </div>

        <div className="flex gap-2 mt-4">

          {editingId ? (
            <>
              <button
                onClick={updatePlan}
                className="border px-4 py-2 rounded"
              >
                Update Plan
              </button>

              <button
                onClick={clearForm}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addPlan}
              className="border px-4 py-2 rounded"
            >
              Add Plan
            </button>
          )}

        </div>

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
                <td className="p-2">KSh {plan.price}</td>
                <td className="p-2">{plan.status}</td>

                <td className="p-2 flex gap-2">

                  <button
                    onClick={() => handleEdit(plan)}
                    className="border px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="border px-3 py-1 rounded"
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