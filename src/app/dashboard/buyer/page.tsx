export default function BuyerDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Buyer Dashboard</h1>

      <div className="rounded-xl border p-4">
        <h2 className="font-medium mb-2">Marketplace</h2>
        <p className="text-sm text-gray-700">Browse available credit batches and buy.</p>
        <a href="/marketplace" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-white text-sm mt-3">Go to Marketplace</a>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4">
          <h2 className="font-medium mb-2">My Portfolio</h2>
          <ul className="text-sm space-y-1">
            <li>Batch b-2024-07 • 150 tCO₂e • Not retired</li>
          </ul>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="font-medium mb-2">Transactions</h2>
          <ul className="text-sm space-y-1">
            <li>Purchased 150 tCO₂e • tx 0x999…aaa</li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="font-medium mb-2">Retire Credits</h2>
        <div className="flex gap-2 text-sm">
          <input placeholder="Quantity to retire" className="h-9 w-48 rounded-md border px-3" />
          <button className="h-9 rounded-md bg-blue-600 text-white px-3">Retire & Generate Certificate</button>
        </div>
      </div>
    </div>
  );
}


