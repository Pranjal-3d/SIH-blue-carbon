 "use client";

import React, { useState, useEffect } from 'react';
import {
  TreePine, Coins, TrendingUp, QrCode, MapPin, Calendar,
  Award, Users, Heart, Camera, Upload, BarChart3, Globe,
  CheckCircle, Clock, Star, Target, Zap, Leaf
} from "lucide-react";
import Link from "next/link";

export default function CommunityDashboard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      label: "My Plots",
      value: "2",
      icon: <TreePine className="h-6 w-6" />,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      textColor: "text-green-700"
    },
    {
      label: "Community Tokens",
      value: "420",
      icon: <Coins className="h-6 w-6" />,
      color: "from-amber-500 to-orange-600",
      bgColor: "from-amber-50 to-orange-50",
      textColor: "text-amber-700"
    },
    {
      label: "CO₂ Sequestered",
      value: "12.4 t",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
      textColor: "text-blue-700"
    },
    {
      label: "Avg Survival Rate",
      value: "88%",
      icon: <Target className="h-6 w-6" />,
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50",
      textColor: "text-purple-700"
    }
  ];

  const plots = [
    {
      id: "CM-001",
      name: "Sundarbans Community Plot A",
      location: "West Bengal, India",
      plantedDate: "2023-08-15",
      survivalRate: 92,
      trees: 150,
      carbonSequestered: 8.2,
      status: "healthy",
      lastMonitoring: "2024-01-10"
    },
    {
      id: "CM-014",
      name: "Gulf of Mannar Plot B",
      location: "Tamil Nadu, India",
      plantedDate: "2023-09-20",
      survivalRate: 85,
      trees: 120,
      carbonSequestered: 4.2,
      status: "good",
      lastMonitoring: "2024-01-08"
    }
  ];

  const activities = [
    {
      type: "monitoring",
      title: "Plot monitoring completed",
      plot: "CM-001",
      date: "2024-01-10",
      points: 25
    },
    {
      type: "upload",
      title: "Photos uploaded",
      plot: "CM-014",
      date: "2024-01-08",
      points: 15
    },
    {
      type: "milestone",
      title: "1-year survival milestone",
      plot: "CM-001",
      date: "2024-01-05",
      points: 50
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-amber-600 bg-amber-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'monitoring': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'upload': return <Upload className="h-5 w-5 text-blue-600" />;
      case 'milestone': return <Award className="h-5 w-5 text-purple-600" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-green-600 rounded-full mb-6 shadow-lg">
            <Users className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent mb-4">
            Community Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your community plantation plots and earn tokens for environmental stewardship
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

        {/* My Plantation Plots */}
        <div className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">My Plantation Plots</h2>
              <p className="text-gray-600">Monitor the health and growth of your community plots</p>
            </div>
            <Link href="/dashboard/community/scan">
              <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                <QrCode className="h-5 w-5" />
                <span>Scan QR Code</span>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {plots.map((plot, index) => (
              <div key={index} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-600 rounded-xl flex items-center justify-center">
                      <TreePine className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{plot.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <QrCode className="h-4 w-4" />
                        <span className="font-mono">{plot.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(plot.status)}`}>
                    {plot.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{plot.survivalRate}%</div>
                    <div className="text-sm text-gray-600">Survival Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{plot.trees}</div>
                    <div className="text-sm text-gray-600">Trees Planted</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{plot.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Planted {plot.plantedDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Carbon Sequestered</div>
                    <div className="text-lg font-bold text-green-600">{plot.carbonSequestered} tCO₂e</div>
                  </div>
                  <Link href={`/dashboard/community/plots/${plot.id}`}>
                    <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Activities & Impact */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Recent Activities</h3>
                <p className="text-gray-600">Your contributions and rewards</p>
              </div>
            </div>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{activity.title}</div>
                    <div className="text-sm text-gray-600 flex items-center space-x-2">
                      <span>Plot {activity.plot}</span>
                      <span>•</span>
                      <span>{activity.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-amber-600">+{activity.points} tokens</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Impact Tracker</h3>
                <p className="text-gray-600">Your environmental contribution</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">12.4</div>
                <div className="text-lg text-gray-600">tCO₂e Sequestered</div>
                <div className="text-sm text-gray-500">This year</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 mb-1">270</div>
                  <div className="text-sm text-gray-600">Total Trees</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">88%</div>
                  <div className="text-sm text-gray-600">Avg Survival</div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Community Rank</span>
                  <span className="font-bold text-teal-600">#12 of 156</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Monthly Goal</span>
                  <span className="font-bold text-green-600">85% Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/community/upload">
              <button className="w-full p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <Camera className="h-8 w-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-medium text-blue-700">Upload Photos</div>
                <div className="text-sm text-blue-600">Earn 15 tokens</div>
              </button>
            </Link>
            <Link href="/dashboard/community/monitor">
              <button className="w-full p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-medium text-green-700">Monitor Plot</div>
                <div className="text-sm text-green-600">Earn 25 tokens</div>
              </button>
            </Link>
            <Link href="/dashboard/community/rewards">
              <button className="w-full p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <Award className="h-8 w-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-medium text-purple-700">Redeem Rewards</div>
                <div className="text-sm text-purple-600">Use your tokens</div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


