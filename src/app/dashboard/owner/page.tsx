export default function OwnerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Project Owner Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold mb-4 text-gray-900">My Projects</h2>
            <ul className="text-gray-700 space-y-2">
              <li>
                Sundarbans Mangrove • <span className="text-amber-700 font-semibold">Pending verification</span>
              </li>
              <li>
                Gulf of Mannar Seagrass • <span className="text-green-700 font-semibold">Approved</span>
              </li>
            </ul>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold mb-4 text-gray-900">Carbon Credits</h2>
            <p className="text-gray-700">Minted: 12,000 • Pending: 3,400</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="font-semibold mb-4 text-gray-900">Add New Project</h2>
          <ol className="text-gray-700 grid md:grid-cols-3 gap-4 text-sm">
            <li className="rounded-md border border-gray-300 p-4">Draw geo-boundary on map</li>
            <li className="rounded-md border border-gray-300 p-4">Upload restoration plan</li>
            <li className="rounded-md border border-gray-300 p-4">Submit for verification</li>
          </ol>
          <a
            href="/dashboard/owner/add-project"
            className="inline-flex items-center mt-6 rounded-xl bg-[var(--eco)] px-6 py-3 text-white font-semibold hover:brightness-110 transition"
          >
            Open Wizard
          </a>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="font-semibold mb-4 text-gray-900">Upload Evidence</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <button className="btn-outline rounded-xl py-3">Field Data Form</button>
            <button className="btn-outline rounded-xl py-3">Upload Photos</button>
            <button className="btn-outline rounded-xl py-3">Upload Drone Imagery</button>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="font-semibold mb-4 text-gray-900">Impact Reports</h2>
          <p className="text-gray-700">Download certificates and see before/after maps.</p>
        </div>
      </div>
    </div>
  );
}


