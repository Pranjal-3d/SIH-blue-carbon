"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ClientMap = dynamic(() => import("@/components/Map").then(m => m.Map), { ssr: false });

export default function AddProjectWizard() {
  const [step, setStep] = useState(1);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add New Project</h1>

      <div className="flex items-center gap-2 text-sm">
        <span className={`rounded-full h-7 w-7 inline-flex items-center justify-center border ${step === 1 ? "bg-blue-600 text-white border-blue-600" : ""}`}>1</span>
        <span>Draw Geo-boundary</span>
        <span className="text-gray-400">→</span>
        <span className={`rounded-full h-7 w-7 inline-flex items-center justify-center border ${step === 2 ? "bg-blue-600 text-white border-blue-600" : ""}`}>2</span>
        <span>Upload Plan</span>
        <span className="text-gray-400">→</span>
        <span className={`rounded-full h-7 w-7 inline-flex items-center justify-center border ${step === 3 ? "bg-blue-600 text-white border-blue-600" : ""}`}>3</span>
        <span>Submit</span>
      </div>

      {step === 1 && (
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-medium">Step 1: Draw Geo-boundary</h2>
          <ClientMap points={[{ id: "center", name: "India", lat: 20.5937, lng: 78.9629 }]} />
          <p className="text-sm text-gray-600">Geo-draw tools coming soon. For now, the map is view-only.</p>
          <div className="flex justify-end">
            <button onClick={() => setStep(2)} className="h-9 rounded-md bg-blue-600 text-white px-4">Continue</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-medium">Step 2: Upload Restoration Plan</h2>
          <input type="text" placeholder="Project name" className="h-10 w-full rounded-md border px-3" />
          <textarea placeholder="Description" className="min-h-28 w-full rounded-md border px-3 py-2" />
          <div className="grid md:grid-cols-2 gap-3">
            <input type="file" className="h-10 rounded-md border px-3" />
            <select className="h-10 rounded-md border px-2">
              <option>Choose ecosystem</option>
              <option>Mangrove</option>
              <option>Seagrass</option>
              <option>Saltmarsh</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="h-9 rounded-md border px-4">Back</button>
            <button onClick={() => setStep(3)} className="h-9 rounded-md bg-blue-600 text-white px-4">Continue</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-medium">Step 3: Submit</h2>
          <p className="text-sm text-gray-700">Review details and submit for verification. A demo on-chain placeholder tx will be shown.</p>
          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="h-9 rounded-md border px-4">Back</button>
            <button className="h-9 rounded-md bg-green-600 text-white px-4">Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}


