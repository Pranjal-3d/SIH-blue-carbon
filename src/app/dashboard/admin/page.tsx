export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4">
          <h2 className="font-medium mb-2">User Management</h2>
          <ul className="text-sm space-y-1">
            <li>Approve NGO registrations • 3 pending</li>
            <li>Onboard verifiers • 1 pending</li>
          </ul>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="font-medium mb-2">System Overview</h2>
          <ul className="text-sm space-y-1">
            <li>Total credits: 128,450</li>
            <li>Total projects: 63</li>
            <li>Marketplace revenue: ₹ 1.8Cr</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4">
          <h2 className="font-medium mb-2">Methodology Management</h2>
          <p className="text-sm text-gray-700">Add/update carbon estimation models or MRV rules.</p>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="font-medium mb-2">Audit Logs</h2>
          <ul className="text-sm space-y-1">
            <li>tx 0xabc…111 • Owner submitted evidence</li>
            <li>tx 0xabc…222 • Verifier approved</li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="font-medium mb-2">Governance / DAO</h2>
        <p className="text-sm text-gray-700">Voting interface placeholder.</p>
      </div>
    </div>
  );
}


