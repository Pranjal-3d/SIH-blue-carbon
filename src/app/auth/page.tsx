"use client";

import { useState } from "react";
import { Waves, Shield, Users, Building, Award } from "lucide-react";

export default function AuthPage() {
  const [role, setRole] = useState("NGO");

  const roles = [
    { key: "NGO", label: "🌱 NGO", desc: "Project Owners" },
    { key: "Verifier", label: "✅ Verifier", desc: "Auditors" },
    { key: "Buyer", label: "💰 Buyer", desc: "Credit Purchasers" },
    { key: "Admin", label: "⚙️ Admin", desc: "Platform Admins" },
    { key: "Community", label: "🤝 Community", desc: "Local Groups" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Waves className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to BlueCarbon</h1>
          <p className="text-gray-600">Choose your role to access the platform</p>
        </div>

        <div className="glass rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-1 gap-3">
            {roles.map((r) => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  role === r.key
                    ? "border-[var(--eco)] bg-[var(--eco)] text-white shadow-lg"
                    : "border-gray-200 hover:border-[var(--primary)] hover:bg-[var(--soft)]"
                }`}
              >
                <div className="font-semibold">{r.label}</div>
                <div className="text-sm opacity-80">{r.desc}</div>
              </button>
            ))}
          </div>

          <form className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full h-12 rounded-xl border border-gray-200 px-4 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--soft)] outline-none transition-all"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full h-12 rounded-xl border border-gray-200 px-4 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--soft)] outline-none transition-all"
              />
            </div>
            <button className="w-full h-12 btn-primary rounded-xl font-semibold">
              Continue as {role}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Demo session - No blockchain wallet required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


