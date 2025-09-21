"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Users, UserCheck, FileText, ClipboardList, PieChart,
  ShieldCheck, CheckCircle, ArrowRight, Plus, Search,
  Filter, Download, Zap, Bell, TrendingUp, Activity,
  Eye, RefreshCw, Settings, BarChart3, Clock, Award,
  Target, Flame, Star, Crown, LineChart
} from "lucide-react";

// Utility functions
const getStatusColor = (status: string) => {
  if (status === "pending")
    return "text-amber-700 bg-amber-100 border-amber-200";
  if (status === "active")
    return "text-green-700 bg-green-100 border-green-200";
  if (status === "rejected")
    return "text-red-700 bg-red-100 border-red-200";
  if (status === "under_review")
    return "text-blue-700 bg-blue-100 border-blue-200";
  if (status === "beta")
    return "text-purple-700 bg-purple-100 border-purple-200";
  return "text-gray-600 bg-gray-100 border-gray-200";
};

const getPriorityColor = (priority: string) => {
  if (priority === "high")
    return "text-red-600 bg-red-50 border-red-200";
  if (priority === "medium")
    return "text-yellow-600 bg-yellow-50 border-yellow-200";
  if (priority === "low")
    return "text-green-600 bg-green-50 border-green-200";
  return "text-gray-600 bg-gray-50 border-gray-200";
};

export default function AdminDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsRefreshing(false);
  };

  const stats = [
    {
      label: "Total Projects",
      value: "63",
      change: "+12%",
      changeType: "positive",
      icon: <ClipboardList className="h-6 w-6" />,
      textColor: "text-blue-700",
      accentColor: "bg-blue-500",
    },
    {
      label: "Pending Verifications",
      value: "4",
      change: "-25%",
      changeType: "positive",
      icon: <ShieldCheck className="h-6 w-6" />,
      textColor: "text-amber-700",
      accentColor: "bg-amber-500",
    },
    {
      label: "Total Credits",
      value: "128,450",
      change: "+8.5%",
      changeType: "positive",
      icon: <PieChart className="h-6 w-6" />,
      textColor: "text-green-700",
      accentColor: "bg-green-500",
    },
    {
      label: "Revenue",
      value: "₹ 1.8Cr",
      change: "+15.2%",
      changeType: "positive",
      icon: <Zap className="h-6 w-6" />,
      textColor: "text-purple-700",
      accentColor: "bg-purple-500",
    },
  ];

  const users = [
    {
      id: 1,
      name: "Coastal Conservation Foundation",
      role: "NGO",
      status: "pending",
      joined: "2024-01-10",
      projects: 12,
      credits: 45000,
      avatar: "CC",
      priority: "high",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Marine Restoration Society",
      role: "Verifier",
      status: "active",
      joined: "2023-12-15",
      projects: 28,
      credits: 78000,
      avatar: "MR",
      priority: "medium",
      lastActive: "Online",
    },
    {
      id: 3,
      name: "Blue Ocean Initiative",
      role: "NGO",
      status: "pending",
      joined: "2024-01-05",
      projects: 8,
      credits: 32000,
      avatar: "BO",
      priority: "high",
      lastActive: "1 day ago",
    },
    {
      id: 4,
      name: "EcoTech Solutions",
      role: "Developer",
      status: "active",
      joined: "2023-11-20",
      projects: 45,
      credits: 125000,
      avatar: "ET",
      priority: "low",
      lastActive: "Online",
    },
  ];

  const methodologies = [
    {
      id: 1,
      name: "Mangrove Carbon Estimation",
      version: "v1.2",
      lastUpdated: "2023-11-20",
      status: "active",
      usage: 89,
      accuracy: 94.2,
    },
    {
      id: 2,
      name: "Seagrass Biomass Model",
      version: "v2.0",
      lastUpdated: "2023-12-05",
      status: "active",
      usage: 76,
      accuracy: 96.8,
    },
    {
      id: 3,
      name: "Solar Panel Efficiency Calculator",
      version: "v1.5",
      lastUpdated: "2024-01-10",
      status: "beta",
      usage: 34,
      accuracy: 91.5,
    },
  ];

  const verificationQueue = [
    {
      id: "BC-2024-045",
      name: "Mangrove Restoration Project",
      submittedDate: "2024-01-15",
      status: "pending",
      priority: "high",
      estimatedCredits: 15000,
      organization: "Coastal Conservation Foundation",
    },
    {
      id: "BC-2024-046",
      name: "Community Solar Farm Initiative",
      submittedDate: "2024-01-12",
      status: "under_review",
      priority: "medium",
      estimatedCredits: 28000,
      organization: "EcoTech Solutions",
    },
    {
      id: "BC-2024-047",
      name: "Urban Tree Planting Campaign",
      submittedDate: "2024-01-14",
      status: "pending",
      priority: "low",
      estimatedCredits: 8500,
      organization: "Green City Initiative",
    },
  ];

  const recentActivities = [
    {
      action: "New user registration",
      user: "Ocean Guardians",
      time: "5 min ago",
      type: "user",
    },
    {
      action: "Project verified",
      project: "BC-2024-044",
      time: "1 hour ago",
      type: "verification",
    },
    {
      action: "Methodology updated",
      method: "Carbon Sequestration v2.1",
      time: "2 hours ago",
      type: "system",
    },
    {
      action: "Credits issued",
      amount: "12,500",
      time: "3 hours ago",
      type: "credits",
    },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      if (selectedFilter !== "all" && user.status !== selectedFilter) return false;
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [users, selectedFilter, searchTerm]);

  const tabs = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "users", label: "Users", icon: <Users className="h-4 w-4" /> },
    { id: "queue", label: "Queue", icon: <Clock className="h-4 w-4" /> },
    { id: "methodologies", label: "Methods", icon: <Settings className="h-4 w-4" /> },
    { id: "analytics", label: "Analytics", icon: <LineChart className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* HEADER */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-full mb-6 shadow-2xl relative">
              <Crown className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Admin Command Center
            </h1>
          </div>

          {/* TABS */}
          <div className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-2xl p-2 shadow-xl mb-8">
            <div className="flex space-x-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-white/50"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* TABS CONTENT */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Activity Feed */}
              <div className="xl:col-span-2 bg-white/80 rounded-3xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <Activity className="h-6 w-6 text-indigo-600" />
                  <span>Live Activity Feed</span>
                </h2>
                <div className="space-y-4">
                  {recentActivities.map((a, i) => (
                    <div key={i} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-2xl">
                      <div className="p-2 bg-indigo-100 rounded-xl">
                        {a.type === "user" ? <UserCheck /> : <CheckCircle />}
                      </div>
                      <div>
                        <div className="font-semibold">{a.action}</div>
                        <div className="text-sm text-gray-600">{a.user || a.project || a.method || a.amount}</div>
                        <div className="text-xs text-gray-400 flex items-center space-x-1">
                          <Clock className="h-3 w-3" /> <span>{a.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white/80 p-6 rounded-3xl shadow-xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-600" />
                    Performance Metrics
                  </h3>
                  <p className="text-gray-600">Uptime: 99.8%</p>
                  <p className="text-gray-600">Response: 124ms</p>
                  <p className="text-gray-600">Active Sessions: 2,847</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-white/80 rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <Users className="h-8 w-8 text-indigo-600" />
                <span>User Management</span>
              </h2>
              <div className="grid gap-6">
                {filteredUsers.map((u) => (
                  <div key={u.id} className="p-6 bg-white border rounded-3xl shadow hover:scale-[1.02] transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xl">{u.name}</div>
                        <div className="text-sm text-gray-600">{u.role} - {u.projects} projects</div>
                      </div>
                      <div className="flex space-x-3">
                        <span className={`px-3 py-2 rounded-xl ${getStatusColor(u.status)}`}>{u.status}</span>
                        <span className={`px-3 py-2 rounded-xl ${getPriorityColor(u.priority)}`}>{u.priority}</span>
                        <button className="px-4 py-2 bg-indigo-500 text-white rounded-xl flex items-center space-x-1">
                          <Eye className="h-4 w-4" /> <span>Manage</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "queue" && (
            <div className="bg-white/80 rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <ShieldCheck className="h-8 w-8 text-amber-600" />
                <span>Verification Queue</span>
              </h2>
              <div className="grid gap-6">
                {verificationQueue.map((q) => (
                  <div key={q.id} className="p-6 bg-gray-50 border rounded-3xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-lg">{q.name}</div>
                        <div className="text-sm text-gray-600">Org: {q.organization}</div>
                      </div>
                      <div className="flex space-x-3">
                        <span className={`px-3 py-2 rounded-xl ${getStatusColor(q.status)}`}>{q.status}</span>
                        <span className={`px-3 py-2 rounded-xl ${getPriorityColor(q.priority)}`}>{q.priority}</span>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-xl">Review</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "methodologies" && (
            <div className="bg-white/80 rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <Settings className="h-8 w-8 text-purple-600" />
                <span>Methodologies</span>
              </h2>
              <div className="grid gap-6">
                {methodologies.map((m) => (
                  <div key={m.id} className="p-6 bg-gray-50 border rounded-3xl">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-bold text-lg">{m.name}</div>
                        <div className="text-sm text-gray-600">Version {m.version}</div>
                      </div>
                      <div className="flex space-x-3">
                        <span className={`px-3 py-2 rounded-xl ${getStatusColor(m.status)}`}>{m.status}</span>
                        <button className="px-4 py-2 bg-indigo-500 text-white rounded-xl">Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="bg-white/80 rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <LineChart className="h-8 w-8 text-green-600" />
                <span>Analytics</span>
              </h2>
              <p className="text-gray-600">Charts & insights would go here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
