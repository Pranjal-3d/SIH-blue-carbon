"use client";
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react"; // icons

export default function VerificationPage() {
  const [status, setStatus] = useState("");

  const handleVerify = (decision: "approved" | "rejected") => {
    if (decision === "approved") {
      setStatus("✅ Project Approved Successfully!");
    } else {
      setStatus("❌ Project Rejected!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-10 w-full max-w-3xl border border-gray-200">
        <h1 className="text-3xl font-extrabold text-green-800 mb-8 text-center tracking-wide">
          🌱 Project Verification
        </h1>

        {/* Project Details */}
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-semibold">🌍 NGO Name:</span>{" "}
            <span className="text-green-700 font-medium">Green Earth Org</span>
          </p>
          <p>
            <span className="font-semibold">📍 Location:</span>{" "}
            <span className="text-green-700 font-medium">Tamil Nadu Coast</span>
          </p>
          <p>
            <span className="font-semibold">🌳 Project Type:</span>{" "}
            <span className="text-green-700 font-medium">
              Mangrove Plantation
            </span>
          </p>
          <img
            src="https://source.unsplash.com/800x400/?mangrove,forest"
            alt="project"
            className="rounded-xl mt-5 shadow-lg border border-gray-200"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-8 mt-10">
          <button
            onClick={() => handleVerify("approved")}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 shadow-md hover:scale-105 transition-all"
          >
            <CheckCircle size={20} /> Approve
          </button>
          <button
            onClick={() => handleVerify("rejected")}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 shadow-md hover:scale-105 transition-all"
          >
            <XCircle size={20} /> Reject
          </button>
        </div>

        {/* Status */}
        {status && (
          <p className="mt-8 text-center font-semibold text-lg text-green-900 animate-fade-in">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
