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

  const addMachine = async () => {
    try {
      await addDoc(collection(db, "machines"), {
        machineName,
        category,
        description,
        image,
        pricePerHour: Number(pricePerHour),
        status,
      });

      setMachineName("");
      setCategory("");
      setDescription("");
      setPricePerHour("");
      setImage("");
      setStatus("available");

      fetchMachines();

      alert("Machine added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMachine = async (id) => {
    try {
      await deleteDoc(doc(db, "machines", id));
      fetchMachines();
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Machine Management
      </h1>

      <div className="border p-4 rounded mb-6">

        <h2 className="text-lg font-medium mb-4">
          Add Machine
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Machine Name"
            value={machineName}
            onChange={(e) =>
              setMachineName(e.target.value)
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Price Per Hour"
            value={pricePerHour}
            onChange={(e) =>
              setPricePerHour(e.target.value)
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border p-2 rounded"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="border p-2 rounded md:col-span-2"
          />

        </div>

        <button
          onClick={addMachine}
          className="mt-4 border px-4 py-2 rounded"
        >
          Add Machine
        </button>

      </div>

      <h2 className="text-xl font-medium mb-4">
        Machines
      </h2>

      <table className="w-full border mb-10">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left">Machine</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id} className="border-b">
              <td className="p-2">{machine.machineName}</td>
              <td className="p-2">{machine.category}</td>
              <td className="p-2">
                KSh {machine.pricePerHour}
              </td>
              <td className="p-2">{machine.status}</td>

              <td className="p-2">
                <button
                  onClick={() =>
                    deleteMachine(machine.id)
                  }
                  className="border px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      



    </div>
  );
}

export default MachineManagement;