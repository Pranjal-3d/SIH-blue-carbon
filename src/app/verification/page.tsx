"use client";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle, XCircle, Image as ImageIcon, Video as VideoIcon, MapPin } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type EcosystemType = "mangrove" | "seagrass" | "salt marsh" | "tidal flat" | "coastal peatland";

type VerificationData = {
  projectId: string;
  plotId: string;
  inspector: string;
  timestamp: string;
  gps: { latitude: number; longitude: number; precision: number };
  ecosystemType: EcosystemType;
  media: { photos: string[]; videos: string[] };
  ecosystemData:
    | { type: "mangrove"; speciesList: string[]; treeCount: number; avgHeightM: number; seedlingsCount: number }
    | { type: "seagrass"; speciesList: string[]; meadowAreaHa: number; shootDensityPerM2: number; biomassTPerHa: number }
    | { type: "salt marsh"; speciesList: string[]; areaHa: number; vegetationHeightCm: number; biomassTPerHa: number }
    | { type: "tidal flat"; notes?: string }
    | { type: "coastal peatland"; notes?: string };
  soilCores: { soilCoreId: string; depthCm: number; label: string }[];
  sensors: { salinityPsu: number; waterTemperatureC: number; pH: number };
  co2EstimateTPerYear: number;
  evidenceHash: string;
};

function formatLatLon(lat: number, lon: number) {
  const latDir = lat >= 0 ? "N" : "S";
  const lonDir = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(5)}° ${latDir}, ${Math.abs(lon).toFixed(5)}° ${lonDir}`;
}

function MediaModal({ open, onClose, type, items }: { open: boolean; onClose: () => void; type: "photos" | "videos"; items: string[] }) {
  const [current, setCurrent] = useState(0);
  if (!open) return null;

  const hasPhotos = type === "photos" && items.length > 0;
  const next = () => setCurrent((c) => (c + 1) % items.length);
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-5xl mx-4 rounded-xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b bg-gradient-to-r from-purple-50 to-blue-50">
          <h3 className="font-semibold text-gray-800">{type === "photos" ? "Photo Gallery" : "Videos"}</h3>
          <button 
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
        <div className="p-5">
          {type === "photos" ? (
            <div className="">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border">
                {hasPhotos && (
                  <img
                    src={items[current]}
                    alt={`photo-${current}`}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform"
                  />
                )}
                <button aria-label="Previous" onClick={prev} className="group absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button aria-label="Next" onClick={next} className="group absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </button>
                <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                  {items.map((_, i) => (
                    <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-emerald-500" : "w-2 bg-white/70"}`} />
                  ))}
                </div>
              </div>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {items.map((src, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`relative aspect-video h-16 overflow-hidden rounded-lg border transition ring-offset-2 focus:outline-none focus:ring-2 ${i === current ? "ring-emerald-500" : "hover:shadow"}`}>
                    <img src={src} alt={`thumb-${i}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((src, idx) => (
                <video key={idx} controls className="w-full rounded-lg border shadow-sm">
                  <source src={src} />
                </video>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerificationPage() {
  const data: VerificationData = useMemo(
    () => ({
      projectId: "BC-2025-00042",
      plotId: "TN-MANG-PLT-07",
      inspector: "A. Sharma",
      timestamp: "", // set on client after mount to avoid hydration mismatch
      gps: { latitude: 12.98542, longitude: 80.25191, precision: 3.2 },
      ecosystemType: "mangrove",
      media: {
        photos: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1526483360412-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
        ],
        videos: [
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
        ],
      },
      ecosystemData: {
        type: "mangrove",
        speciesList: ["Rhizophora apiculata", "Avicennia marina"],
        treeCount: 482,
        avgHeightM: 1.8,
        seedlingsCount: 120,
      },
      soilCores: [
        { soilCoreId: "SC-01", depthCm: 45, label: "Dark peat layer" },
        { soilCoreId: "SC-02", depthCm: 60, label: "Clay-silt mix" },
        { soilCoreId: "SC-03", depthCm: 30, label: "Sandy topsoil" },
      ],
      sensors: { salinityPsu: 32.4, waterTemperatureC: 27.8, pH: 7.6 },
      co2EstimateTPerYear: 86.5,
      evidenceHash: "0x5a8f...c12e",
    }),
    []
  );

  const [status, setStatus] = useState("");
  const [mediaOpen, setMediaOpen] = useState<null | { type: "photos" | "videos" }>(null);
  const [mounted, setMounted] = useState(false);
  const [clientTimestamp, setClientTimestamp] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    // generate timestamp on client to ensure identical server/client HTML initially
    setClientTimestamp(new Date().toISOString());
  }, []);

  const mapsUrl = useMemo(() => `https://www.google.com/maps?q=${data.gps.latitude},${data.gps.longitude}`, [data.gps.latitude, data.gps.longitude]);

  const approve = () => setStatus("✅ Project Approved Successfully!");
  const reject = () => setStatus("❌ Project Rejected!");

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-green-400 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-800">BlueCarbon</h1>
            </div>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Home</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Projects</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Marketplace</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">About</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">MRV System</a>
              </nav>
              <div className="flex items-center gap-3">
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Login</a>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Register Project
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Basic Info</h3>
              <p className="text-white/80 text-sm">Project identification and location</p>
            </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                <p className="text-xs text-white/70">Project ID</p>
                <p className="font-medium text-white">{data.projectId}</p>
                </div>
              <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                <p className="text-xs text-white/70">Plot ID</p>
                <p className="font-medium text-white">{data.plotId}</p>
                </div>
              <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                <p className="text-xs text-white/70">Inspector</p>
                <p className="font-medium text-white">{data.inspector}</p>
                </div>
              <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                <p className="text-xs text-white/70">Timestamp</p>
                <p className="font-medium text-white">{mounted && clientTimestamp ? new Date(clientTimestamp).toLocaleString() : "—"}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                <p className="text-xs text-white/70">Ecosystem</p>
                <p className="font-medium text-white capitalize">{data.ecosystemType}</p>
                </div>
              <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                <p className="text-xs text-white/70">GPS</p>
                <p className="font-medium text-white">{formatLatLon(data.gps.latitude, data.gps.longitude)}</p>
                </div>
              <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                <p className="text-xs text-white/70">Precision</p>
                <p className="font-medium text-white">±{data.gps.precision.toFixed(1)} m</p>
              </div>
            </div>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors">
                <MapPin className="h-4 w-4" /> Open in Google Maps
              </a>
          </div>

          <div className="bg-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Media Proof</h3>
              <p className="text-white/80 text-sm">Visual evidence of plantation</p>
            </div>
              <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setMediaOpen({ type: "photos" })} 
                className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <ImageIcon className="h-4 w-4" /> View Photos ({data.media.photos.length})
              </button>
              <button 
                onClick={() => setMediaOpen({ type: "videos" })} 
                className="bg-transparent text-white border border-white hover:bg-white/10 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <VideoIcon className="h-4 w-4" /> View Videos ({data.media.videos.length})
              </button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {data.media.photos.slice(0, 3).map((src, i) => (
                <div key={i} className="relative overflow-hidden rounded-md border border-purple-300/30">
                    <img src={src} alt={`thumb-${i}`} className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                ))}
              </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Ecosystem Data</h3>
              <p className="text-white/80 text-sm">Schema-driven fields</p>
            </div>
              {data.ecosystemData.type === "mangrove" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                  <p className="text-xs text-white/70">Species List</p>
                  <p className="font-medium text-white">{data.ecosystemData.speciesList.join(", ")}</p>
                  </div>
                <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                  <p className="text-xs text-white/70">Tree Count</p>
                  <p className="font-medium text-white">{data.ecosystemData.treeCount}</p>
                  </div>
                <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                  <p className="text-xs text-white/70">Average Height</p>
                  <p className="font-medium text-white">{data.ecosystemData.avgHeightM} m</p>
                  </div>
                <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                  <p className="text-xs text-white/70">Seedlings</p>
                  <p className="font-medium text-white">{data.ecosystemData.seedlingsCount}</p>
                  </div>
                </div>
              )}
              {data.ecosystemData.type === "seagrass" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                  <p className="text-xs text-white/70">Species List</p>
                  <p className="font-medium text-white">{data.ecosystemData.speciesList.join(", ")}</p>
                  </div>
                <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                  <p className="text-xs text-white/70">Meadow Area</p>
                  <p className="font-medium text-white">{data.ecosystemData.meadowAreaHa} ha</p>
                  </div>
                <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                  <p className="text-xs text-white/70">Shoot Density</p>
                  <p className="font-medium text-white">{data.ecosystemData.shootDensityPerM2} / m²</p>
                  </div>
                <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                  <p className="text-xs text-white/70">Biomass</p>
                  <p className="font-medium text-white">{data.ecosystemData.biomassTPerHa} t/ha</p>
                  </div>
                </div>
              )}
              {data.ecosystemData.type === "salt marsh" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                  <p className="text-xs text-white/70">Species List</p>
                  <p className="font-medium text-white">{data.ecosystemData.speciesList.join(", ")}</p>
                  </div>
                <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                  <p className="text-xs text-white/70">Area</p>
                  <p className="font-medium text-white">{data.ecosystemData.areaHa} ha</p>
                  </div>
                <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                  <p className="text-xs text-white/70">Vegetation Height</p>
                  <p className="font-medium text-white">{data.ecosystemData.vegetationHeightCm} cm</p>
                </div>
                <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                  <p className="text-xs text-white/70">Biomass</p>
                  <p className="font-medium text-white">{data.ecosystemData.biomassTPerHa} t/ha</p>
                </div>
              </div>
            )}
            {(data.ecosystemData.type === "tidal flat" || data.ecosystemData.type === "coastal peatland") && (
              <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                <p className="text-xs text-white/70 capitalize">{data.ecosystemData.type} notes</p>
                <p className="font-medium text-white">{"notes" in data.ecosystemData ? data.ecosystemData.notes ?? "—" : "—"}</p>
              </div>
            )}
          </div>

          <div className="bg-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Carbon Estimate</h3>
              <p className="text-white/80 text-sm">Calculated CO₂ sequestration</p>
            </div>
            <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-5">
              <p className="text-xs text-white/70">Estimated CO₂ Sequestration</p>
              <p className="mt-1 text-4xl font-semibold tracking-tight text-teal-400">{data.co2EstimateTPerYear.toFixed(1)} <span className="text-base font-normal text-white/80">t/yr</span></p>
            </div>
            <div className="mt-4 text-xs text-white/70">
              Evidence hash: <span className="font-mono text-teal-400">{data.evidenceHash}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Soil & Sensor Data</h3>
              <p className="text-white/80 text-sm">Soil cores and onsite measurements</p>
            </div>
              <div className="overflow-x-auto">
              <table className="min-w-full border border-purple-300/30 rounded-lg overflow-hidden">
                <thead className="bg-purple-400/20">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Core ID</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Depth (cm)</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Label</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.soilCores.map((c) => (
                    <tr key={c.soilCoreId} className="border-t border-purple-300/30">
                      <td className="px-4 py-2 font-medium text-white">{c.soilCoreId}</td>
                      <td className="px-4 py-2 text-white">{c.depthCm}</td>
                      <td className="px-4 py-2 text-white">{c.label}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                <p className="text-xs text-white/70">Salinity</p>
                <p className="font-medium text-white">{data.sensors.salinityPsu} PSU</p>
                </div>
              <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                <p className="text-xs text-white/70">Water Temperature</p>
                <p className="font-medium text-white">{data.sensors.waterTemperatureC} °C</p>
                </div>
              <div className="rounded-lg bg-purple-400/20 border border-purple-300/30 p-4">
                <p className="text-xs text-white/70">pH</p>
                <p className="font-medium text-white">{data.sensors.pH}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Actions</h3>
              <p className="text-white/80 text-sm">Approve or reject the verification</p>
            </div>
              <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={approve} 
                className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-4 w-4" /> Approve
              </button>
              <button 
                onClick={reject} 
                className="bg-transparent text-white border border-white hover:bg-white/10 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="h-4 w-4" /> Reject
              </button>
              </div>
              {status && (
              <div className="mt-4 rounded-md border border-purple-300/30 bg-purple-400/20 px-4 py-3 text-sm text-white">
                  {status}
                </div>
              )}
          </div>
        </div>

        {/* Statistical Cards Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{data.co2EstimateTPerYear.toFixed(0)}</div>
            <div className="text-sm text-white/80">tCO2e</div>
          </div>
          
          <div className="bg-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">1</div>
            <div className="text-sm text-white/80">Credits Issued</div>
          </div>
          
          <div className="bg-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">1</div>
            <div className="text-sm text-white/80">Active Projects</div>
          </div>
          
          <div className="bg-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">0.5</div>
            <div className="text-sm text-white/80">Verified Area (ha)</div>
          </div>
        </div>

        <MediaModal
          open={!!mediaOpen}
          onClose={() => setMediaOpen(null)}
          type={mediaOpen?.type === "videos" ? "videos" : "photos"}
          items={mediaOpen?.type === "videos" ? data.media.videos : data.media.photos}
        />
      </div>
    </div>
  );
}
