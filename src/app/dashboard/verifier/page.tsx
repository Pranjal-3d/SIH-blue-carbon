export default function VerifierDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Verifier Dashboard</h1>

      <div className="rounded-xl border p-4">
        <h2 className="font-medium mb-2">Verification Queue</h2>
        <ul className="text-sm space-y-2">
          <li className="flex items-center justify-between">
            <span>Sundarbans Mangrove • Evidence pending review</span>
            <div className="flex gap-2">
              <button className="h-8 rounded-md border px-3 text-sm">View</button>
              <button className="h-8 rounded-md bg-green-600 text-white px-3 text-sm">Approve</button>
              <button className="h-8 rounded-md bg-red-600 text-white px-3 text-sm">Reject</button>
            </div>
          </li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4">
          <h2 className="font-medium mb-2">Evidence Viewer</h2>
          <div className="aspect-video rounded-md bg-gray-100 mb-3" />
          <p className="text-sm text-gray-700">Side-by-side imagery and time-series charts (placeholder).</p>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="font-medium mb-2">Past Verifications</h2>
          <ul className="text-sm space-y-1">
            <li>Gulf of Mannar Seagrass • Approved • tx 0xabc…123</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


