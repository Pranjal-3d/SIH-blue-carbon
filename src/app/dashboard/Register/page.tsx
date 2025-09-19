"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Upload, Camera, Satellite, Users, TreePine, Calendar, 
  FileText, Shield, Zap, CheckCircle, ArrowRight, ArrowLeft,
  Globe, Waves, Leaf, Building, Clock, Target, AlertCircle,
  Eye, EyeOff, Sparkles, MousePointer, Crosshair, Navigation,
  BarChart3, FileCheck, Heart, Award, TrendingUp, Smartphone,
  Database, User, Mail, Phone, MapIcon, Layers, Briefcase
} from "lucide-react";

// Type definitions
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface Location {
  lat: string;
  lng: string;
  address: string;
}

interface Document {
  name: string;
  type: string;
  size: number;
  category: string;
}

interface FormData {
  projectName: string;
  description: string;
  ecosystemType: string;
  organizationName: string;
  ownerName: string;
  email: string;
  phone: string;
  area: string;
  density: string;
  location: Location;
  startDate: string;
  duration: string;
  legalOwnership: string;
  permits: string[];
  baselineData: string;
  monitoringPlan: string;
  validator: string;
  communityConsent: boolean;
  documents: Document[];
  // New fields for plantation data
  plantationSpecies: string[];
  treeCount: string;
  averageHeight: string;
  averageLength: string;
  averageBreadth: string;
  seedlings: string;
  estimatedCO2Sequestration: number;
}

interface CurrentLocation {
  lat: number;
  lng: number;
}

export default function ProjectRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    description: '',
    ecosystemType: '',
    organizationName: '',
    ownerName: '',
    email: '',
    phone: '',
    area: '',
    density: '',
    location: { lat: '', lng: '', address: '' },
    startDate: '',
    duration: '',
    legalOwnership: '',
    permits: [],
    baselineData: '',
    monitoringPlan: '',
    validator: '',
    communityConsent: false,
    documents: [],
    // New fields for plantation data
    plantationSpecies: [],
    treeCount: '',
    averageHeight: '',
    averageLength: '',
    averageBreadth: '',
    seedlings: '',
    estimatedCO2Sequestration: 0
  });
  const [locationLoading, setLocationLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);
  const [draggedOver, setDraggedOver] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  const steps = [
    { title: "Project Basics", icon: <TreePine className="h-5 w-5" />, fields: 4 },
    { title: "Organization", icon: <Building className="h-5 w-5" />, fields: 3 },
    { title: "Location & Area", icon: <MapPin className="h-5 w-5" />, fields: 3 },
    { title: "Plantation Data", icon: <Leaf className="h-5 w-5" />, fields: 6 },
    { title: "Legal & Permits", icon: <Shield className="h-5 w-5" />, fields: 4 },
    { title: "Monitoring & Validation", icon: <BarChart3 className="h-5 w-5" />, fields: 3 },
    { title: "Final Review", icon: <CheckCircle className="h-5 w-5" />, fields: 0 }
  ];

  const ecosystemTypes = [
    { 
      id: 'mangroves', 
      name: 'Mangroves', 
      icon: <TreePine className="h-8 w-8" />, 
      color: 'from-green-500 to-green-600',
      description: 'Coastal wetland forests'
    },
    { 
      id: 'seagrass', 
      name: 'Seagrass Beds', 
      icon: <Waves className="h-8 w-8" />, 
      color: 'from-blue-500 to-blue-600',
      description: 'Marine flowering plants'
    },
    { 
      id: 'salt_marsh', 
      name: 'Salt Marshes', 
      icon: <Leaf className="h-8 w-8" />, 
      color: 'from-purple-500 to-purple-600',
      description: 'Coastal grasslands'
    },
    { 
      id: 'coral_reef', 
      name: 'Coral Reefs', 
      icon: <Database className="h-8 w-8" />, 
      color: 'from-orange-500 to-red-500',
      description: 'Marine biodiversity hotspots'
    }
  ];

  // Common plantation species for different ecosystems
  const plantationSpeciesOptions = {
    mangroves: [
      'Rhizophora apiculata',
      'Avicennia marina',
      'Rhizophora mucronata',
      'Bruguiera gymnorrhiza',
      'Sonneratia alba',
      'Ceriops tagal',
      'Excoecaria agallocha',
      'Lumnitzera racemosa'
    ],
    seagrass: [
      'Thalassia hemprichii',
      'Cymodocea serrulata',
      'Halodule uninervis',
      'Syringodium isoetifolium',
      'Enhalus acoroides',
      'Halophila ovalis'
    ],
    salt_marsh: [
      'Spartina alterniflora',
      'Salicornia europaea',
      'Suaeda maritima',
      'Atriplex portulacoides',
      'Limonium vulgare'
    ],
    coral_reef: [
      'Acropora cervicornis',
      'Porites astreoides',
      'Montastraea cavernosa',
      'Diploria strigosa',
      'Siderastrea siderea'
    ]
  };

  // CO2 Sequestration calculation function
  const calculateCO2Sequestration = (treeCount: number, avgHeight: number, avgLength: number, avgBreadth: number, ecosystemType: string): number => {
    // Basic biomass calculation based on tree dimensions
    const volume = avgHeight * avgLength * avgBreadth; // m³
    const biomass = volume * 0.6; // kg (approximate biomass density)
    
    // CO2 sequestration factors by ecosystem type (kg CO2 per kg biomass per year)
    const co2Factors = {
      mangroves: 1.8,
      seagrass: 0.9,
      salt_marsh: 1.2,
      coral_reef: 0.3
    };
    
    const factor = co2Factors[ecosystemType as keyof typeof co2Factors] || 1.0;
    const co2PerTree = biomass * factor;
    const totalCO2 = (co2PerTree * treeCount) / 1000; // Convert to tonnes
    
    return Math.round(totalCO2 * 100) / 100; // Round to 2 decimal places
  };

  // Particle animation system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
    particlesRef.current = particles;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
        
        // Connect nearby particles
        particles.slice(index + 1).forEach((otherParticle: Particle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.1 * (1 - distance / 150)})`;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    setIsVisible(true);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Get current location
  const getCurrentLocation = () => {
    setLocationLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          // Simulate reverse geocoding
          const address = `Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
          
          setFormData(prev => ({
            ...prev,
            location: { lat: lat.toString(), lng: lng.toString(), address }
          }));
          setCurrentLocation({ lat, lng });
          setLocationLoading(false);
        },
        (error: GeolocationPositionError) => {
          console.error('Location error:', error);
          setLocationLoading(false);
        }
      );
    }
  };

  // Smart form suggestions
  const getSmartSuggestions = (field: keyof FormData, value: string): string[] => {
    const suggestions: Record<string, string[]> = {
      organizationName: ['Coastal Conservation Foundation', 'Marine Restoration Society', 'Blue Ocean Initiative'],
      monitoringPlan: ['Satellite imagery + field surveys', 'Drone monitoring + community data', 'IoT sensors + manual verification'],
      validator: ['Indian Institute of Science', 'National Remote Sensing Centre', 'Wildlife Institute of India']
    };
    
    return suggestions[field]?.filter((s: string) => 
      s.toLowerCase().includes(value.toLowerCase())
    ) || [];
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList, type: string) => {
    const newFiles: Document[] = Array.from(files).map((file: File) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      category: type
    }));
    
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newFiles]
    }));
  };

  // Handle species selection
  const handleSpeciesToggle = (species: string) => {
    setFormData(prev => {
      const newSpecies = prev.plantationSpecies.includes(species)
        ? prev.plantationSpecies.filter(s => s !== species)
        : [...prev.plantationSpecies, species];
      
      return { ...prev, plantationSpecies: newSpecies };
    });
  };

  // Update CO2 calculation when tree dimensions change
  const updateCO2Calculation = () => {
    const treeCount = parseFloat(formData.treeCount) || 0;
    const avgHeight = parseFloat(formData.averageHeight) || 0;
    const avgLength = parseFloat(formData.averageLength) || 0;
    const avgBreadth = parseFloat(formData.averageBreadth) || 0;
    
    if (treeCount > 0 && avgHeight > 0 && avgLength > 0 && avgBreadth > 0) {
      const co2Sequestration = calculateCO2Sequestration(
        treeCount, 
        avgHeight, 
        avgLength, 
        avgBreadth, 
        formData.ecosystemType
      );
      
      setFormData(prev => ({
        ...prev,
        estimatedCO2Sequestration: co2Sequestration
      }));
    }
  };

  // Effect to recalculate CO2 when relevant fields change
  useEffect(() => {
    updateCO2Calculation();
  }, [formData.treeCount, formData.averageHeight, formData.averageLength, formData.averageBreadth, formData.ecosystemType]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 relative overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />
      
      {/* Interactive cursor trail */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-blue-400 to-green-400 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${Math.sin(Date.now() * 0.01) * 0.3 + 1})`,
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-ping opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          <div className={`w-4 h-4 bg-gradient-to-r ${i % 2 === 0 ? 'from-blue-400 to-green-400' : 'from-green-400 to-blue-400'} rounded-full`} />
        </div>
      ))}

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Progress Section */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

          {/* Enhanced Progress Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    index <= currentStep 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 scale-110' 
                      : 'bg-white/20 backdrop-blur-sm'
                  }`}>
                    {step.icon}
                  </div>
                  <span className={`text-xs mt-2 transition-colors duration-300 ${
                    index <= currentStep ? 'text-white font-semibold' : 'text-white/60'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`absolute top-6 left-12 w-16 h-0.5 transition-all duration-500 ${
                      index < currentStep ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              >
                <div className="h-full bg-gradient-to-r from-white/30 to-transparent rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Container with Glass Morphism */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
            <div className="p-8">
              
              {/* Step 0: Project Basics */}
              {currentStep === 0 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-8">
                    <TreePine className="h-16 w-16 text-green-400 mx-auto mb-4 animate-bounce" />
                    <h2 className="text-3xl font-bold text-white mb-2">Project Basics</h2>
                    <p className="text-blue-200">Tell us about your restoration project</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-white font-medium flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-yellow-400" />
                        <span>Project Name</span>
                      </label>
                      <input
                        type="text"
                        value={formData.projectName}
                        onChange={(e) => handleInputChange('projectName', e.target.value)}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="e.g., Sundarbans Mangrove Restoration"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-white font-medium">Ecosystem Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {ecosystemTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => handleInputChange('ecosystemType', type.id)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 group ${
                              formData.ecosystemType === type.id
                                ? `bg-gradient-to-r ${type.color} border-white/50 scale-105`
                                : 'bg-white/5 border-white/20 hover:border-white/40 hover:scale-105'
                            }`}
                          >
                            <div className="text-center">
                              <div className={`mx-auto mb-2 ${formData.ecosystemType === type.id ? 'text-white' : 'text-blue-200'} group-hover:scale-110 transition-transform`}>
                                {type.icon}
                              </div>
                              <div className={`text-sm font-medium ${formData.ecosystemType === type.id ? 'text-white' : 'text-blue-200'}`}>
                                {type.name}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-white font-medium">Project Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Describe your restoration goals, methods, and expected outcomes..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-white font-medium">Project Area (hectares)</label>
                      <input
                        type="number"
                        value={formData.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="e.g., 100"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-white font-medium">Vegetation Density (per hectare)</label>
                      <input
                        type="number"
                        value={formData.density}
                        onChange={(e) => handleInputChange('density', e.target.value)}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="e.g., 500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Organization */}
              {currentStep === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-8">
                    <Building className="h-16 w-16 text-blue-400 mx-auto mb-4 animate-pulse" />
                    <h2 className="text-3xl font-bold text-white mb-2">Organization Details</h2>
                    <p className="text-blue-200">Information about your organization</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-white font-medium flex items-center space-x-2">
                        <Building className="h-4 w-4" />
                        <span>Organization Name</span>
                      </label>
                      <input
                        type="text"
                        value={formData.organizationName}
                        onChange={(e) => handleInputChange('organizationName', e.target.value)}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your organization name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-white font-medium flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Project Owner Name</span>
                      </label>
                      <input
                        type="text"
                        value={formData.ownerName}
                        onChange={(e) => handleInputChange('ownerName', e.target.value)}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Full name of project owner"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-white font-medium flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="contact@organization.org"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-white font-medium flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Location & Area */}
              {currentStep === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-8">
                    <MapPin className="h-16 w-16 text-green-400 mx-auto mb-4 animate-bounce" />
                    <h2 className="text-3xl font-bold text-white mb-2">Location & Area</h2>
                    <p className="text-blue-200">Specify the geographic details</p>
                  </div>

                  <div className="space-y-6">
                    {/* Interactive Location Section */}
                    <div className="bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-2xl p-6 border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                          <Navigation className="h-5 w-5" />
                          <span>Project Location</span>
                        </h3>
                        <button
                          onClick={getCurrentLocation}
                          disabled={locationLoading}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
                        >
                          {locationLoading ? (
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          ) : (
                            <Crosshair className="h-4 w-4" />
                          )}
                          <span>{locationLoading ? 'Getting Location...' : 'Get Current Location'}</span>
                        </button>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-white/80 text-sm">Latitude</label>
                          <input
                            type="text"
                            value={formData.location.lat}
                            onChange={(e) => setFormData(prev => ({ ...prev, location: { ...prev.location, lat: e.target.value } }))}
                            className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                            placeholder="19.0760"
                          />
                        </div>
                        <div>
                          <label className="text-white/80 text-sm">Longitude</label>
                          <input
                            type="text"
                            value={formData.location.lng}
                            onChange={(e) => setFormData(prev => ({ ...prev, location: { ...prev.location, lng: e.target.value } }))}
                            className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                            placeholder="72.8777"
                          />
                        </div>
                        <div>
                          <label className="text-white/80 text-sm">Address</label>
                          <input
                            type="text"
                            value={formData.location.address}
                            onChange={(e) => setFormData(prev => ({ ...prev, location: { ...prev.location, address: e.target.value } }))}
                            className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                            placeholder="Enter address or description"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Timeline Section */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-white font-medium flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Project Start Date</span>
                        </label>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-white font-medium flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Expected Duration (years)</span>
                        </label>
                        <input
                          type="number"
                          value={formData.duration}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                          className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="e.g., 10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Plantation Data */}
              {currentStep === 3 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-8">
                    <Leaf className="h-16 w-16 text-green-400 mx-auto mb-4 animate-bounce" />
                    <h2 className="text-3xl font-bold text-white mb-2">Plantation Data</h2>
                    <p className="text-blue-200">Specify species and tree dimensions for CO₂ calculation</p>
                  </div>

                  <div className="space-y-6">
                    {/* Species Selection */}
                    <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-white/20">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                        <TreePine className="h-5 w-5" />
                        <span>Plantation Species</span>
                      </h3>
                      
                      {formData.ecosystemType && plantationSpeciesOptions[formData.ecosystemType as keyof typeof plantationSpeciesOptions] ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {plantationSpeciesOptions[formData.ecosystemType as keyof typeof plantationSpeciesOptions].map((species) => (
                            <button
                              key={species}
                              onClick={() => handleSpeciesToggle(species)}
                              className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm ${
                                formData.plantationSpecies.includes(species)
                                  ? 'border-green-400 bg-green-400/20 text-green-300'
                                  : 'border-white/20 bg-white/5 text-white/70 hover:border-green-300 hover:bg-green-400/10'
                              }`}
                            >
                              {species}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-white/60 text-center py-4">Please select an ecosystem type first</p>
                      )}
                    </div>

                    {/* Tree Count and Dimensions */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-white font-medium flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>Tree Count</span>
                        </label>
                        <input
                          type="number"
                          value={formData.treeCount}
                          onChange={(e) => handleInputChange('treeCount', e.target.value)}
                          className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="e.g., 482"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-white font-medium flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>Seedlings</span>
                        </label>
                        <input
                          type="number"
                          value={formData.seedlings}
                          onChange={(e) => handleInputChange('seedlings', e.target.value)}
                          className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="e.g., 120"
                        />
                      </div>
                    </div>

                    {/* Tree Dimensions */}
                    <div className="bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-2xl p-6 border border-white/20">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                        <Target className="h-5 w-5" />
                        <span>Average Tree Dimensions (meters)</span>
                      </h3>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-white/80 text-sm">Height</label>
                          <input
                            type="number"
                            step="0.1"
                            value={formData.averageHeight}
                            onChange={(e) => handleInputChange('averageHeight', e.target.value)}
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                            placeholder="e.g., 1.8"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-white/80 text-sm">Length</label>
                          <input
                            type="number"
                            step="0.1"
                            value={formData.averageLength}
                            onChange={(e) => handleInputChange('averageLength', e.target.value)}
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                            placeholder="e.g., 2.5"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-white/80 text-sm">Breadth</label>
                          <input
                            type="number"
                            step="0.1"
                            value={formData.averageBreadth}
                            onChange={(e) => handleInputChange('averageBreadth', e.target.value)}
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                            placeholder="e.g., 1.2"
                          />
                        </div>
                      </div>
                    </div>

                    {/* CO2 Estimation Display */}
                    {formData.estimatedCO2Sequestration > 0 && (
                      <div className="bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-2xl p-6 border border-green-400/30">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                          <BarChart3 className="h-5 w-5" />
                          <span>Estimated CO₂ Sequestration</span>
                        </h3>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-300 mb-2">
                            {formData.estimatedCO2Sequestration} t/yr
                          </div>
                          <p className="text-white/70">Calculated based on tree dimensions and ecosystem type</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Legal & Permits */}
              {currentStep === 4 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-8">
                    <Shield className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-pulse" />
                    <h2 className="text-3xl font-bold text-white mb-2">Legal & Permits</h2>
                    <p className="text-blue-200">Legal ownership and documentation</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-white font-medium">Legal Ownership Status</label>
                      <select
                        value={formData.legalOwnership}
                        onChange={(e) => handleInputChange('legalOwnership', e.target.value)}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select ownership type</option>
                        <option value="owned">Fully Owned</option>
                        <option value="leased">Leased</option>
                        <option value="community">Community Owned</option>
                        <option value="government">Government Land</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-white font-medium">Baseline Carbon Stock Data</label>
                      <textarea
                        value={formData.baselineData}
                        onChange={(e) => handleInputChange('baselineData', e.target.value)}
                        rows={3}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Describe existing biomass surveys, historical land use data, or other baseline measurements..."
                      />
                    </div>

                    {/* Community Consent */}
                    <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-white/20">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.communityConsent}
                          onChange={(e) => handleInputChange('communityConsent', e.target.checked)}
                          className="w-6 h-6 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <div>
                          <span className="text-white font-medium">Community Consent Obtained</span>
                          <p className="text-white/70 text-sm">I confirm that proper consent has been obtained from local communities and stakeholders</p>
                        </div>
                      </label>
                    </div>

                    {/* Document Upload */}
                    <div className="space-y-4">
                      <label className="text-white font-medium flex items-center space-x-2">
                        <Upload className="h-4 w-4" />
                        <span>Supporting Documents</span>
                      </label>
                      
                      <div 
                        className={`border-2 border-dashed border-white/30 rounded-2xl p-8 text-center transition-all duration-300 ${
                          draggedOver ? 'border-blue-400 bg-blue-500/20 scale-105' : 'hover:border-white/50'
                        }`}
                        onDragOver={(e) => { e.preventDefault(); setDraggedOver(true); }}
                        onDragLeave={() => setDraggedOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDraggedOver(false);
                          handleFileUpload(e.dataTransfer.files, 'legal');
                        }}
                      >
                        <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                        <p className="text-white mb-2">Drag & drop files here or click to browse</p>
                        <p className="text-white/60 text-sm">Land ownership documents, permits, environmental clearances</p>
                        <input
                          type="file"
                          multiple
                          onChange={(e) => e.target.files && handleFileUpload(e.target.files, 'legal')}
                          className="hidden"
                          id="legal-docs"
                        />
                        <label
                          htmlFor="legal-docs"
                          className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg transition-all cursor-pointer"
                        >
                          Browse Files
                        </label>
                      </div>

                      {/* Show uploaded files */}
                      {formData.documents.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-white font-medium">Uploaded Documents:</p>
                          {formData.documents.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                              <span className="text-white text-sm">{doc.name}</span>
                              <FileCheck className="h-4 w-4 text-green-400" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Monitoring & Validation */}
              {currentStep === 5 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-8">
                    <BarChart3 className="h-16 w-16 text-orange-400 mx-auto mb-4 animate-bounce" />
                    <h2 className="text-3xl font-bold text-white mb-2">Monitoring & Validation</h2>
                    <p className="text-blue-200">How will you measure and verify progress?</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-white font-medium">Monitoring Plan</label>
                      <textarea
                        value={formData.monitoringPlan}
                        onChange={(e) => handleInputChange('monitoringPlan', e.target.value)}
                        rows={4}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Describe your monitoring approach: field surveys, remote sensing, IoT sensors, community data collection..."
                      />
                      
                      {/* Smart suggestions */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {getSmartSuggestions('monitoringPlan', formData.monitoringPlan).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleInputChange('monitoringPlan', suggestion)}
                            className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm hover:bg-blue-500/30 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-white font-medium">Third-party Validator</label>
                      <input
                        type="text"
                        value={formData.validator}
                        onChange={(e) => handleInputChange('validator', e.target.value)}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Name of validation organization or 'To be determined'"
                      />
                      
                      {/* Smart suggestions */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {getSmartSuggestions('validator', formData.validator).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleInputChange('validator', suggestion)}
                            className="px-3 py-1 bg-green-500/20 text-green-200 rounded-full text-sm hover:bg-green-500/30 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* MRV Technology Options */}
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { icon: <Smartphone className="h-8 w-8" />, title: "Field Apps", desc: "Mobile data collection" },
                        { icon: <Camera className="h-8 w-8" />, title: "Drone Surveys", desc: "Aerial monitoring" },
                        { icon: <Satellite className="h-8 w-8" />, title: "Satellite Data", desc: "Remote sensing" }
                      ].map((tech, index) => (
                        <div key={index} className="bg-white/5 border border-white/20 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300">
                          <div className="text-blue-300 mb-2">{tech.icon}</div>
                          <h4 className="text-white font-medium">{tech.title}</h4>
                          <p className="text-white/60 text-sm">{tech.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Final Review */}
              {currentStep === 6 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-8">
                    <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4 animate-pulse" />
                    <h2 className="text-3xl font-bold text-white mb-2">Review & Submit</h2>
                    <p className="text-blue-200">Please review your information before submission</p>
                  </div>

                  <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                        <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                          <TreePine className="h-5 w-5 text-green-400" />
                          <span>Project Details</span>
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">Name:</span>
                            <span className="text-white">{formData.projectName || 'Not specified'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Type:</span>
                            <span className="text-white">{formData.ecosystemType || 'Not specified'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Area:</span>
                            <span className="text-white">{formData.area || 'Not specified'} ha</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                        <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                          <Building className="h-5 w-5 text-blue-400" />
                          <span>Organization</span>
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">Organization:</span>
                            <span className="text-white">{formData.organizationName || 'Not specified'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Owner:</span>
                            <span className="text-white">{formData.ownerName || 'Not specified'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Email:</span>
                            <span className="text-white">{formData.email || 'Not specified'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-8 border border-white/20 text-center">
                      <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Ready to Submit?</h3>
                      <p className="text-white/70 mb-6">Your project will be reviewed by our verification team within 5-7 business days.</p>
                      
                      <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto">
                        <CheckCircle className="h-5 w-5" />
                        <span>Submit Project Registration</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                    currentStep === 0
                      ? 'bg-white/10 text-white/50 cursor-not-allowed'
                      : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-4">
                  <span className="text-white/70 text-sm">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  
                  {currentStep < steps.length - 1 ? (
                    <button
                      onClick={nextStep}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>Next</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(-30px); }
          70% { transform: translateY(-15px); }
          90% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}