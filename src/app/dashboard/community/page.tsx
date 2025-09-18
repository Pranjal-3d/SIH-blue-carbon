export default function CommunityDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Community Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4">
          <h2 className="font-medium mb-2">My Plantation Plots</h2>
          <ul className="text-sm space-y-1">
            <li>Plot QR: CM-001 • Survival 92%</li>
            <li>Plot QR: CM-014 • Survival 85%</li>
          </ul>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="font-medium mb-2">Community Tokens</h2>
          <p className="text-sm">Balance: 420 tokens</p>
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="font-medium mb-2">Impact Tracker</h2>
        <p className="text-sm text-gray-700">Your plots sequestered 12.4 tCO₂e this year.</p>
      </div>
    </div>
  );
}


