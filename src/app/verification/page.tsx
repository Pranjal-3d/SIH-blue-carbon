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
        <div className="flex items-center justify-between px-5 py-3 border-b bg-gradient-to-r from-emerald-50 to-blue-50">
          <h3 className="font-semibold">{type === "photos" ? "Photo Gallery" : "Videos"}</h3>
          <Button size="sm" variant="secondary" onClick={onClose}>Close</Button>
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
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600">Verification Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">Review inspector uploads and approve or reject.</p>
          </div>
          <Badge color="emerald">Verifier View</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 transition-shadow hover:shadow-md">
            <CardHeader title="Basic Info" subtitle="Project identification and location" />
            <CardBody>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-gray-500">Project ID</p>
                  <p className="font-medium">{data.projectId}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-gray-500">Plot ID</p>
                  <p className="font-medium">{data.plotId}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-gray-500">Inspector</p>
                  <p className="font-medium">{data.inspector}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-gray-500">Timestamp</p>
                  <p className="font-medium">{mounted && clientTimestamp ? new Date(clientTimestamp).toLocaleString() : "—"}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-gray-500">Ecosystem</p>
                  <p className="font-medium capitalize">{data.ecosystemType}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-gray-500">GPS</p>
                  <p className="font-medium">{formatLatLon(data.gps.latitude, data.gps.longitude)}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-gray-500">Precision</p>
                  <p className="font-medium">±{data.gps.precision.toFixed(1)} m</p>
                </div>
              </div>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-blue-700 hover:underline">
                <MapPin className="h-4 w-4" /> Open in Google Maps
              </a>
            </CardBody>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader title="Media Proof" subtitle="Visual evidence of plantation" />
            <CardBody>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => setMediaOpen({ type: "photos" })} className="w-full sm:w-auto">
                  <ImageIcon className="mr-2 h-4 w-4" /> View Photos ({data.media.photos.length})
                </Button>
                <Button variant="secondary" onClick={() => setMediaOpen({ type: "videos" })} className="w-full sm:w-auto">
                  <VideoIcon className="mr-2 h-4 w-4" /> View Videos ({data.media.videos.length})
                </Button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {data.media.photos.slice(0, 3).map((src, i) => (
                  <div key={i} className="relative overflow-hidden rounded-md border">
                    <img src={src} alt={`thumb-${i}`} className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 transition-shadow hover:shadow-md">
            <CardHeader title="Ecosystem Data" subtitle="Schema-driven fields" />
            <CardBody>
              {data.ecosystemData.type === "mangrove" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-gray-500">Species List</p>
                    <p className="font-medium">{data.ecosystemData.speciesList.join(", ")}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-gray-500">Tree Count</p>
                    <p className="font-medium">{data.ecosystemData.treeCount}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-gray-500">Average Height</p>
                    <p className="font-medium">{data.ecosystemData.avgHeightM} m</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-gray-500">Seedlings</p>
                    <p className="font-medium">{data.ecosystemData.seedlingsCount}</p>
                  </div>
                </div>
              )}
              {data.ecosystemData.type === "seagrass" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-gray-500">Species List</p>
                    <p className="font-medium">{data.ecosystemData.speciesList.join(", ")}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-gray-500">Meadow Area</p>
                    <p className="font-medium">{data.ecosystemData.meadowAreaHa} ha</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-gray-500">Shoot Density</p>
                    <p className="font-medium">{data.ecosystemData.shootDensityPerM2} / m²</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-gray-500">Biomass</p>
                    <p className="font-medium">{data.ecosystemData.biomassTPerHa} t/ha</p>
                  </div>
                </div>
              )}
              {data.ecosystemData.type === "salt marsh" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-gray-500">Species List</p>
                    <p className="font-medium">{data.ecosystemData.speciesList.join(", ")}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-gray-500">Area</p>
                    <p className="font-medium">{data.ecosystemData.areaHa} ha</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-gray-500">Vegetation Height</p>
                    <p className="font-medium">{data.ecosystemData.vegetationHeightCm} cm</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-gray-500">Biomass</p>
                    <p className="font-medium">{data.ecosystemData.biomassTPerHa} t/ha</p>
                  </div>
                </div>
              )}
              {(data.ecosystemData.type === "tidal flat" || data.ecosystemData.type === "coastal peatland") && (
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-gray-500 capitalize">{data.ecosystemData.type} notes</p>
                  <p className="font-medium">{"notes" in data.ecosystemData ? data.ecosystemData.notes ?? "—" : "—"}</p>
                </div>
              )}
            </CardBody>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader title="Carbon Estimate" subtitle="Calculated CO₂ sequestration" />
            <CardBody>
              <div className="rounded-lg border p-5">
                <p className="text-xs text-gray-500">Estimated CO₂ Sequestration</p>
                <p className="mt-1 text-4xl font-semibold tracking-tight text-emerald-700">{data.co2EstimateTPerYear.toFixed(1)} <span className="text-base font-normal text-gray-600">t/yr</span></p>
              </div>
              <div className="mt-4 text-xs text-gray-600">
                Evidence hash: <span className="font-mono">{data.evidenceHash}</span>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 transition-shadow hover:shadow-md">
            <CardHeader title="Soil & Sensor Data" subtitle="Soil cores and onsite measurements" />
            <CardBody>
              <div className="overflow-x-auto">
                <table className="min-w-full border rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Core ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Depth (cm)</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.soilCores.map((c) => (
                      <tr key={c.soilCoreId} className="border-t">
                        <td className="px-4 py-2 font-medium">{c.soilCoreId}</td>
                        <td className="px-4 py-2">{c.depthCm}</td>
                        <td className="px-4 py-2">{c.label}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-gray-500">Salinity</p>
                  <p className="font-medium">{data.sensors.salinityPsu} PSU</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-gray-500">Water Temperature</p>
                  <p className="font-medium">{data.sensors.waterTemperatureC} °C</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-gray-500">pH</p>
                  <p className="font-medium">{data.sensors.pH}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader title="Actions" subtitle="Approve or reject the verification" />
            <CardBody>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={approve} className="w-full sm:w-auto">
                  <CheckCircle className="mr-2 h-4 w-4" /> Approve
                </Button>
                <Button variant="secondary" onClick={reject} className="w-full sm:w-auto">
                  <XCircle className="mr-2 h-4 w-4" /> Reject
                </Button>
              </div>
              {status && (
                <div className="mt-4 rounded-md border bg-gray-50 px-4 py-3 text-sm text-gray-700">
                  {status}
                </div>
              )}
            </CardBody>
          </Card>
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
