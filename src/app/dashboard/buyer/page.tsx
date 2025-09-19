"use client";

import React, { useState, useEffect } from 'react';
import {
  ShoppingCart, Award, TrendingDown, DollarSign, Leaf,
  Plus, Minus, Download, Eye, Calendar, MapPin, CheckCircle,
  CreditCard, Receipt, BarChart3, Globe, Zap, Target
} from "lucide-react";
import Link from "next/link";

export default function BuyerDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [retireAmount, setRetireAmount] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      label: "Credits Owned",
      value: "150 tCO₂e",
      icon: <Leaf className="h-6 w-6" />,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      textColor: "text-green-700"
    },
    {
      label: "Retired Credits",
      value: "0 tCO₂e",
      icon: <Award className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
      textColor: "text-blue-700"
    },
    {
      label: "Total Spent",
      value: "₹ 3.2L",
      icon: <DollarSign className="h-6 w-6" />,
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50",
      textColor: "text-purple-700"
    }
  ];

  const portfolio = [
    {
      batchId: "BC-2024-007",
      project: "Sundarbans Mangrove Restoration",
      credits: 150,
      price: "₹ 2,25,000",
      purchasedDate: "2024-01-10",
      status: "active",
      location: "West Bengal, India",
      projectType: "Mangrove Restoration"
    }
  ];

  const transactions = [
    {
      id: "TX-2024-001",
      type: "purchase",
      amount: "150 tCO₂e",
      value: "₹ 2,25,000",
      date: "2024-01-10",
      status: "completed",
      txHash: "0x999aaa111bbb222ccc"
    }
  ];

  const marketplaceCredits = [
    {
      id: "BC-2024-008",
      project: "Gulf of Mannar Seagrass Beds",
      credits: 500,
      price: "₹ 7,50,000",
      pricePerCredit: "₹ 1,500",
      location: "Tamil Nadu, India",
      rating: 4.8,
      verified: true
    },
    {
      id: "BC-2024-009",
      project: "Kutch Salt Marsh Project",
      credits: 300,
      price: "₹ 4,50,000",
      pricePerCredit: "₹ 1,500",
      location: "Gujarat, India",
      rating: 4.6,
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg">
            <ShoppingCart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Carbon Credit Buyer Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Purchase, manage, and retire carbon credits to offset your environmental impact
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

        {/* Marketplace Section */}
        <div className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Carbon Credit Marketplace</h2>
              <p className="text-gray-600">Browse and purchase verified carbon credits</p>
            </div>
            <Link href="/marketplace">
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Browse Marketplace</span>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketplaceCredits.map((credit, index) => (
              <div key={index} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{credit.project}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{credit.location}</span>
                      </div>
                    </div>
                  </div>
                  {credit.verified && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{credit.credits} tCO₂e</div>
                    <div className="text-sm text-gray-600">Available Credits</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{credit.price}</div>
                    <div className="text-sm text-gray-600">{credit.pricePerCredit}/credit</div>
                  </div>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Purchase Credits
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio & Transactions */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Your Portfolio</h3>
                <p className="text-gray-600">Carbon credit holdings and status</p>
              </div>
            </div>

            <div className="space-y-4">
              {portfolio.map((item, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold text-gray-900">{item.project}</div>
                      <div className="text-sm text-gray-600">Batch {item.batchId}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{item.credits} tCO₂e</div>
                      <div className="text-sm text-gray-600">{item.price}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Purchased {item.purchasedDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Receipt className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Transaction History</h3>
                <p className="text-gray-600">Recent purchases and activities</p>
              </div>
            </div>

            <div className="space-y-4">
              {transactions.map((tx, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Purchased {tx.amount}</div>
                    <div className="text-sm text-gray-600 flex items-center space-x-2">
                      <span>{tx.value}</span>
                      <span>•</span>
                      <span>{tx.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 font-mono">{tx.txHash.slice(0, 10)}...</div>
                    <button className="text-xs text-indigo-600 hover:text-indigo-800 mt-1">View TX</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Retire Credits */}
        <div className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Retire Carbon Credits</h3>
              <p className="text-gray-600">Permanently retire credits and generate retirement certificates</p>
            </div>
          </div>

          <div className="max-w-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity to Retire (tCO₂e)
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                value={retireAmount}
                onChange={(e) => setRetireAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                max="150"
              />
              <p className="text-sm text-gray-500 mt-1">Available: 150 tCO₂e</p>
            </div>

            <div className="flex space-x-3">
              <Link href="/dashboard/buyer/retire">
                <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Retire & Generate Certificate</span>
                </button>
              </Link>
              <button className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Download Certificate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Impact Summary */}
        <div className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Environmental Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">150</div>
              <div className="text-sm text-gray-600">Trees Equivalent</div>
              <div className="text-xs text-gray-500 mt-1">Based on average sequestration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2.5</div>
              <div className="text-sm text-gray-600">Years of CO₂ Absorption</div>
              <div className="text-xs text-gray-500 mt-1">For an average car</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">₹2.25L</div>
              <div className="text-sm text-gray-600">Investment in Restoration</div>
              <div className="text-xs text-gray-500 mt-1">Supporting blue carbon projects</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


