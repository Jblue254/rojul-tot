import React, { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    updateDoc,
    doc,
} from "firebase/firestore";
import { db } from "@/firebase";

function Random() {
    const [requests, setRequests] = useState([]);

    // Custom Text-Only Blue Toast State
    const [toast, setToast] = useState({ show: false, message: "" });

    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => {
            setToast({ show: false, message: "" });
        }, 4000);
    };

    const fetchRequests = async () => {
        try {
            const snapshot = await getDocs(collection(db, "hireRequests"));

            const requestList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(requestList);

            setRequests(requestList);
        } catch (error) {
            console.error(error);
            showToast("Failed to sync request database records.");
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await updateDoc(doc(db, "hireRequests", id), {
                status,
            });

            showToast(`Request marked as ${status.toLowerCase()} successfully`);
            fetchRequests();
        } catch (error) {
            console.error(error);
            showToast("Failed to update status tracking parameters.");
        }
    };

    // Separate data filtering categories directly on the same page
    const pendingRequests = requests.filter((req) => req.status === "Pending");
    const rejectedRequests = requests.filter((req) => req.status === "Rejected");

    // Reusable Table Component for uniform page layout presentation
    const RequestTable = ({ data, emptyMessage }) => (
        <div className="bg-white rounded-xl shadow overflow-hidden mb-10">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-100 border-b">
                            <th className="p-4 text-left font-semibold text-slate-700">Client</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Email</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Phone</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Machine</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Hire Date</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Return Date</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Status</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-10 text-gray-500 font-medium">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((request) => (
                                <tr key={request.id} className="border-b hover:bg-slate-50 transition">
                                    <td className="p-4 font-medium text-slate-800">{request.fullName}</td>
                                    <td className="p-4 text-slate-600">{request.email}</td>
                                    <td className="p-4 text-slate-600">
                                        {request.phoneNumber || request.PhoneNumber || "-"}
                                    </td>
                                    <td className="p-4 text-slate-600">
                                        {request.machineName || request.MachineName || "-"}
                                    </td>
                                    <td className="p-4 text-slate-600">
                                        {request.hireDate?.toDate
                                            ? request.hireDate.toDate().toLocaleDateString()
                                            : "-"}
                                    </td>
                                    <td className="p-4 text-slate-600">
                                        {request.returnDate?.toDate
                                            ? request.returnDate.toDate().toLocaleDateString()
                                            : "-"}
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                request.status === "Approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : request.status === "Rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-blue-100 text-[#1495CC]"
                                            }`}
                                        >
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="p-4 flex gap-2">
                                        {request.status !== "Approved" && (
                                            <button
                                                onClick={() => updateStatus(request.id, "Approved")}
                                                className="bg-[#4ED088] hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition font-semibold"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {request.status !== "Rejected" && (
                                            <button
                                                onClick={() => updateStatus(request.id, "Rejected")}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition font-semibold"
                                            >
                                                Reject
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

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

            {/* Main Application Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                    Machine Hiring Requests
                </h1>
                <p className="text-slate-500">
                    Manage machine hire requests submitted by clients.
                </p>
            </div>

            {/* SECTION 1: WAITING FOR APPROVAL */}
            <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                    Waiting for Approval
                </h2>
                <p className="text-slate-400 text-xs mb-3">
                    Active requests in the processing line that require decision handling.
                </p>
            </div>
            <RequestTable 
                data={pendingRequests} 
                emptyMessage="No pending hire requests waiting for approval." 
            />

            {/* SECTION 2: REJECTED REQUESTS */}
            <div className="mb-4 mt-8">
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                    Rejected Requests
                </h2>
                <p className="text-slate-400 text-xs mb-3">
                    Logs and metrics for requests that have been marked declined.
                </p>
            </div>
            <RequestTable 
                data={rejectedRequests} 
                emptyMessage="No rejected hire requests recorded." 
            />

            {/* SECTION 3: ALL HISTORY LOGS */}
            <div className="mb-4 mt-8">
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                    All History Logs
                </h2>
                <p className="text-slate-400 text-xs mb-3">
                    Master record tracking all submitted transactions regardless of active state status.
                </p>
            </div>
            <RequestTable 
                data={requests} 
                emptyMessage="No request transaction logs found inside the database." 
            />

        </div>
    );
}

export default Random;