export default function ProjectsPage() {
  const projects = [
    { id: "p-001", name: "Mangrove Restoration - Sundarbans", location: "WB, India", verifier: "EcoVerify", credits: 12000, type: "Mangrove" },
    { id: "p-002", name: "Seagrass Revival - Gulf of Mannar", location: "TN, India", verifier: "BlueAudit", credits: 5400, type: "Seagrass" },
    { id: "p-003", name: "Saltmarsh Rehab - Kutch", location: "GJ, India", verifier: "EcoVerify", credits: 7800, type: "Saltmarsh" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-gray-200">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Project Explorer</h1>
        <p className="text-gray-600 text-sm">Browse and filter blue carbon projects.</p>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
        <input placeholder="Search by name or location" className="h-10 w-full rounded-md border border-white/10 bg-transparent px-3 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none" />
        <select className="h-10 rounded-md border border-white/10 bg-transparent px-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none">
          <option>All ecosystems</option>
          <option>Mangrove</option>
          <option>Seagrass</option>
          <option>Saltmarsh</option>
        </select>
        <select className="h-10 rounded-md border border-white/10 bg-transparent px-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none">
          <option>All verifiers</option>
          <option>EcoVerify</option>
          <option>BlueAudit</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <a key={p.id} href={`/projects/${p.id}`} className="group rounded-xl overflow-hidden card-dark ring-1 ring-transparent hover:ring-emerald-500/30 transition-all">
            <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900" />
            <div className="p-4">
              <h3 className="font-medium mb-1 text-white group-hover:text-emerald-400">{p.name}</h3>
              <p className="text-sm text-gray-400">{p.location} • {p.type}</p>
              <div className="mt-3 text-sm flex items-center justify-between">
                <span className="text-gray-300">Verifier: {p.verifier}</span>
                <span className="font-medium text-gray-200">{p.credits.toLocaleString()} credits</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}


