import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase";

function MachineManagement() {
  const [machines, setMachines] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [machineName, setMachineName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("available");

  const fetchMachines = async () => {
    try {
      const snapshot = await getDocs(collection(db, "machines"));

      const machineList = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setMachines(machineList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const clearForm = () => {
    setMachineName("");
    setCategory("");
    setDescription("");
    setPricePerHour("");
    setImage("");
    setStatus("available");
    setEditingId(null);
  };

  const addMachine = async () => {
    if (
      !machineName ||
      !category ||
      !description ||
      !pricePerHour
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await addDoc(collection(db, "machines"), {
        machineName,
        category,
        description,
        image,
        pricePerHour: Number(pricePerHour),
        status,
      });

      clearForm();
      fetchMachines();

      alert("Machine added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (machine) => {
    setEditingId(machine.id);

    setMachineName(machine.machineName);
    setCategory(machine.category);
    setDescription(machine.description);
    setPricePerHour(machine.pricePerHour);
    setImage(machine.image);
    setStatus(machine.status);
  };

  const updateMachine = async () => {
    try {
      await updateDoc(doc(db, "machines", editingId), {
        machineName,
        category,
        description,
        image,
        pricePerHour: Number(pricePerHour),
        status,
      });

      clearForm();
      fetchMachines();

      alert("Machine updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMachine = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this machine?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "machines", id));
      fetchMachines();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Machine Management
        </h1>

        <p className="text-slate-500">
          Add, edit and manage construction machinery.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Machine" : "Add Machine"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Machine Name"
            value={machineName}
            onChange={(e) => setMachineName(e.target.value)}
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
            placeholder="Price Per Hour"
            value={pricePerHour}
            onChange={(e) => setPricePerHour(e.target.value)}
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
          />

        </div>

        <div className="mt-4 flex gap-3">

          {editingId ? (
            <>
              <button
                onClick={updateMachine}
                className="bg-[#1495CC] text-white px-5 py-2 rounded-lg hover:bg-[#1185B5]"
              >
                Update Machine
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
              onClick={addMachine}
              className="bg-[#1495CC] text-white px-5 py-2 rounded-lg hover:bg-[#1185B5]"
            >
              Add Machine
            </button>
          )}

        </div>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-4 text-left font-semibold text-slate-700">
                Machine
              </th>

              <th className="p-4 text-left font-semibold text-slate-700">
                Category
              </th>

              <th className="p-4 text-left font-semibold text-slate-700">
                Price Per Hour
              </th>

              <th className="p-4 text-left font-semibold text-slate-700">
                Status
              </th>

              <th className="p-4 text-left font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {machines.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-500"
                >
                  No machines available.
                </td>
              </tr>
            ) : (
              machines.map((machine) => (
                <tr
                  key={machine.id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="p-4 font-medium">
                    {machine.machineName}
                  </td>

                  <td className="p-4">
                    {machine.category}
                  </td>

                  <td className="p-4">
                    KSh {machine.pricePerHour}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        machine.status === "available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {machine.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() => handleEdit(machine)}
                      className="bg-[#1495CC] text-white px-3 py-1 rounded-lg hover:bg-[#1185B5]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteMachine(machine.id)}
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

export default MachineManagement;