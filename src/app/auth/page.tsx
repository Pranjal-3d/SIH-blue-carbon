"use client";

import React, { useState, useEffect } from "react";
import { Waves, Lock, Mail, Eye, EyeOff, Shield, UserCheck, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfessionalLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userRole, setUserRole] = useState("owner");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedRole = typeof window !== "undefined" ? window.localStorage.getItem("bc_role") : null;
    if (savedRole) setUserRole(savedRole);
  }, []);

  const redirectToRoleDashboard = (role: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("bc_role", role);
    }
    const roleToPath: Record<string, string> = {
      owner: "/dashboard/owner",
      verifier: "/dashboard/verifier",
      buyer: "/dashboard/buyer",
      admin: "/dashboard/admin",
    };
    router.replace(roleToPath[role] ?? "/dashboard/owner");
  };

  // Simple mock credentials per role (assume provided by admin in DB)
  const credentialsByRole: Record<string, Array<{ email: string; password: string }>> = {
    admin: [{ email: "admin@bluecarbon.gov", password: "Admin@123" }],
    owner: [
      { email: "owner1@example.com", password: "Owner@123" },
      { email: "owner2@example.com", password: "Owner@123" },
    ],
    verifier: [
      { email: "verifier@example.com", password: "Verify@123" },
    ],
    buyer: [
      { email: "buyer@example.com", password: "Buyer@123" },
    ],
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 400));

    const allowed = credentialsByRole[userRole]?.some(
      (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
    );

    if (!allowed) {
      setIsLoading(false);
      setError("Invalid credentials for selected role");
      return;
    }

    redirectToRoleDashboard(userRole);
    setIsLoading(false);
  };

  const userRoles = [
    { id: "owner", label: "Project Owner", icon: Settings, description: "Create projects and upload evidence", color: "from-emerald-600 to-emerald-700" },
    { id: "verifier", label: "Verifier", icon: UserCheck, description: "Review submissions and approve", color: "from-blue-600 to-blue-700" },
    { id: "buyer", label: "Buyer", icon: Settings, description: "Buy and retire credits", color: "from-amber-600 to-amber-700" },
    { id: "admin", label: "Administrator", icon: Shield, description: "Platform administration", color: "from-red-600 to-red-700" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-8 border border-white/20 transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Waves className="h-8 w-8 text-white animate-pulse" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl blur opacity-25 animate-pulse"></div>
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  BlueCarbon
                </h1>
                <p className="text-xs text-gray-500 font-medium">Professional Platform</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in with credentials provided by admin</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 ml-1">Sign in as</label>
            <div className="grid grid-cols-1 gap-3">
              {userRoles.map((role) => {
                const IconComponent = role.icon as any;
                const isSelected = userRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => {
                      setUserRole(role.id);
                      if (typeof window !== "undefined") {
                        window.localStorage.setItem("bc_role", role.id);
                      }
                    }}
                    className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      isSelected ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${role.color} flex items-center justify-center shadow-sm`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isSelected ? "text-blue-900" : "text-gray-900"}`}>{role.label}</h3>
                      <p className={`text-sm ${isSelected ? "text-blue-700" : "text-gray-600"}`}>{role.description}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}>
                      {isSelected && <div className="w-full h-full rounded-full bg-white scale-50"></div>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Sign in with email</span>
            </div>
          </div>

          <div className="space-y-6">
            {error && <div className="text-sm text-red-600">{error}</div>}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-600 font-medium">Remember me</span>
              </label>
              <span className="text-sm text-gray-400">Admin issues credentials</span>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </div>

        <div className="text-center mt-8 text-white/70">
          <p className="text-sm">© 2024 BlueCarbon. Secure • Professional • Trusted</p>
        </div>
      </div>
    </div>
  );
}