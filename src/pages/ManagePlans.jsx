import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

function ManagePlans() {
  const [plans, setPlans] = useState([]);

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

  const addPlan = async () => {
    try {
      await addDoc(collection(db, "plans"), {
        planName,
        category,
        description,
        image,
        price: Number(price),
        status,
      });

      setPlanName("");
      setCategory("");
      setDescription("");
      setPrice("");
      setImage("");
      setStatus("available");

      fetchPlans();

      alert("Plan added successfully");
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
          Add New Plan
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

        <button
          onClick={addPlan}
          className="mt-4 border px-4 py-2 rounded"
        >
          Add Plan
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
                <td className="p-2">KSh {plan.price}</td>
                <td className="p-2">{plan.status}</td>

                <td className="p-2">
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