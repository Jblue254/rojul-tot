import React, { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    updateDoc,
    doc,
} from "firebase/firestore";
import { db } from "@/firebase";

function RequestPlans() {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const snapshot = await getDocs(collection(db, "planRequests"));

            const requestList = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));

            setRequests(requestList);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await updateDoc(doc(db, "planRequests", id), {
                status,
            });

            fetchRequests();
        } catch (error) {
            console.error(error);
        }
    };

    // Separate data filtering categories directly on the same page
    const pendingRequests = requests.filter((req) => !req.status || req.status === "Pending");
    const completedRequests = requests.filter((req) => req.status === "Completed");
    const rejectedRequests = requests.filter((req) => req.status === "Rejected");

    // Reusable Table sub-component to eliminate duplicated layout markup
    const RequestTable = ({ data, emptyMessage }) => (
        <div className="bg-white rounded-xl shadow overflow-hidden mb-10">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-100 border-b">
                            <th className="p-4 text-left font-semibold text-slate-700">Client</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Email</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Phone</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Plan</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Notes</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Status</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-gray-500 font-medium">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((request) => (
                                <tr key={request.id} className="border-b hover:bg-slate-50 transition">
                                    <td className="p-4 font-medium text-slate-800">{request.fullName || "-"}</td>
                                    <td className="p-4 text-slate-600">{request.email || "-"}</td>
                                    <td className="p-4 text-slate-600">{request.phoneNumber || "-"}</td>
                                    <td className="p-4 text-slate-800 font-medium">{request.planName || "-"}</td>
                                    <td className="p-4 text-slate-600 max-w-xs truncate" title={request.notes}>
                                        {request.notes || "-"}
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                request.status === "Approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : request.status === "Rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : request.status === "Completed"
                                                    ? "bg-blue-100 text-[#1495CC]"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {request.status || "Pending"}
                                        </span>
                                    </td>
                                    <td className="p-4 flex gap-2 flex-wrap">
                                        {request.status !== "Approved" && request.status !== "Completed" && (
                                            <button
                                                onClick={() => updateStatus(request.id, "Approved")}
                                                className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm transition font-semibold hover:bg-green-600"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {request.status !== "Rejected" && request.status !== "Completed" && (
                                            <button
                                                onClick={() => updateStatus(request.id, "Rejected")}
                                                className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm transition font-semibold hover:bg-red-600"
                                            >
                                                Reject
                                            </button>
                                        )}
                                        {request.status !== "Completed" && (
                                            <button
                                                onClick={() => updateStatus(request.id, "Completed")}
                                                className="bg-[#1495CC] text-white px-3 py-1.5 rounded-lg text-sm transition font-semibold hover:bg-[#1185B5]"
                                            >
                                                Complete
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
        <div className="p-6 bg-slate-50 min-h-screen">
            
            {/* Main Application Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                    Plan Requests
                </h1>
                <p className="text-slate-500">
                    Review and manage customer plan requests.
                </p>
            </div>

            {/* SECTION 1: WAITING FOR APPROVAL */}
            <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                    Waiting for Approval
                </h2>
                <p className="text-slate-400 text-xs mb-3">
                    Active incoming requests requiring processing decisions.
                </p>
            </div>
            <RequestTable 
                data={pendingRequests} 
                emptyMessage="No pending plan requests waiting for approval." 
            />

            {/* SECTION 2: COMPLETED REQUESTS */}
            <div className="mb-4 mt-8">
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                    Completed Requests
                </h2>
                <p className="text-slate-400 text-xs mb-3">
                    Successfully fulfilled and finalized customer accounts.
                </p>
            </div>
            <RequestTable 
                data={completedRequests} 
                emptyMessage="No completed plan requests found." 
            />

            {/* SECTION 3: REJECTED REQUESTS */}
            <div className="mb-4 mt-8">
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                    Rejected Requests
                </h2>
                <p className="text-slate-400 text-xs mb-3">
                    Historical logs of requests that were declined.
                </p>
            </div>
            <RequestTable 
                data={rejectedRequests} 
                emptyMessage="No rejected plan requests recorded." 
            />

            {/* SECTION 4: ALL HISTORY LOGS */}
            <div className="mb-4 mt-8">
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                    All History Logs
                </h2>
                <p className="text-slate-400 text-xs mb-3">
                    Master stream containing all logged interactions (Pending, Approved, Rejected, and Completed).
                </p>
            </div>
            <RequestTable 
                data={requests} 
                emptyMessage="No request interactions found inside the tracking logs." 
            />

        </div>
    );
}

export default RequestPlans;