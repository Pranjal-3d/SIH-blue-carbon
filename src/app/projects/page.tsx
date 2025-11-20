"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { mockProjects } from "@/lib/mock";
import type { EcosystemType, Project } from "@/lib/types";
import { Search, MapPin, Leaf, Filter, Building2, CircleDollarSign } from "lucide-react";

const ecosystemOptions: EcosystemType[] = ["Mangrove", "Seagrass", "Saltmarsh"];

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [ecosystem, setEcosystem] = useState<EcosystemType | "All">("All");
  const [verifier, setVerifier] = useState<string | "All">("All");

  const verifiers = useMemo(() => {
    const set = new Set(mockProjects.map((p) => p.verifier));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered: Project[] = useMemo(() => {
    return mockProjects.filter((p) => {
      const matchesQuery = query.trim().length === 0 || `${p.name} ${p.location}`.toLowerCase().includes(query.toLowerCase());
      const matchesEco = ecosystem === "All" || p.type === ecosystem;
      const matchesVerifier = verifier === "All" || p.verifier === verifier;
      return matchesQuery && matchesEco && matchesVerifier;
    });
  }, [query, ecosystem, verifier]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-sm text-gray-600">Search, filter and explore verified blue carbon projects</p>
        </div>
        <Link
          href="/register-project"
          className="inline-flex items-center h-10 px-4 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          Register a Project
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or location"
              className="w-full h-10 pl-10 pr-3 rounded-md border focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <Filter className="h-5 w-5 text-gray-400 mt-2" />
            <select
              value={ecosystem}
              onChange={(e) => setEcosystem(e.target.value as EcosystemType | "All")}
              className="h-10 w-full rounded-md border px-3 text-sm"
            >
              <option value="All">All ecosystems</option>
              {ecosystemOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={verifier}
              onChange={(e) => setVerifier(e.target.value)}
              className="h-10 w-full rounded-md border px-3 text-sm"
            >
              {verifiers.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`} className="rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="h-36 bg-gradient-to-br from-blue-50 to-emerald-50" />
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{p.name}</h3>
                <span className="inline-flex items-center rounded-md bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs">{p.type}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 gap-4">
                <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{p.location}</span>
                <span className="inline-flex items-center gap-1"><Building2 className="h-4 w-4" />{p.verifier}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="inline-flex items-center gap-1 text-sm text-gray-700"><Leaf className="h-4 w-4" />{p.hectares} ha</span>
                <span className="inline-flex items-center gap-1 text-sm text-gray-700"><CircleDollarSign className="h-4 w-4" />{p.creditsAvailable.toLocaleString()} credits</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-sm text-gray-600 py-16">No projects found. Try clearing filters.</div>
      )}
    </div>
  );
}
