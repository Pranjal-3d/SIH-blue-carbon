"use client";

import React, { useState, useEffect } from 'react';
import {
  TreePine, TrendingUp, Clock, Plus, Upload, FileText, Camera,
  MapPin, Award, BarChart3, ArrowRight, CheckCircle, AlertCircle,
  Zap, Globe, Users, Target, Calendar, Download, Eye
} from "lucide-react";
import Link from "next/link";

export default function OwnerDashboard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      label: "Active Projects",
      value: "2",
      icon: <TreePine className="h-6 w-6" />,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      textColor: "text-green-700"
    },
    {
      label: "Credits Minted",
      value: "12,000",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
      textColor: "text-blue-700"
    },
    {
      label: "Pending Credits",
      value: "3,400",
      icon: <Clock className="h-6 w-6" />,
      color: "from-amber-500 to-orange-600",
      bgColor: "from-amber-50 to-orange-50",
      textColor: "text-amber-700"
    }
  ];

  const projects = [
    {
      name: "Sundarbans Mangrove Restoration",
      status: "Pending verification",
      statusColor: "text-amber-600 bg-amber-100",
      progress: 75,
      location: "West Bengal, India",
      credits: "8,500 tCO₂e"
    },
    {
      name: "Gulf of Mannar Seagrass Beds",
      status: "Approved",
      statusColor: "text-green-600 bg-green-100",
      progress: 100,
      location: "Tamil Nadu, India",
      credits: "3,500 tCO₂e"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-emerald-600 rounded-full mb-6 shadow-lg">
            <TreePine className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Project Owner Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your blue carbon restoration projects and track environmental impact
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

        {/* Projects Section */}
        <div className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">My Projects</h2>
              <p className="text-gray-600">Track the status and progress of your restoration initiatives</p>
            </div>
            <Link href="/dashboard/owner/add-project">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 hover:scale-105">
                <Plus className="h-5 w-5" />
                <span>New Project</span>
              </button>
            </Link>
          </div>

          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <TreePine className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${project.statusColor}`}>
                    {project.status}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-6">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Credits</div>
                    <div className="text-lg font-bold text-green-600">{project.credits}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Upload Evidence</h3>
                <p className="text-gray-600">Submit field data, photos, and monitoring reports</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/dashboard/owner/evidence/field-form">
                <button className="w-full p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                  <FileText className="h-6 w-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-blue-700">Field Data</div>
                </button>
              </Link>
              <Link href="/dashboard/owner/evidence/photos">
                <button className="w-full p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                  <Camera className="h-6 w-6 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-green-700">Photos</div>
                </button>
              </Link>
              <Link href="/dashboard/owner/evidence/drone">
                <button className="w-full p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                  <Globe className="h-6 w-6 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-purple-700">Drone Data</div>
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Impact Reports</h3>
                <p className="text-gray-600">Download certificates, maps, and detailed reports</p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-amber-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-amber-700">Carbon Credits Certificate</span>
                </div>
                <Download className="h-5 w-5 text-amber-600 group-hover:scale-110 transition-transform" />
              </button>

              <button className="w-full p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-blue-700">Before/After Maps</span>
                </div>
                <Eye className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">Project Approved</div>
                <div className="text-sm text-gray-600">Gulf of Mannar Seagrass project has been verified</div>
              </div>
              <div className="text-sm text-gray-500">2 hours ago</div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <Upload className="h-8 w-8 text-blue-600" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">Evidence Uploaded</div>
                <div className="text-sm text-gray-600">New drone imagery submitted for Sundarbans project</div>
              </div>
              <div className="text-sm text-gray-500">1 day ago</div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <AlertCircle className="h-8 w-8 text-amber-600" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">Review Requested</div>
                <div className="text-sm text-gray-600">Additional documentation needed for verification</div>
              </div>
              <div className="text-sm text-gray-500">3 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


