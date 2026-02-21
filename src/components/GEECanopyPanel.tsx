"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polygon,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

type DatasetOption = {
  id: string;
  label: string;
  description: string;
  suggestedTile?: string;
};

const DATASETS: DatasetOption[] = [
  {
    id: "gedi",
    label: "GEDI L2A Canopy Height",
    description: "NASA GEDI canopy height mosaics (2019‑present)",
    suggestedTile: process.env.NEXT_PUBLIC_GEE_GEDI_TILE_URL,
  },
  {
    id: "sentinel",
    label: "Sentinel-2 NDVI Composite",
    description: "Vegetation vigor proxy derived from Sentinel-2 L2A imagery",
    suggestedTile: process.env.NEXT_PUBLIC_GEE_SENTINEL_TILE_URL,
  },
  {
    id: "custom",
    label: "Custom Map ID + Token",
    description: "Paste Google Earth Engine Map ID & token from Code Editor",
  },
];

type SamplePoint = {
  latOffset: number;
  lngOffset: number;
  canopyHeight: number;
  canopyCover: number;
};

const MOCK_POINTS: SamplePoint[] = [
  { latOffset: 0.012, lngOffset: 0.018, canopyHeight: 18.5, canopyCover: 0.68 },
  { latOffset: -0.008, lngOffset: 0.022, canopyHeight: 23.4, canopyCover: 0.74 },
  { latOffset: 0.019, lngOffset: -0.014, canopyHeight: 14.2, canopyCover: 0.52 },
  { latOffset: -0.015, lngOffset: -0.02, canopyHeight: 11.5, canopyCover: 0.48 },
  { latOffset: 0.004, lngOffset: 0.006, canopyHeight: 27.1, canopyCover: 0.81 },
  { latOffset: -0.01, lngOffset: -0.004, canopyHeight: 19.3, canopyCover: 0.65 },
  { latOffset: 0.021, lngOffset: 0.01, canopyHeight: 16.8, canopyCover: 0.57 },
];

const DEFAULT_CENTER: [number, number] = [16.9902, 73.312];

interface GEECanopyPanelProps {
  center?: [number, number];
  projectName?: string;
}

const metersToLatDegrees = (meters: number) => meters / 111_320;
const metersToLngDegrees = (meters: number, latitude: number) =>
  meters / (111_320 * Math.cos((latitude * Math.PI) / 180));

export function GEECanopyPanel({
  center = DEFAULT_CENTER,
  projectName,
}: GEECanopyPanelProps) {
  const [dataset, setDataset] = useState<string>("gedi");
  const [heightThreshold, setHeightThreshold] = useState(12);
  const [radiusMeters, setRadiusMeters] = useState(500);
  const [customMapId, setCustomMapId] = useState("");
  const [customToken, setCustomToken] = useState("");
  const [tileTemplate, setTileTemplate] = useState<string>(
    process.env.NEXT_PUBLIC_GEE_TILE_URL ?? ""
  );
  const [manualTile, setManualTile] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (dataset === "custom") return;
    const suggestion = DATASETS.find((d) => d.id === dataset)?.suggestedTile;
    if (suggestion) {
      setTileTemplate(suggestion);
    }
  }, [dataset]);

  const canopyPoints = useMemo(() => {
    return MOCK_POINTS.map((point) => ({
      lat: center[0] + point.latOffset,
      lng: center[1] + point.lngOffset,
      canopyHeight:
        dataset === "sentinel"
          ? Number((point.canopyHeight * 0.8 + 5).toFixed(1))
          : point.canopyHeight,
      canopyCover: point.canopyCover,
    }));
  }, [center, dataset]);

  const filteredPoints = canopyPoints.filter(
    (point) => point.canopyHeight >= heightThreshold
  );

  const averageHeight =
    filteredPoints.reduce((sum, point) => sum + point.canopyHeight, 0) /
    (filteredPoints.length || 1);

  const averageCover =
    canopyPoints.reduce((sum, point) => sum + point.canopyCover, 0) /
    canopyPoints.length;

  const areaHectares = Number(
    ((Math.PI * radiusMeters * radiusMeters) / 10_000).toFixed(2)
  );

  const riskBands = canopyPoints.filter(
    (point) => point.canopyCover < 0.5 || point.canopyHeight < 10
  );

  const polygon = useMemo(() => {
    const latDelta = metersToLatDegrees(radiusMeters);
    const lngDelta = metersToLngDegrees(radiusMeters, center[0]);
    return [
      [center[0] + latDelta, center[1] - lngDelta],
      [center[0] + latDelta, center[1] + lngDelta],
      [center[0] - latDelta, center[1] + lngDelta],
      [center[0] - latDelta, center[1] - lngDelta],
    ] as [number, number][];
  }, [center, radiusMeters]);

  const geeTileUrl = useMemo(() => {
    if (manualTile) return manualTile;
    if (dataset === "custom" && customMapId && customToken) {
      const normalized = customMapId.startsWith("projects/")
        ? customMapId
        : `projects/earthengine-legacy/maps/${customMapId}`;
      return `https://earthengine.googleapis.com/v1alpha/${normalized}/tiles/{z}/{x}/{y}?token=${customToken}`;
    }

    return tileTemplate;
  }, [customMapId, customToken, dataset, manualTile, tileTemplate]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-blue-500 font-semibold">
              Google Earth Engine Canopy Intelligence
            </p>
            <h3 className="text-2xl font-bold text-gray-900">
              {projectName ? `Remote sensing for ${projectName}` : "Canopy Scan"}
            </h3>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">AOI Radius</div>
            <div className="text-xl font-semibold text-blue-600">
              {radiusMeters} m
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <label className="text-sm font-semibold text-gray-700 flex flex-col gap-2">
            Dataset
            <select
              value={dataset}
              onChange={(event) => setDataset(event.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {DATASETS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="text-xs text-gray-500">
              {
                DATASETS.find((option) => option.id === dataset)?.description ??
                ""
              }
            </span>
          </label>

          <label className="text-sm font-semibold text-gray-700 flex flex-col gap-2">
            Canopy Height Threshold ({heightThreshold}m)
            <input
              type="range"
              min={5}
              max={35}
              value={heightThreshold}
              onChange={(event) => setHeightThreshold(Number(event.target.value))}
              className="accent-blue-600"
            />
            <span className="text-xs text-gray-500">
              Highlights pixels taller than the threshold
            </span>
          </label>

          <label className="text-sm font-semibold text-gray-700 flex flex-col gap-2">
            Analysis Radius ({radiusMeters}m)
            <input
              type="range"
              min={250}
              max={2000}
              step={50}
              value={radiusMeters}
              onChange={(event) => setRadiusMeters(Number(event.target.value))}
              className="accent-emerald-600"
            />
            <span className="text-xs text-gray-500">
              Adjust to match project parcel or buffer
            </span>
          </label>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-sm font-semibold text-gray-700 flex flex-col gap-2">
              Manual Tile Template
              <input
                value={manualTile}
                onChange={(event) => setManualTile(event.target.value)}
                placeholder="https://earthengine.googleapis.com/v1alpha/projects/.../tiles/{z}/{x}/{y}?token=XYZ"
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-xs text-gray-500">
                Paste a full tile URL from Earth Engine apps or EE API (optional)
              </span>
            </label>
            <div className="rounded-xl border border-dashed border-gray-300 p-4 text-xs text-gray-500">
              <p className="font-semibold text-gray-700 mb-1">
                Quick Instructions
              </p>
              <ol className="list-decimal ml-4 space-y-1">
                <li>Open the Google Earth Engine Code Editor</li>
                <li>Generate a map layer and copy the Map ID & token</li>
                <li>Paste below to stream the tiles directly</li>
              </ol>
            </div>
          </div>

          <div className="rounded-xl bg-white/80 border border-gray-200 p-4 space-y-3">
            <label className="text-xs font-semibold text-gray-600 flex flex-col gap-1">
              Map ID
              <input
                value={customMapId}
                onChange={(event) => setCustomMapId(event.target.value)}
                placeholder="projects/earthengine-legacy/maps/..."
                className="rounded-lg border border-gray-200 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </label>
            <label className="text-xs font-semibold text-gray-600 flex flex-col gap-1">
              Token
              <input
                value={customToken}
                onChange={(event) => setCustomToken(event.target.value)}
                placeholder="ee-token"
                className="rounded-lg border border-gray-200 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </label>
            <button
              onClick={() => setDataset("custom")}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all"
            >
              Use Map ID & Token
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 shadow-inner overflow-hidden">
        {hasMounted ? (
          <MapContainer
            center={center}
            zoom={13}
            className="h-[420px] w-full"
            scrollWheelZoom
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {geeTileUrl && (
              <TileLayer
                url={geeTileUrl}
                opacity={0.65}
                attribution={
                  process.env.NEXT_PUBLIC_GEE_ATTRIBUTION ||
                  "Imagery © Google Earth Engine"
                }
              />
            )}
            <Polygon
              positions={polygon}
              pathOptions={{
                color: "#2563EB",
                fillColor: "#BFDBFE",
                fillOpacity: 0.2,
                weight: 2,
              }}
            />
            {canopyPoints.map((point, index) => (
              <CircleMarker
                key={`${point.lat}-${point.lng}-${index}`}
                center={[point.lat, point.lng]}
                radius={Math.max(
                  4,
                  Math.min(10, (point.canopyHeight - 5) / 2)
                )}
                pathOptions={{
                  color:
                    point.canopyHeight >= heightThreshold ? "#16A34A" : "#F97316",
                  fillColor:
                    point.canopyHeight >= heightThreshold ? "#4ADE80" : "#FDBA74",
                  fillOpacity: 0.8,
                }}
              >
                <Tooltip direction="top">
                  <div className="text-xs">
                    <div className="font-semibold">
                      Canopy: {point.canopyHeight.toFixed(1)}m
                    </div>
                    <div>Cover: {(point.canopyCover * 100).toFixed(0)}%</div>
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        ) : (
          <div className="h-[420px] w-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
            Preparing Earth Engine viewer…
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-gray-200 p-4 bg-white">
          <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
            Avg Canopy Height
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {averageHeight.toFixed(1)} m
          </p>
          <p className="text-xs text-gray-500">
            Across {filteredPoints.length || canopyPoints.length} hot pixels
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-4 bg-white">
          <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
            Effective Canopy Cover
          </p>
          <p className="text-3xl font-bold text-emerald-600">
            {(averageCover * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-gray-500">Weighted by GEDI shot density</p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-4 bg-white">
          <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
            Analysed Area
          </p>
          <p className="text-3xl font-bold text-indigo-600">{areaHectares} ha</p>
          <p className="text-xs text-gray-500">Circular AOI derived from buffer</p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-4 bg-white">
          <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
            Risk Flags
          </p>
          <p className="text-3xl font-bold text-rose-600">{riskBands.length}</p>
          <p className="text-xs text-gray-500">Segments below height/cover limits</p>
        </div>
      </div>

      {riskBands.length > 0 && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-rose-800">
              Potential Degradation Hotspots
            </h4>
            <button className="text-xs font-semibold text-rose-700 hover:text-rose-900">
              Export as GeoJSON
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {riskBands.map((point, index) => (
              <div
                key={`risk-${index}`}
                className="rounded-xl bg-white border border-rose-100 p-3 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {point.canopyHeight.toFixed(1)} m canopy
                  </p>
                  <p className="text-gray-500">
                    Cover {(point.canopyCover * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">
                    {point.lat.toFixed(5)}, {point.lng.toFixed(5)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

