import type { Project, CreditBatch } from "./types";

export const mockProjects: Project[] = [
  { id: "p-001", name: "Mangrove Restoration - Sundarbans", location: "WB, India", type: "Mangrove", verifier: "EcoVerify", creditsAvailable: 12000, hectares: 320 },
  { id: "p-002", name: "Seagrass Revival - Gulf of Mannar", location: "TN, India", type: "Seagrass", verifier: "BlueAudit", creditsAvailable: 5400, hectares: 140 },
  { id: "p-003", name: "Saltmarsh Rehab - Kutch", location: "GJ, India", type: "Saltmarsh", verifier: "EcoVerify", creditsAvailable: 7800, hectares: 210 },
];

export const mockBatches: CreditBatch[] = [
  { id: "b-2024-01", projectId: "p-001", priceUsd: 11.2, available: 3200 },
  { id: "b-2024-07", projectId: "p-002", priceUsd: 9.8, available: 1500 },
  { id: "b-2025-02", projectId: "p-003", priceUsd: 12.5, available: 5200 },
];


