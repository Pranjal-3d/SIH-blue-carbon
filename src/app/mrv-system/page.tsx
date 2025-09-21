"use client";

import React, { useState, useEffect } from 'react';
import {
  Database, Camera, Satellite, Smartphone, MapPin, 
  BarChart3, TrendingUp, CheckCircle, AlertTriangle,
  Globe, Zap, Shield, FileText, Download, RefreshCw,
  Eye, Filter, Search, Calendar, Users, TreePine
} from "lucide-react";
import Link from "next/link";

export default function MRVSystemPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('monitoring');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const monitoringData = [
    {
      id: "BC-MFTHXD6D-JA5PLX",
      name: "Sundarbans Mangrove Restoration",
      location: "West Bengal, India",
      status: "active",
      lastUpdate: "2 hours ago",
      dataPoints: 1247,
      accuracy: 98.5,
      coverage: "15.2 ha"
    },
    {
      id: "BC-GULF-MANNAR-001",
      name: "Gulf of Mannar Seagrass",
      location: "Tamil Nadu, India", 
      status: "active",
      lastUpdate: "4 hours ago",
      dataPoints: 892,
      accuracy: 96.8,
      coverage: "8.7 ha"
    },
    {
      id: "BC-KUTCH-SALT-002",
      name: "Kutch Salt Marsh Project",
      location: "Gujarat, India",
      status: "pending",
      lastUpdate: "1 day ago",
      dataPoints: 634,
      accuracy: 94.2,
      coverage: "12.1 ha"
    }
  ];

  const verificationMetrics = [
    { label: "Projects Monitored", value: "23", icon: <TreePine className="h-6 w-6" />, color: "text-green-600" },
    { label: "Data Points Collected", value: "15,847", icon: <Database className="h-6 w-6" />, color: "text-blue-600" },
    { label: "Verification Accuracy", value: "97.2%", icon: <CheckCircle className="h-6 w-6" />, color: "text-emerald-600" },
    { label: "Active Sensors", value: "156", icon: <Zap className="h-6 w-6" />, color: "text-purple-600" }
  ];

  const dataSources = [
    {
      type: "Field Data",
      icon: <Smartphone className="h-8 w-8 text-blue-500" />,
      description: "Real-time data collection from field teams",
      status: "active",
      lastSync: "2 min ago",
      dataCount: "2,847 entries"
    },
    {
      type: "Drone Surveillance", 
      icon: <Camera className="h-8 w-8 text-green-500" />,
      description: "Automated aerial monitoring and imaging",
      status: "active",
      lastSync: "15 min ago", 
      dataCount: "1,234 images"
    },
    {
      type: "Satellite Imagery",
      icon: <Satellite className="h-8 w-8 text-purple-500" />,
      description: "Space-based ecosystem monitoring",
      status: "active",
      lastSync: "1 hour ago",
      dataCount: "89 scenes"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-green-600 rounded-full mb-6 shadow-lg">
            <Database className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            MRV System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Monitoring, Reporting & Verification for Blue Carbon Projects
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className={`flex justify-center mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-2 shadow-lg">
            {[
              { id: 'monitoring', label: 'Monitoring', icon: <Eye className="h-5 w-5" /> },
              { id: 'reporting', label: 'Reporting', icon: <BarChart3 className="h-5 w-5" /> },
              { id: 'verification', label: 'Verification', icon: <CheckCircle className="h-5 w-5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-green-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {verificationMetrics.map((metric, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl`}>
                  <div className={metric.color}>{metric.icon}</div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              </div>
              <div className="text-sm font-medium text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        {activeTab === 'monitoring' && (
          <div className={`space-y-8 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Data Sources */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Sources</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {dataSources.map((source, index) => (
                  <div key={index} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center space-x-4 mb-4">
                      {source.icon}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{source.type}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          source.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {source.status}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{source.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Last Sync:</span>
                        <span className="font-medium">{source.lastSync}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Data Count:</span>
                        <span className="font-medium">{source.dataCount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Monitoring */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Project Monitoring</h2>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {monitoringData.map((project, index) => (
                  <div key={index} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-600 rounded-xl flex items-center justify-center">
                          <TreePine className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{project.id}</span>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{project.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {project.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-blue-600 font-medium">Data Points</div>
                        <div className="text-lg font-bold text-gray-900">{project.dataPoints.toLocaleString()}</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-green-600 font-medium">Accuracy</div>
                        <div className="text-lg font-bold text-gray-900">{project.accuracy}%</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="text-purple-600 font-medium">Coverage</div>
                        <div className="text-lg font-bold text-gray-900">{project.coverage}</div>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="text-orange-600 font-medium">Last Update</div>
                        <div className="text-lg font-bold text-gray-900">{project.lastUpdate}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reporting' && (
          <div className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reporting Dashboard</h2>
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Advanced Reporting Features</h3>
              <p className="text-gray-500">Comprehensive reports and analytics coming soon</p>
            </div>
          </div>
        )}

        {activeTab === 'verification' && (
          <div className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Verification Center</h2>
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Verification Tools</h3>
              <p className="text-gray-500">Advanced verification and validation tools coming soon</p>
              <div className="mt-6">
                <Link href="/dashboard/verifier">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                    Go to Verifier Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
