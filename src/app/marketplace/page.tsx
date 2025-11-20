"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  MapPin, 
  Calendar, 
  Leaf, 
  Shield, 
  Users, 
  DollarSign,
  Eye,
  ShoppingCart,
  Heart,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Waves,
  TreePine,
  Globe,
  Coins,
  Award,
  Target,
  Activity,
  FileText,
  Download,
  Share2,
  Building,
  Phone,
  Mail,
  Info,
  Zap,
  Droplets
} from "lucide-react";
import { ethers } from "ethers";

// Type definitions
interface CarbonCredit {
  id: string;
  project: string;
  location: string;
  coordinates: string;
  price: number;
  available: number;
  total: number;
  rating: number;
  reviews: number;
  verified: boolean;
  type: string;
  co2Reduction: number;
  yearlyReduction: number;
  area: string;
  description: string;
  detailedDescription: string;
  benefits: string[];
  certification: string;
  certificationNumber: string;
  projectOwner: string;
  projectType: string;
  methodology: string;
  startDate: string;
  endDate: string;
  projectDuration: string;
  vintageYear: string;
  registry: string;
  registryId: string;
  sdgAlignment: string[];
  monitoringFrequency: string;
  lastMonitoring: string;
  additionality: string;
  permanence: string;
  leakage: string;
  cobenefits: string[];
  riskFactors: string[];
  contact: {
    name: string;
    position: string;
    email: string;
    phone: string;
    organization: string;
  };
  financials: {
    totalInvestment: string;
    carbonRevenue: string;
    communityInvestment: string;
    operatingCosts: string;
  };
}

export default function EnhancedMarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("price");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCredit, setSelectedCredit] = useState<CarbonCredit | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [walletError, setWalletError] = useState("");
  const [isProcessingTx, setIsProcessingTx] = useState(false);
  const [txStatus, setTxStatus] = useState("");
  useEffect(() => {
    if (typeof window === "undefined" || !(window as any).ethereum) return;
    const ethereum = (window as any).ethereum;

    const handleAccountsChanged = (accounts: string[]) => {
      setWalletAddress(accounts && accounts.length > 0 ? accounts[0] : "");
    };

    ethereum.on?.("accountsChanged", handleAccountsChanged);

    return () => {
      ethereum.removeListener?.("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const ensureWalletConnection = async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      throw new Error("Metamask not detected. Please install Metamask extension.");
    }

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);

    if (!accounts || accounts.length === 0) {
      throw new Error("No Metamask accounts found. Please unlock your wallet.");
    }

    setWalletAddress(accounts[0]);
    return {
      provider,
      signer: await provider.getSigner(),
      account: accounts[0],
    };
  };

  const connectWallet = async () => {
    try {
      setWalletError("");
      setIsConnectingWallet(true);
      await ensureWalletConnection();
    } catch (error: any) {
      if (error?.code === 4001) {
        setWalletError("Connection request rejected.");
      } else {
        setWalletError(error?.message || "Failed to connect wallet.");
      }
    } finally {
      setIsConnectingWallet(false);
    }
  };

  const handleBuyCredit = async (credit: CarbonCredit) => {
    try {
      setTxStatus("");
      setWalletError("");
      setIsProcessingTx(true);

      const { signer } = await ensureWalletConnection();

      const amountInEth = "0.001"; // demo amount
      setTxStatus(`Initiating purchase of ${credit.project} (sending ${amountInEth} ETH)...`);

      const tx = await signer.sendTransaction({
        to: await signer.getAddress(), // demo: send to self; replace with marketplace escrow
        value: ethers.parseEther(amountInEth),
      });

      setTxStatus("Waiting for transaction confirmation...");
      await tx.wait();

      setTxStatus(`✅ Transaction confirmed: ${tx.hash}`);
    } catch (error: any) {
      console.error("Transaction failed:", error);
      if (error?.code === 4001) {
        setTxStatus("❌ Transaction rejected by user.");
      } else {
        setTxStatus(`❌ Transaction failed: ${error?.message || "Unknown error"}`);
      }
    } finally {
      setIsProcessingTx(false);
    }
  };


  const carbonCredits = [
    {
      id: "CC-001",
      project: "Sundarbans Mangrove Restoration",
      location: "West Bengal, India",
      coordinates: "22.2637°N, 89.0714°E",
      price: 45.50,
      available: 1250,
      total: 2000,
      rating: 4.8,
      reviews: 156,
      verified: true,
      type: "Mangrove",
      co2Reduction: 2500,
      yearlyReduction: 500,
      area: "2,500 hectares",
      description: "Comprehensive mangrove restoration project in the Sundarbans delta, contributing to coastal protection and carbon sequestration while supporting local communities.",
      detailedDescription: "This project focuses on restoring degraded mangrove ecosystems in the Sundarbans, the world's largest mangrove forest. The initiative includes community-based restoration activities, sustainable livelihood programs, and biodiversity conservation efforts. The project directly benefits over 5,000 local families through alternative income sources and coastal protection.",
      benefits: ["Coastal Protection", "Biodiversity Conservation", "Carbon Sequestration", "Community Development", "Storm Buffer"],
      certification: "Gold Standard VER",
      certificationNumber: "GS-VER-001-2023",
      projectOwner: "Sundarbans Conservation Society",
      projectType: "REDD+ Blue Carbon",
      methodology: "VM0033 - Methodology for Blue Carbon",
      startDate: "2023-01-15",
      endDate: "2030-12-31",
      projectDuration: "8 years",
      vintageYear: "2023",
      registry: "Verra Registry",
      registryId: "VCS-2134",
      sdgAlignment: ["SDG 13", "SDG 14", "SDG 15", "SDG 1", "SDG 8"],
      monitoringFrequency: "Quarterly",
      lastMonitoring: "2024-03-15",
      additionality: "The project demonstrates additionality through barrier analysis and investment analysis, proving that without carbon finance, the restoration activities would not be economically viable.",
      permanence: "30 years with buffer pool allocation",
      leakage: "Minimal - comprehensive monitoring system in place",
      cobenefits: [
        "Employment for 500+ local community members",
        "Protection of 15 endangered species",
        "Improved fish catch for 2,000 fishing families",
        "Enhanced coastal resilience for 50,000 people"
      ],
      riskFactors: ["Climate change impacts", "Policy changes", "Natural disasters"],
      contact: {
        name: "Dr. Rajesh Kumar",
        position: "Project Director",
        email: "rajesh@sundarbansconservation.org",
        phone: "+91-9876543210",
        organization: "Sundarbans Conservation Society"
      },
      financials: {
        totalInvestment: "$2.5M",
        carbonRevenue: "$1.8M",
        communityInvestment: "$700K",
        operatingCosts: "$300K/year"
      }
    },
    {
      id: "CC-002", 
      project: "Gulf of Mannar Seagrass Restoration",
      location: "Tamil Nadu, India",
      coordinates: "9.2005°N, 79.0877°E",
      price: 38.75,
      available: 890,
      total: 1500,
      rating: 4.6,
      reviews: 89,
      verified: true,
      type: "Seagrass",
      co2Reduction: 1800,
      yearlyReduction: 300,
      area: "1,200 hectares",
      description: "Seagrass meadow restoration in the Gulf of Mannar Marine National Park, supporting marine biodiversity and carbon storage.",
      detailedDescription: "This innovative seagrass restoration project covers 1,200 hectares in the Gulf of Mannar, India's first Marine Biosphere Reserve. The project combines traditional knowledge with modern restoration techniques, involving local fishing communities in seagrass cultivation and maintenance. The restored seagrass beds serve as nurseries for commercial fish species and provide critical habitat for dugongs and sea turtles.",
      benefits: ["Marine Biodiversity", "Carbon Storage", "Water Quality", "Fish Habitat", "Tourism Revenue"],
      certification: "Verified Carbon Standard (VCS)",
      certificationNumber: "VCS-1456-2023",
      projectOwner: "Marine Conservation Trust",
      projectType: "Blue Carbon Restoration",
      methodology: "VM0026 - Methodology for Seagrass Restoration",
      startDate: "2023-03-01",
      endDate: "2028-02-28",
      projectDuration: "5 years",
      vintageYear: "2023",
      registry: "Verra Registry",
      registryId: "VCS-1456",
      sdgAlignment: ["SDG 14", "SDG 13", "SDG 8", "SDG 15"],
      monitoringFrequency: "Bi-annual",
      lastMonitoring: "2024-02-20",
      additionality: "Demonstrated through regulatory surplus analysis showing that restoration activities exceed mandatory requirements",
      permanence: "25 years with insurance coverage",
      leakage: "Controlled through comprehensive monitoring",
      cobenefits: [
        "25% increase in fish catch for local communities",
        "Habitat for 5 endangered marine species",
        "Eco-tourism revenue of $200K annually",
        "Training for 150 community members"
      ],
      riskFactors: ["Marine pollution", "Coastal development", "Climate variability"],
      contact: {
        name: "Dr. Priya Nair",
        position: "Marine Biologist",
        email: "priya@marineconservation.org",
        phone: "+91-9876543211",
        organization: "Marine Conservation Trust"
      },
      financials: {
        totalInvestment: "$1.2M",
        carbonRevenue: "$850K",
        communityInvestment: "$300K",
        operatingCosts: "$150K/year"
      }
    },
    {
      id: "CC-003",
      project: "Kutch Salt Marsh Development",
      location: "Gujarat, India", 
      coordinates: "23.7337°N, 68.7379°E",
      price: 52.00,
      available: 2100,
      total: 3000,
      rating: 4.9,
      reviews: 203,
      verified: true,
      type: "Salt Marsh",
      co2Reduction: 3200,
      yearlyReduction: 640,
      area: "3,800 hectares",
      description: "Salt marsh ecosystem development in the Rann of Kutch, providing critical habitat and carbon sequestration services.",
      detailedDescription: "Located in the ecologically sensitive Rann of Kutch, this project develops salt marsh ecosystems that serve as crucial carbon sinks while providing flood protection and wildlife habitat. The project works with local salt farmers to implement sustainable practices and create alternative livelihoods through eco-tourism and sustainable salt production.",
      benefits: ["Habitat Creation", "Carbon Sequestration", "Flood Protection", "Sustainable Livelihoods", "Wildlife Conservation"],
      certification: "Gold Standard for Global Goals",
      certificationNumber: "GS-VER-2456-2023",
      projectOwner: "Kutch Environmental Foundation",
      projectType: "Wetland Restoration",
      methodology: "VM0024 - Methodology for Coastal Wetlands",
      startDate: "2022-11-01",
      endDate: "2030-10-31",
      projectDuration: "8 years",
      vintageYear: "2023",
      registry: "Gold Standard Registry",
      registryId: "GS-2456",
      sdgAlignment: ["SDG 13", "SDG 15", "SDG 6", "SDG 1", "SDG 11"],
      monitoringFrequency: "Quarterly",
      lastMonitoring: "2024-03-10",
      additionality: "Project demonstrates financial additionality and removes key barriers to wetland restoration in the region",
      permanence: "40 years with legal protection",
      leakage: "Minimal due to integrated landscape approach",
      cobenefits: [
        "Habitat for 200+ bird species",
        "Livelihood support for 1,000 families",
        "Flood protection for 25,000 people",
        "Enhanced groundwater recharge"
      ],
      riskFactors: ["Industrial development", "Water scarcity", "Extreme weather"],
      contact: {
        name: "Mr. Arjun Patel",
        position: "Executive Director",
        email: "arjun@kutchenv.org",
        phone: "+91-9876543212",
        organization: "Kutch Environmental Foundation"
      },
      financials: {
        totalInvestment: "$4.2M",
        carbonRevenue: "$3.1M",
        communityInvestment: "$1.0M",
        operatingCosts: "$400K/year"
      }
    },
    {
      id: "CC-004",
      project: "Andaman Coral Reef Protection",
      location: "Andaman & Nicobar Islands",
      coordinates: "11.7401°N, 92.6586°E",
      price: 67.25,
      available: 750,
      total: 1200,
      rating: 4.7,
      reviews: 67,
      verified: true,
      type: "Coral Reef",
      co2Reduction: 1500,
      yearlyReduction: 300,
      area: "800 hectares",
      description: "Coral reef protection and restoration in pristine Andaman waters, supporting marine ecosystem health and tourism.",
      detailedDescription: "This pioneering coral reef protection project in the Andaman Islands focuses on coral restoration, marine protected area management, and sustainable tourism development. The project employs cutting-edge coral nursery techniques and community-based conservation approaches to protect one of India's most pristine marine ecosystems.",
      benefits: ["Marine Protection", "Tourism Revenue", "Carbon Storage", "Research Platform", "Biodiversity Hotspot"],
      certification: "Blue Carbon Standard",
      certificationNumber: "BCS-0123-2023",
      projectOwner: "Andaman Marine Research Institute",
      projectType: "Marine Conservation",
      methodology: "BC0001 - Blue Carbon Methodology for Coral Reefs",
      startDate: "2023-06-01",
      endDate: "2033-05-31",
      projectDuration: "10 years",
      vintageYear: "2023",
      registry: "Blue Carbon Registry",
      registryId: "BCR-0123",
      sdgAlignment: ["SDG 14", "SDG 13", "SDG 8", "SDG 12"],
      monitoringFrequency: "Monthly",
      lastMonitoring: "2024-03-25",
      additionality: "Baseline scenario analysis shows significant degradation without intervention",
      permanence: "50 years with adaptive management",
      leakage: "Prevented through stakeholder engagement",
      cobenefits: [
        "Support for 300 tourism jobs",
        "Habitat for 500+ marine species",
        "Research station for 20+ scientists",
        "Sustainable diving industry development"
      ],
      riskFactors: ["Ocean acidification", "Bleaching events", "Tourism pressure"],
      contact: {
        name: "Dr. Sarah Johnson",
        position: "Marine Researcher",
        email: "sarah@amri.gov.in",
        phone: "+91-9876543213",
        organization: "Andaman Marine Research Institute"
      },
      financials: {
        totalInvestment: "$3.5M",
        carbonRevenue: "$2.2M",
        communityInvestment: "$800K",
        operatingCosts: "$350K/year"
      }
    },
    {
      id: "CC-005",
      project: "Kerala Backwater Ecosystem Restoration",
      location: "Kerala, India",
      coordinates: "9.4981°N, 76.3388°E",
      price: 41.20,
      available: 1560,
      total: 2200,
      rating: 4.5,
      reviews: 124,
      verified: true,
      type: "Wetland",
      co2Reduction: 2100,
      yearlyReduction: 420,
      area: "1,800 hectares",
      description: "Comprehensive backwater ecosystem restoration focusing on water quality improvement and carbon sequestration.",
      detailedDescription: "This project addresses the degradation of Kerala's famous backwater ecosystems through comprehensive restoration activities including removal of invasive species, replanting of native vegetation, and implementation of sustainable tourism practices. The project works closely with houseboat operators and local communities to ensure long-term sustainability.",
      benefits: ["Water Quality", "Tourism Enhancement", "Carbon Storage", "Fisheries Support", "Cultural Preservation"],
      certification: "Climate Action Reserve",
      certificationNumber: "CAR-WET-456-2023",
      projectOwner: "Kerala Backwater Conservation Alliance",
      projectType: "Wetland Conservation",
      methodology: "CAR-WET-01 - Wetland Restoration Protocol",
      startDate: "2023-04-15",
      endDate: "2031-04-14",
      projectDuration: "8 years",
      vintageYear: "2023",
      registry: "Climate Action Reserve",
      registryId: "CAR-456",
      sdgAlignment: ["SDG 6", "SDG 13", "SDG 8", "SDG 15"],
      monitoringFrequency: "Bi-annual",
      lastMonitoring: "2024-02-28",
      additionality: "Investment analysis demonstrates need for carbon finance to make restoration viable",
      permanence: "35 years with state government support",
      leakage: "Controlled through integrated management",
      cobenefits: [
        "Tourism revenue increase of $500K annually",
        "Improved livelihoods for 800 families",
        "Water quality improvement for 100,000 people",
        "Preservation of traditional culture"
      ],
      riskFactors: ["Pollution", "Development pressure", "Climate change"],
      contact: {
        name: "Ms. Lakshmi Menon",
        position: "Program Manager",
        email: "lakshmi@keralabackwater.org",
        phone: "+91-9876543214",
        organization: "Kerala Backwater Conservation Alliance"
      },
      financials: {
        totalInvestment: "$1.8M",
        carbonRevenue: "$1.3M",
        communityInvestment: "$450K",
        operatingCosts: "$200K/year"
      }
    },
    {
      id: "CC-006",
      project: "Chilika Lake Restoration Initiative",
      location: "Odisha, India",
      coordinates: "19.7165°N, 85.4720°E",
      price: 48.90,
      available: 980,
      total: 1400,
      rating: 4.8,
      reviews: 91,
      verified: true,
      type: "Lagoon",
      co2Reduction: 1750,
      yearlyReduction: 350,
      area: "1,100 hectares",
      description: "Asia's largest brackish water lagoon restoration project focusing on biodiversity conservation and carbon sequestration.",
      detailedDescription: "Chilika Lake, Asia's largest brackish water lagoon and a UNESCO World Heritage site, faces significant ecological challenges. This restoration project addresses siltation, invasive species, and pollution while enhancing the lake's role as a carbon sink and critical habitat for migratory birds.",
      benefits: ["Bird Migration Support", "Fisheries Enhancement", "Carbon Storage", "Flood Control", "Research Hub"],
      certification: "Verified Carbon Standard Plus",
      certificationNumber: "VCS-PLUS-789-2023",
      projectOwner: "Chilika Development Authority",
      projectType: "Lagoon Restoration",
      methodology: "VM0007 - REDD+ Methodology Framework",
      startDate: "2023-02-10",
      endDate: "2030-02-09",
      projectDuration: "7 years",
      vintageYear: "2023",
      registry: "Verra Registry",
      registryId: "VCS-789",
      sdgAlignment: ["SDG 15", "SDG 13", "SDG 6", "SDG 14"],
      monitoringFrequency: "Monthly",
      lastMonitoring: "2024-03-05",
      additionality: "Regulatory surplus and barrier analysis confirm additionality",
      permanence: "30 years with government backing",
      leakage: "Prevented through community engagement",
      cobenefits: [
        "Habitat for 1 million+ migratory birds",
        "Support for 200,000 fishing families",
        "Tourism revenue of $2M annually",
        "Research opportunities for 50+ institutions"
      ],
      riskFactors: ["Siltation", "Climate variability", "Industrial pollution"],
      contact: {
        name: "Dr. Bikash Ranjan Parida",
        position: "Chief Executive",
        email: "bikash@chilika.org",
        phone: "+91-9876543215",
        organization: "Chilika Development Authority"
      },
      financials: {
        totalInvestment: "$2.8M",
        carbonRevenue: "$1.9M",
        communityInvestment: "$600K",
        operatingCosts: "$280K/year"
      }
    }
  ];

  const stats = [
    { label: "Total Credits Available", value: "9,540 tCO₂e", icon: Coins, change: "+18%", trend: "up" },
    { label: "Active Projects", value: "47", icon: TreePine, change: "+12", trend: "up" },
    { label: "Verified Organizations", value: "32", icon: Shield, change: "+8", trend: "up" },
    { label: "Average Price", value: "₹47.23", icon: DollarSign, change: "-2.1%", trend: "down" },
    { label: "Total Investment", value: "$18.2M", icon: Building, change: "+25%", trend: "up" },
    { label: "Community Benefits", value: "15,000+ families", icon: Users, change: "+1,200", trend: "up" }
  ];

  const filteredCredits = carbonCredits.filter(credit => {
    const matchesSearch = credit.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credit.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credit.projectOwner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || credit.type.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const sortedCredits = [...filteredCredits].sort((a, b) => {
    switch(sortBy) {
      case "price": return a.price - b.price;
      case "rating": return b.rating - a.rating;
      case "available": return b.available - a.available;
      case "co2": return b.co2Reduction - a.co2Reduction;
      default: return 0;
    }
  });

  // Create placeholder image function
  const getPlaceholderImage = (type: string, index: number) => {
    const colors = ['blue', 'green', 'teal', 'indigo', 'purple', 'pink'];
    const color = colors[index % colors.length];
    
    const typeIcons: { [key: string]: string } = {
      'Mangrove': '🌿',
      'Seagrass': '🌾',
      'Salt Marsh': '🏞️',
      'Coral Reef': '🪸',
      'Wetland': '🦆',
      'Lagoon': '🏝️'
    };
    
    return (
      <div className={`w-full h-full bg-gradient-to-br from-${color}-400 to-${color}-600 flex items-center justify-center text-white text-6xl`}>
        {typeIcons[type] || '🌊'}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                  <Waves className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Blue Carbon Marketplace
                  </h1>
                  <p className="text-gray-600 text-lg">Trade verified blue carbon credits from certified marine and coastal projects</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-50 px-4 py-2 rounded-lg">
                <p className="text-sm text-green-700 font-medium">🌱 Climate Positive Trading</p>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <p className="text-sm text-blue-700 font-medium">
                  {walletAddress ? `Wallet: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "No wallet connected"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={connectWallet}
                disabled={isConnectingWallet}
                className="px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:shadow-lg disabled:opacity-60"
              >
                {isConnectingWallet ? "Connecting..." : walletAddress ? "Reconnect Wallet" : "Connect Metamask"}
              </button>
              {walletError && <p className="text-sm text-red-600">{walletError}</p>}
            </div>
            {txStatus && (
              <p className="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
                {txStatus}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                  <TrendIcon className={`h-4 w-4 ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`} />
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </p>
              </div>
            );
          })}
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects, locations, organizations, or certifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-32"
              >
                <option value="all">All Ecosystems</option>
                <option value="mangrove">Mangrove</option>
                <option value="seagrass">Seagrass</option>
                <option value="salt marsh">Salt Marsh</option>
                <option value="coral reef">Coral Reef</option>
                <option value="wetland">Wetland</option>
                <option value="lagoon">Lagoon</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-32"
              >
                <option value="price">Price (Low to High)</option>
                <option value="rating">Highest Rated</option>
                <option value="available">Most Available</option>
                <option value="co2">Highest Impact</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Credits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {sortedCredits.map((credit, index) => (
            <div key={credit.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Image with Overlay */}
              <div className="relative h-56 overflow-hidden">
                {getPlaceholderImage(credit.type, index)}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {credit.certification}
                  </span>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {credit.type}
                  </span>
                </div>
                
                {/* Top Right Actions */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">{credit.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{credit.rating}</span>
                      <span className="text-xs opacity-80">({credit.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Content */}
              <div className="p-6">
                {/* Project Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{credit.project}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{credit.description}</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium">Total CO₂ Impact</p>
                    <p className="text-lg font-bold text-blue-900">{credit.co2Reduction.toLocaleString()}</p>
                    <p className="text-xs text-blue-700">tCO₂e</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs text-green-600 font-medium">Project Area</p>
                    <p className="text-lg font-bold text-green-900">{credit.area}</p>
                    <p className="text-xs text-green-700">protected</p>
                  </div>
                </div>

                {/* Benefits Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {credit.benefits.slice(0, 3).map((benefit, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {benefit}
                    </span>
                  ))}
                  {credit.benefits.length > 3 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      +{credit.benefits.length - 3} more
                    </span>
                  )}
                </div>

                {/* Availability Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Available Credits</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {credit.available.toLocaleString()}/{credit.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                      style={{width: `${(credit.available/credit.total) * 100}%`}}
                    ></div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Project Owner:</span>
                    <span className="font-medium text-gray-900">{credit.projectOwner}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-gray-900">{credit.projectDuration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Vintage Year:</span>
                    <span className="font-medium text-gray-900">{credit.vintageYear}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Annual Reduction:</span>
                    <span className="font-medium text-gray-900">{credit.yearlyReduction} tCO₂e/year</span>
                  </div>
                </div>

                {/* SDG Alignment */}
                <div className="mb-6">
                  <p className="text-xs text-gray-600 mb-2">UN SDG Alignment:</p>
                  <div className="flex flex-wrap gap-1">
                    {credit.sdgAlignment.map((sdg, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {sdg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">₹{credit.price}</p>
                    <p className="text-xs text-gray-500">per tCO₂e</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedCredit(credit)}
                      className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleBuyCredit(credit)}
                      disabled={isProcessingTx}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 font-medium disabled:opacity-60"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>{isProcessingTx ? "Processing..." : "Buy Credits"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Load More */}
        <div className="text-center mt-12">
          <div className="mb-4">
            <p className="text-gray-600">Showing {sortedCredits.length} of {carbonCredits.length} projects</p>
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
            Load More Projects
          </button>
        </div>
      </div>

      {/* Detailed Modal */}
      {selectedCredit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCredit.project}</h2>
                  <p className="text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedCredit.location} • {selectedCredit.coordinates}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedCredit(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedCredit.detailedDescription}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Co-benefits</h3>
                     <ul className="space-y-2">
                       {selectedCredit.cobenefits.map((benefit: string, idx: number) => (
                         <li key={idx} className="flex items-start text-gray-700">
                           <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                           {benefit}
                         </li>
                       ))}
                     </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Project Financials</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-600">Total Investment</p>
                        <p className="font-bold text-blue-900">{selectedCredit.financials.totalInvestment}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-600">Carbon Revenue</p>
                        <p className="font-bold text-green-900">{selectedCredit.financials.carbonRevenue}</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm text-purple-600">Community Investment</p>
                        <p className="font-bold text-purple-900">{selectedCredit.financials.communityInvestment}</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <p className="text-sm text-orange-600">Operating Costs</p>
                        <p className="font-bold text-orange-900">{selectedCredit.financials.operatingCosts}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Project Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Methodology:</span>
                        <span className="font-medium">{selectedCredit.methodology}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Registry:</span>
                        <span className="font-medium">{selectedCredit.registry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Registry ID:</span>
                        <span className="font-medium">{selectedCredit.registryId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Permanence:</span>
                        <span className="font-medium">{selectedCredit.permanence}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monitoring:</span>
                        <span className="font-medium">{selectedCredit.monitoringFrequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Verified:</span>
                        <span className="font-medium">{selectedCredit.lastMonitoring}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium text-gray-900">{selectedCredit.contact.name}</p>
                      <p className="text-sm text-gray-600">{selectedCredit.contact.position}</p>
                      <p className="text-sm text-gray-600 mt-2">{selectedCredit.contact.organization}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <a href={`mailto:${selectedCredit.contact.email}`} className="flex items-center text-blue-600 hover:text-blue-800">
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </a>
                        <a href={`tel:${selectedCredit.contact.phone}`} className="flex items-center text-blue-600 hover:text-blue-800">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Risk Assessment</h3>
                     <div className="space-y-2">
                       {selectedCredit.riskFactors.map((risk: string, idx: number) => (
                         <div key={idx} className="flex items-center text-gray-700">
                           <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                           {risk}
                         </div>
                       ))}
                     </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Download className="h-4 w-4" />
                    <span>Download Report</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <FileText className="h-4 w-4" />
                    <span>View Certificate</span>
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">₹{selectedCredit.price}</p>
                    <p className="text-sm text-gray-500">per tCO₂e</p>
                  </div>
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-200 font-semibold">
                    Purchase Credits
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}