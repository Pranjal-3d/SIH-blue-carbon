"use client";

import React, { useState, useEffect } from 'react';
import {
  CheckCircle, XCircle, Clock, Eye, Search, Filter,
  MapPin, Calendar, User, FileText, Camera, Globe,
  TrendingUp, Award, AlertTriangle, BarChart3, Zap,
  ArrowRight, Download, MessageSquare, Star
} from "lucide-react";
import Link from "next/link";

export default function VerifierDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      label: "Pending Review",
      value: "2",
      icon: <Clock className="h-6 w-6" />,
      color: "from-amber-500 to-orange-600",
      bgColor: "from-amber-50 to-orange-50",
      textColor: "text-amber-700"
    },
    {
      label: "Approved",
      value: "18",
      icon: <CheckCircle className="h-6 w-6" />,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      textColor: "text-green-700"
    },
    {
      label: "Rejected",
      value: "3",
      icon: <XCircle className="h-6 w-6" />,
      color: "from-red-500 to-pink-600",
      bgColor: "from-red-50 to-pink-50",
      textColor: "text-red-700"
    }
  ];

  const verificationQueue = [
    {
      id: "BC-2024-001",
      name: "Sundarbans Mangrove Restoration",
      organization: "Coastal Conservation Foundation",
      location: "West Bengal, India",
      submittedDate: "2024-01-15",
      status: "pending",
      priority: "high",
      evidenceCount: 12,
      credits: "8,500 tCO₂e",
      lastActivity: "2 hours ago"
    },
    {
      id: "BC-2024-002",
      name: "Gulf of Mannar Seagrass Beds",
      organization: "Marine Restoration Society",
      location: "Tamil Nadu, India",
      submittedDate: "2024-01-12",
      status: "additional_data",
      priority: "medium",
      evidenceCount: 8,
      credits: "3,500 tCO₂e",
      lastActivity: "1 day ago"
    },
    {
      id: "BC-2024-003",
      name: "Kutch Salt Marsh Project",
      organization: "Blue Ocean Initiative",
      location: "Gujarat, India",
      submittedDate: "2024-01-10",
      status: "pending",
      priority: "low",
      evidenceCount: 15,
      credits: "12,000 tCO₂e",
      lastActivity: "3 days ago"
    }
  ];

  const recentDecisions = [
    {
      id: "BC-2024-004",
      name: "Gulf of Mannar Seagrass",
      decision: "approved",
      credits: "3,500 tCO₂e",
      date: "2024-01-14",
      txHash: "0xabc123def456"
    },
    {
      id: "BC-2024-005",
      name: "Sundarbans Phase 2",
      decision: "approved",
      credits: "5,200 tCO₂e",
      date: "2024-01-13",
      txHash: "0xdef789ghi012"
    },
    {
      id: "BC-2024-006",
      name: "Kutch Coastal Project",
      decision: "rejected",
      credits: "0 tCO₂e",
      date: "2024-01-12",
      txHash: "0xjkl345mno678"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-amber-600 bg-amber-100';
      case 'additional_data': return 'text-blue-600 bg-blue-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-amber-600 bg-amber-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Verifier Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Review project submissions and validate carbon credit claims
          </p>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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

        {/* Verification Queue */}
        <div className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Queue</h2>
              <p className="text-gray-600">Projects awaiting your expert review</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Projects</option>
                  <option value="pending">Pending</option>
                  <option value="additional_data">Additional Data</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {verificationQueue.map((project, index) => (
              <div key={index} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{project.id}</span>
                        <span>{project.organization}</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority} priority
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Submitted {project.submittedDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>{project.evidenceCount} evidence files</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{project.credits}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Link href={`/dashboard/verifier/queue/${project.id}`}>
                      <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                        <Eye className="h-4 w-4" />
                        <span>Review</span>
                      </button>
                    </Link>
                    <div className="flex space-x-2">
                      <button className="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Approve</span>
                      </button>
                      <button className="px-3 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-1">
                        <XCircle className="h-4 w-4" />
                        <span className="text-sm">Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Evidence Viewer */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Evidence Viewer</h3>
                <p className="text-gray-600">Review submitted imagery and data</p>
              </div>
            </div>

            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Interactive Evidence Viewer</p>
                <p className="text-sm text-gray-400">Select a project to view satellite imagery, drone footage, and field data</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <Camera className="h-6 w-6 text-blue-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-medium text-blue-700">Photos</div>
              </button>
              <button className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <Globe className="h-6 w-6 text-green-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-medium text-green-700">Satellite</div>
              </button>
              <button className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-medium text-purple-700">Analytics</div>
              </button>
            </div>
          </div>

          {/* Recent Decisions */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Recent Decisions</h3>
                <p className="text-gray-600">Your verification activity log</p>
              </div>
            </div>

            <div className="space-y-4">
              {recentDecisions.map((decision, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className={`p-2 rounded-lg ${decision.decision === 'approved' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {decision.decision === 'approved' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{decision.name}</div>
                    <div className="text-sm text-gray-600 flex items-center space-x-2">
                      <span>{decision.credits}</span>
                      <span>•</span>
                      <span>{decision.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 font-mono">{decision.txHash.slice(0, 10)}...</div>
                    <button className="text-xs text-indigo-600 hover:text-indigo-800 mt-1">View TX</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">This month's impact:</span>
                <span className="font-bold text-green-600">8,700 tCO₂e verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">94%</div>
              <div className="text-sm text-gray-600">Approval Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">2.3 days</div>
              <div className="text-sm text-gray-600">Avg. Review Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
              <div className="text-sm text-gray-600">Projects Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">4.8</div>
              <div className="text-sm text-gray-600">Rating</div>
              <div className="flex justify-center mt-1">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className={`h-4 w-4 ${star <= 4 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


