import { Search, Filter, ShoppingCart, TrendingUp, Leaf, MapPin } from "lucide-react";

export default function MarketplacePage() {
  const batches = [
    { id: "b-2024-01", project: "Sundarbans Mangrove", price: 11.2, available: 3200, location: "West Bengal", ecosystem: "Mangrove" },
    { id: "b-2024-07", project: "Gulf of Mannar Seagrass", price: 9.8, available: 1500, location: "Tamil Nadu", ecosystem: "Seagrass" },
    { id: "b-2025-02", project: "Kutch Saltmarsh", price: 12.5, available: 5200, location: "Gujarat", ecosystem: "Saltmarsh" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Carbon Credit Marketplace</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Purchase verified blue carbon credits from India's coastal restoration projects
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search projects..."
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--soft)] outline-none transition-all"
            />
          </div>
          <select className="h-12 rounded-xl border border-gray-200 px-4 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--soft)] outline-none">
            <option>All ecosystems</option>
            <option>Mangrove</option>
            <option>Seagrass</option>
            <option>Saltmarsh</option>
          </select>
          <select className="h-12 rounded-xl border border-gray-200 px-4 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--soft)] outline-none">
            <option>Sort by price</option>
            <option>Sort by availability</option>
            <option>Sort by location</option>
          </select>
          <button className="btn-outline h-12 rounded-xl flex items-center justify-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </button>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-2xl p-6 text-center">
            <TrendingUp className="h-8 w-8 text-[var(--eco)] mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">₹ 1,247</div>
            <div className="text-sm text-gray-600">Average Price / tCO₂e</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <ShoppingCart className="h-8 w-8 text-[var(--primary)] mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">9,900</div>
            <div className="text-sm text-gray-600">Credits Available</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <Leaf className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">63</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </div>
        </div>

        {/* Credit Batches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((b) => (
            <div key={b.id} className="card-dark rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-[var(--primary)] to-[var(--eco)] relative">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                    {b.ecosystem}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{b.location}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-1">Batch {b.id}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{b.project}</h3>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-[var(--eco)]">₹{(b.price * 83).toFixed(0)}</div>
                    <div className="text-sm text-gray-600">per tCO₂e</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">{b.available.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">available</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 btn-primary rounded-xl font-semibold flex items-center justify-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Buy Credits
                  </button>
                  <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


