"use client";

import React, { useState, useEffect } from 'react';
import { Database, Blocks, Users, ScanLine, Leaf, Waves, Shield, Menu, X, ArrowRight, CheckCircle, Globe, Zap, TreePine, Heart, Award, TrendingUp, MapPin, Clock, DollarSign, Smartphone, Satellite, Camera, FileCheck, Coins, Building, Users2, Handshake, BarChart3 } from "lucide-react";
import Link from "next/link";
import ClientMap from "@/components/ClientMap";
import { TimeSeries } from "@/components/TimeSeries";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export default function BlueCarbonLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white overflow-x-hidden">
      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .ocean-gradient {
          background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%);
        }
        .eco-gradient {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        }
        .floating {
          animation: floating 3s ease-in-out infinite;
        }
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .slide-in {
          animation: slideIn 0.8s ease-out;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                BlueCarbon
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</a>
              <a href="/projects" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Projects</a>
              <a href="/marketplace" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Marketplace</a>
              <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">About</a>
              <a href="/mrv-system" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">MRV System</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth" className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Login
              </Link>
              <a href="/register-project" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:shadow-lg transition-all">
                Register Project
              </a>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Home</a>
              <a href="/projects" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Projects</a>
              <a href="/marketplace" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Marketplace</a>
              <a href="/about" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">About</a>
              <a href="/mrv-system" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">MRV System</a>
              <div className="pt-4 flex flex-col space-y-2">
                <Link href="/auth" className="px-3 py-2 text-blue-600 text-left">Login</Link>
                <a href="/register-project" className="px-3 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg">
                  Register Project
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-green-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="slide-in">
            <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 leading-tight">
              Blockchain-Powered
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">
                Blue Carbon Registry
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing coastal ecosystem restoration through transparent, verifiable, and decentralized 
              Monitoring, Reporting & Verification (MRV) system
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="/register-project" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl transition-all glow group">
                <span className="flex items-center justify-center">
                  Register Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </a>
              <a href="/marketplace" className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all">
                Explore Marketplace
              </a>
            </div>

            {/* Floating Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: 128450, suffix: " tCO₂e", label: "Credits Issued", icon: <Leaf className="h-6 w-6" /> },
                { value: 63, label: "Active Projects", icon: <TreePine className="h-6 w-6" /> },
                { value: 7420, suffix: " ha", label: "Verified Area", icon: <Globe className="h-6 w-6" /> },
                { value: 38, label: "Communities", icon: <Heart className="h-6 w-6" /> }
              ].map((stat, i) => (
                <div key={i} className="floating bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white card-hover" style={{animationDelay: `${i * 0.2}s`}}>
                  <div className="flex items-center justify-center mb-3 text-green-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix || ""} />
                  </div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">The Challenge We're Solving</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              India's blue carbon restoration efforts lack transparency, verifiable monitoring, and decentralized governance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-12 w-12 text-red-500" />,
                title: "Lack of Transparency",
                description: "Traditional monitoring systems are centralized and opaque, making it difficult to verify restoration claims and carbon credit authenticity."
              },
              {
                icon: <FileCheck className="h-12 w-12 text-orange-500" />,
                title: "Inadequate MRV Systems",
                description: "Current Monitoring, Reporting, and Verification processes are manual, time-consuming, and prone to errors and manipulation."
              },
              {
                icon: <Users2 className="h-12 w-12 text-blue-500" />,
                title: "Community Exclusion",
                description: "Coastal communities and local NGOs often lack access to participate in carbon credit markets due to complex registration processes."
              }
            ].map((problem, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg card-hover">
                <div className="mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{problem.title}</h3>
                <p className="text-gray-600">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Blockchain Solution</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive, decentralized platform that ensures transparency, accuracy, and community participation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-semibold mb-6 text-blue-600">Key Features</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: <Database className="h-6 w-6 text-blue-500" />,
                    title: "Immutable Registry",
                    description: "All plantation and restoration data stored permanently on blockchain"
                  },
                  {
                    icon: <Coins className="h-6 w-6 text-green-500" />,
                    title: "Tokenized Carbon Credits",
                    description: "Smart contracts automatically generate tradable credits based on verified data"
                  },
                  {
                    icon: <Smartphone className="h-6 w-6 text-purple-500" />,
                    title: "Multi-Source Data Integration",
                    description: "Field apps, drone surveys, and satellite imagery for comprehensive monitoring"
                  },
                  {
                    icon: <Handshake className="h-6 w-6 text-orange-500" />,
                    title: "Community Onboarding",
                    description: "Easy registration for NGOs, coastal communities, and panchayats"
                  }
                ].map((feature, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="bg-gray-100 p-2 rounded-lg">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center floating">
                  <Blocks className="h-16 w-16 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-4">Blockchain Architecture</h4>
                <p className="text-gray-600">
                  Built on secure, scalable blockchain infrastructure ensuring data integrity, 
                  transparency, and decentralized governance for all stakeholders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-green-900 text-white" id="how">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A simple, transparent process from project registration to credit trading
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Project Registration",
                description: "NGOs and communities submit restoration project details with location data and restoration plans",
                icon: <Building className="h-8 w-8" />
              },
              {
                step: "02", 
                title: "Data Collection",
                description: "Multi-source monitoring using field apps, drone surveys, and satellite imagery for comprehensive tracking",
                icon: <Satellite className="h-8 w-8" />
              },
              {
                step: "03",
                title: "Verification & Validation",
                description: "Third-party auditors validate restoration progress using MRV data and blockchain-stored evidence",
                icon: <CheckCircle className="h-8 w-8" />
              },
              {
                step: "04",
                title: "Credit Tokenization",
                description: "Smart contracts automatically mint tradable carbon credits based on verified restoration achievements",
                icon: <Coins className="h-8 w-8" />
              }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 card-hover">
                  <div className="text-4xl font-bold text-green-300 mb-4">{step.step}</div>
                  <div className="text-green-300 mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-white/80">{step.description}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-green-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Map Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Active Projects Across India</h2>
            <p className="text-xl text-gray-600">Real-time monitoring of blue carbon restoration initiatives</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-xl">
              <div className="h-[500px]">
                <ClientMap
                  points={[
                    { id: "p-001", name: "Sundarbans", lat: 21.9497, lng: 88.9083 },
                    { id: "p-002", name: "Gulf of Mannar", lat: 9.171, lng: 79.041 },
                    { id: "p-003", name: "Kutch", lat: 23.7337, lng: 69.8597 },
                  ]}
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Live Dashboard</h3>
                <div className="space-y-4">
                  {[
                    { icon: <BarChart3 className="h-5 w-5 text-blue-500" />, label: "On-chain transactions today", value: "32" },
                    { icon: <Clock className="h-5 w-5 text-orange-500" />, label: "Projects awaiting verification", value: "7" },
                    { icon: <TrendingUp className="h-5 w-5 text-green-500" />, label: "Credits available for trading", value: "10,900" },
                    { icon: <DollarSign className="h-5 w-5 text-purple-500" />, label: "Average price per credit", value: "₹980/tCO₂e" }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {stat.icon}
                        <span className="text-sm text-gray-600">{stat.label}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <a href="/projects" className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MRV Technology */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Advanced MRV Integration</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multi-layered monitoring system combining cutting-edge technology for unprecedented accuracy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="h-12 w-12 text-blue-500" />,
                title: "Field Data Collection",
                description: "Mobile applications for real-time data entry by field teams and local communities",
                features: ["GPS-enabled data logging", "Photo documentation", "Species identification", "Growth tracking"]
              },
              {
                icon: <Camera className="h-12 w-12 text-green-500" />,
                title: "Drone Surveillance",
                description: "Automated aerial monitoring for comprehensive area coverage and change detection",
                features: ["High-resolution imaging", "Thermal analysis", "3D mapping", "Progress monitoring"]
              },
              {
                icon: <Satellite className="h-12 w-12 text-purple-500" />,
                title: "Satellite Integration",
                description: "Space-based monitoring for large-scale ecosystem health assessment",
                features: ["Vegetation indices", "Biomass estimation", "Carbon stock analysis", "Climate impact modeling"]
              }
            ].map((tech, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg card-hover border-t-4 border-blue-500">
                <div className="mb-6">{tech.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{tech.title}</h3>
                <p className="text-gray-600 mb-6">{tech.description}</p>
                <ul className="space-y-2">
                  {tech.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
          </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Time Series */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Carbon Credits Performance</h2>
            <p className="text-xl text-gray-600">Track the growth of verified carbon credits over time</p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <TimeSeries
              data={[
                { date: "Jan", value: 1200 },
                { date: "Feb", value: 1600 },
                { date: "Mar", value: 1400 },
                { date: "Apr", value: 2000 },
                { date: "May", value: 2400 },
                { date: "Jun", value: 2300 },
              ]}
              label="tCO₂e"
            />
          </div>
        </div>
      </section>

      {/* Stakeholder Benefits */}
      <section className="py-24 bg-gradient-to-br from-green-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Benefits for All Stakeholders</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Creating value across the entire blue carbon ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "NGOs & Communities",
                icon: <Heart className="h-8 w-8" />,
                benefits: ["Easy project registration", "Transparent funding", "Direct market access", "Fair revenue sharing"]
              },
              {
                title: "Governments",
                icon: <Building className="h-8 w-8" />,
                benefits: ["Policy compliance tracking", "Environmental impact monitoring", "Transparent reporting", "International credibility"]
              },
              {
                title: "Investors & Buyers",
                icon: <TrendingUp className="h-8 w-8" />,
                benefits: ["Verified carbon credits", "Real-time project tracking", "Impact transparency", "ESG compliance"]
              },
              {
                title: "Coastal Communities",
                icon: <Users2 className="h-8 w-8" />,
                benefits: ["Employment opportunities", "Skill development", "Ecosystem restoration", "Sustainable livelihoods"]
              }
            ].map((stakeholder, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 card-hover">
                <div className="text-green-300 mb-4">{stakeholder.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{stakeholder.title}</h3>
                <ul className="space-y-2">
                  {stakeholder.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-center text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-green-300 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
            Ready to Transform Blue Carbon Restoration?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join our revolutionary platform and be part of the solution for sustainable coastal ecosystem restoration
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/dashboard/owner/add-project" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl transition-all glow text-lg">Register a Project</a>
            <a href="/projects" className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all text-lg">Support a Project</a>
          </div>
        </div>
      </section>
    </div>
  );
}