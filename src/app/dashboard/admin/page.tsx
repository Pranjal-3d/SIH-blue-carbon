"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Users, UserCheck, FileText, ClipboardList, PieChart,
  ShieldCheck, CheckCircle, ArrowRight, Plus, Search,
  Filter, Download, Zap, Bell, TrendingUp, Activity,
  Eye, RefreshCw, Settings, BarChart3, Clock, Award,
  Target, Flame, Star, Crown, LineChart, UserPlus,
  X, Save, AlertCircle, CheckCircle2, Mail, Lock,
  User, Building2
} from "lucide-react";

// Type definitions
interface User {
  id: number;
  name: string;
  role: string;
  status: string;
  joined: string;
  projects: number;
  credits: number;
  avatar: string;
  priority: string;
  lastActive: string;
}

interface Methodology {
  id: number;
  name: string;
  version: string;
  lastUpdated: string;
  status: string;
  usage: number;
  accuracy: number;
}

interface VerificationItem {
  id: string;
  name: string;
  submittedDate: string;
  status: string;
  priority: string;
  estimatedCredits: number;
  organization: string;
}

interface Activity {
  action: string;
  user?: string;
  project?: string;
  method?: string;
  amount?: string;
  time: string;
  type: string;
}

interface RegistrationForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface SubmitStatus {
  type: 'success' | 'error';
  message: string;
}

interface Stat {
  label: string;
  value: string;
  change: string;
  changeType: string;
  icon: React.ReactElement;
  textColor: string;
  accentColor: string;
}

interface Tab {
  id: string;
  label: string;
  icon: React.ReactElement;
}

// Utility functions
const getStatusColor = (status: string): string => {
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

const getPriorityColor = (priority: string): string => {
  if (priority === "high")
    return "text-red-600 bg-red-50 border-red-200";
  if (priority === "medium")
    return "text-yellow-600 bg-yellow-50 border-yellow-200";
  if (priority === "low")
    return "text-green-600 bg-green-50 border-green-200";
  return "text-gray-600 bg-gray-50 border-gray-200";
};

export default function AdminDashboard() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("users");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<number>(3);
  const [showRegistrationModal, setShowRegistrationModal] = useState<boolean>(false);
  const [registrationForm, setRegistrationForm] = useState<RegistrationForm>({
    name: "",
    email: "",
    password: "",
    role: "owner"
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  const [users, setUsers] = useState<User[]>([
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
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async (): Promise<void> => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsRefreshing(false);
  };

  const handleRegistrationSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationForm)
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'User registered successfully!' });
        // Add the new user to the local state
        const newUser: User = {
          id: users.length + 1,
          name: registrationForm.name,
          role: registrationForm.role === 'owner' ? 'NGO' : 'Verifier',
          status: 'pending',
          joined: new Date().toISOString().split('T')[0],
          projects: 0,
          credits: 0,
          avatar: registrationForm.name.split(' ').map(word => word[0]).join('').toUpperCase(),
          priority: 'medium',
          lastActive: 'Just registered',
        };
        setUsers(prev => [...prev, newUser]);
        
        // Reset form
        setRegistrationForm({
          name: "",
          email: "",
          password: "",
          role: "owner"
        });
        
        // Close modal after 2 seconds
        setTimeout(() => {
          setShowRegistrationModal(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        const errorData = await response.json();
        setSubmitStatus({ type: 'error', message: errorData.message || 'Registration failed' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats: Stat[] = [
    {
      label: "Total Projects",
      value: "63",
      change: "+12%",
      changeType: "positive",
      icon: React.createElement(ClipboardList, { className: "h-6 w-6" }),
      textColor: "text-blue-700",
      accentColor: "bg-blue-500",
    },
    {
      label: "Pending Verifications",
      value: "4",
      change: "-25%",
      changeType: "positive",
      icon: React.createElement(ShieldCheck, { className: "h-6 w-6" }),
      textColor: "text-amber-700",
      accentColor: "bg-amber-500",
    },
    {
      label: "Total Credits",
      value: "128,450",
      change: "+8.5%",
      changeType: "positive",
      icon: React.createElement(PieChart, { className: "h-6 w-6" }),
      textColor: "text-green-700",
      accentColor: "bg-green-500",
    },
    {
      label: "Revenue",
      value: "₹ 1.8Cr",
      change: "+15.2%",
      changeType: "positive",
      icon: React.createElement(Zap, { className: "h-6 w-6" }),
      textColor: "text-purple-700",
      accentColor: "bg-purple-500",
    },
  ];

  const methodologies: Methodology[] = [
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

  const verificationQueue: VerificationItem[] = [
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

  const recentActivities: Activity[] = [
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

  const tabs: Tab[] = [
    { id: "overview", label: "Overview", icon: React.createElement(BarChart3, { className: "h-4 w-4" }) },
    { id: "users", label: "Users", icon: React.createElement(Users, { className: "h-4 w-4" }) },
    { id: "queue", label: "Queue", icon: React.createElement(Clock, { className: "h-4 w-4" }) },
    { id: "methodologies", label: "Methods", icon: React.createElement(Settings, { className: "h-4 w-4" }) },
    { id: "analytics", label: "Analytics", icon: React.createElement(LineChart, { className: "h-4 w-4" }) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <UserPlus className="h-6 w-6 text-indigo-600" />
                <span>Add New User</span>
              </h2>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitStatus && (
              <div className={`mb-4 p-4 rounded-xl flex items-center space-x-2 ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {submitStatus.type === 'success' ? 
                  <CheckCircle2 className="h-5 w-5" /> : 
                  <AlertCircle className="h-5 w-5" />
                }
                <span>{submitStatus.message}</span>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={registrationForm.name}
                  onChange={(e) => setRegistrationForm(prev => ({...prev, name: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={registrationForm.email}
                  onChange={(e) => setRegistrationForm(prev => ({...prev, email: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Lock className="h-4 w-4 inline mr-1" />
                  Password
                </label>
                <input
                  type="password"
                  value={registrationForm.password}
                  onChange={(e) => setRegistrationForm(prev => ({...prev, password: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Create password"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Building2 className="h-4 w-4 inline mr-1" />
                  Role
                </label>
                <select
                  value={registrationForm.role}
                  onChange={(e) => setRegistrationForm(prev => ({...prev, role: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="owner">NGO (Owner)</option>
                  <option value="verifier">Verifier</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowRegistrationModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRegistrationSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Register User</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                        {a.type === "user" ? <UserCheck className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                  <Users className="h-8 w-8 text-indigo-600" />
                  <span>User Management</span>
                </h2>
                <button
                  onClick={() => setShowRegistrationModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center space-x-2 shadow-lg"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Add New User</span>
                </button>
              </div>

              {/* Search and Filter */}
              <div className="flex space-x-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                </select>
              </div>

              <div className="grid gap-6">
                {filteredUsers.map((u) => (
                  <div key={u.id} className="p-6 bg-white border rounded-3xl shadow hover:scale-[1.02] transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                          {u.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-xl">{u.name}</div>
                          <div className="text-sm text-gray-600">{u.role} • {u.projects} projects • {u.credits.toLocaleString()} credits</div>
                          <div className="text-xs text-gray-400">Joined {u.joined} • Last active: {u.lastActive}</div>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <span className={`px-3 py-2 rounded-xl text-sm font-medium ${getStatusColor(u.status)}`}>
                          {u.status}
                        </span>
                        <span className={`px-3 py-2 rounded-xl text-sm font-medium ${getPriorityColor(u.priority)}`}>
                          {u.priority}
                        </span>
                        <button className="px-4 py-2 bg-indigo-500 text-white rounded-xl flex items-center space-x-1 hover:bg-indigo-600 transition-colors">
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
                        <div className="text-sm text-gray-600">ID: {q.id} • Org: {q.organization}</div>
                        <div className="text-sm text-gray-600">Submitted: {q.submittedDate} • Credits: {q.estimatedCredits.toLocaleString()}</div>
                      </div>
                      <div className="flex space-x-3">
                        <span className={`px-3 py-2 rounded-xl ${getStatusColor(q.status)}`}>{q.status}</span>
                        <span className={`px-3 py-2 rounded-xl ${getPriorityColor(q.priority)}`}>{q.priority}</span>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">Review</button>
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
                        <div className="text-sm text-gray-600">Version {m.version} • Updated {m.lastUpdated}</div>
                        <div className="text-sm text-gray-600">Usage: {m.usage}% • Accuracy: {m.accuracy}%</div>
                      </div>
                      <div className="flex space-x-3">
                        <span className={`px-3 py-2 rounded-xl ${getStatusColor(m.status)}`}>{m.status}</span>
                        <button className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors">Details</button>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.textColor} bg-opacity-10`}>
                        {stat.icon}
                      </div>
                      <span className={`text-sm font-medium px-2 py-1 rounded ${
                        stat.changeType === 'positive' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}