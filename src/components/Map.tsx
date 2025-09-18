"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

type MarkerPoint = { id: string; name: string; lat: number; lng: number };

const defaultIcon = new L.Icon({
	iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

export function Map({ points }: { points: MarkerPoint[] }) {
	const center = points[0] ? [points[0].lat, points[0].lng] : [20.5937, 78.9629];
	return (
		<div className="w-full h-[420px] rounded-lg overflow-hidden border">
			<MapContainer center={center as any} zoom={5} scrollWheelZoom={false} className="w-full h-full">
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{points.map((p) => (
					<Marker key={p.id} position={[p.lat, p.lng]} icon={defaultIcon}>
						<Popup>
							<div className="text-sm">
								<p className="font-medium">{p.name}</p>
								<p>
									Lat {p.lat}, Lng {p.lng}
								</p>
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
