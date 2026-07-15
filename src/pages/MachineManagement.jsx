import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

function MachineManagement() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const snapshot = await getDocs(collection(db, "machines"));

        const machineList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMachines(machineList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMachines();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Machine Management
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Machine</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Price/Day</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id} className="border-b">
              <td className="p-2">{machine.machineName}</td>
              <td className="p-2">{machine.category}</td>
              <td className="p-2">ksh{machine.pricePerDay}</td>
              <td className="p-2">{machine.status}</td>
            </tr>
          ))}

          {machines.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No machines found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MachineManagement;