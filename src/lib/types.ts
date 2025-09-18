export type EcosystemType = "Mangrove" | "Seagrass" | "Saltmarsh";

export type Project = {
  id: string;
  name: string;
  location: string;
  type: EcosystemType;
  verifier: string;
  creditsAvailable: number;
  hectares: number;
};

export type CreditBatch = {
  id: string;
  projectId: string;
  priceUsd: number;
  available: number;
};


