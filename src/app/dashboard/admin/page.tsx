"use client";

import React, { useState, useEffect } from 'react';
import {
  Users, UserCheck, UserX, FileText, ClipboardList, ChartPie,
  ShieldCheck, Calendar, CheckCircle, XCircle, ArrowRight,
  Plus, Search, Filter, Download, AlertTriangle, Zap
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      label: "Total Projects",
      value: "63",
      icon: <ClipboardList className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
      textColor: "text-blue-700"
    },
    {
      label: "Pending Verifications",
      value: "4",
      icon: <ShieldCheck className="h-6 w-6" />,
      color: "from-amber-500 to-orange-600",
      bgColor: "from-amber-50 to-orange-50",
      textColor: "text-amber-700"
    },
    {
      label: "Total Credits",
      value: "128,450",
      icon: <ChartPie className="h-6 w-6" />,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      textColor: "text-green-700"
    },
    {
      label: "Revenue",
      value: "₹ 1.8Cr",
      icon: <Zap className="h-6 w-6" />,
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50",
      textColor: "text-purple-700"
    }
  ];

  const users = [
    {
      id: 1,
      name: "Coastal Conservation Foundation",
      role: "NGO",
      status: "pending",
      joined: "2024-01-10"
    },
    {
      id: 2,
      name: "Marine Restoration Society",
      role: "Verifier",
      status: "active",
      joined: "2023-12-15"
    },
    {
      id: 3,
      name: "Blue Ocean Initiative",
      role: "NGO",
      status: "pending",
      joined: "2024-01-05"
    }
  ];

  const methodologies = [
    {
      id: 1,
      name: "Mangrove Carbon Estimation",
      version: "v1.2",
      lastUpdated: "2023-11-20"
    },
    {
      id: 2,
      name: "Seagrass Biomass Model",
      version: "v2.0",
      lastUpdated: "2023-12-05"
    }
  ];

  const verificationQueue = [
    {
      id: "BC-2024-045",
      name: "Mangrove Restoration",
      submittedDate: "2024-01-15",
      status: "pending"
    },
    {
      id: "BC-2024-046",
      name: "Community Solar Farm",
      submittedDate: "2024-01-12",
      status: "pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-amber-600 bg-amber-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredUsers = users.filter(user => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pending') return user.status === 'pending';
    if (selectedFilter === 'active') return user.status === 'active';
    return true;
  }).filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <Users className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage users, methodologies, and platform operations
          </p>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {stats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-r ${stat.bgColor} border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl shadow-lg`}>
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</div>
              </div>
              <div className="text-sm font-medium text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* User Management */}
        <div className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
            <div className="flex items-center space-x-3">
              <Search className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div>
                  <div className="font-semibold text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.role}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status}
                  </div>
                  <Link href={`/dashboard/admin/users/${user.id}`}>
                    <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                      Manage
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Methodologies */}
        <div className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Methodologies</h2>
            <Link href="/dashboard/admin/methodologies">
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Manage</span>
              </button>
            </Link>
          </div>

          <div className="space-y-4 max-h-72 overflow-y-auto">
            {methodologies.map(method => (
              <div key={method.id} className="p-4 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-600">Version {method.version}</div>
                  </div>
                  <div className="text-sm text-gray-500">Updated {method.lastUpdated}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Queue */}
        <div className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Queue</h2>
          <div className="space-y-4 max-h-72 overflow-y-auto divide-y divide-gray-200">
            {verificationQueue.map(item => (
              <div key={item.id} className="py-3 flex items-center justify-between text-sm">
                <span>{item.name} – Project #{item.id.split('-').pop()}</span>
                <div className="flex gap-2">
                  <Link href="/dashboard/admin/queue"><button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">Approve</button></Link>
                  <Link href="/dashboard/admin/queue"><button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Reject</button></Link>
                  <Link href="/dashboard/admin/queue"><button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">More Info</button></Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log */}
        <div className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Audit Log</h2>
          <Link href="/dashboard/admin/audit" className="text-indigo-600 hover:underline text-sm">
            Open audit log
          </Link>
        </div>
      </div>
    </div>
  );
}
