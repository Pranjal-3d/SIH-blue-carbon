import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="text-sm text-gray-600">Manage users, methods, and platform operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Projects" value="63" />
        <StatCard label="Pending Verifications" value="4" />
        <StatCard label="Total Credits" value="128,450" />
        <StatCard label="Revenue" value="₹ 1.8Cr" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="User Management" subtitle="Approve or revoke access" />
          <CardBody>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>NGO registrations</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">3 pending</span>
                  <Link href="/dashboard/admin/users"><Button size="sm">Open</Button></Link>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Verifier onboarding</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">1 pending</span>
                  <Link href="/dashboard/admin/users"><Button size="sm" variant="secondary">Open</Button></Link>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Methodologies" subtitle="Models and MRV rules" />
          <CardBody>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Manage carbon estimation methods</span>
              <Link href="/dashboard/admin/methodologies"><Button size="sm">Open</Button></Link>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Verification Queue" subtitle="Recent submissions" />
        <CardBody>
          <div className="divide-y">
            <div className="py-3 flex items-center justify-between text-sm">
              <span>🌱 Mangrove Restoration – Project #45</span>
              <div className="flex gap-2">
                <Link href="/dashboard/admin/queue"><Button size="sm">Approve</Button></Link>
                <Link href="/dashboard/admin/queue"><Button size="sm" variant="secondary">Reject</Button></Link>
                <Link href="/dashboard/admin/queue"><Button size="sm" variant="ghost">More Info</Button></Link>
              </div>
            </div>
            <div className="py-3 flex items-center justify-between text-sm">
              <span>🌍 Community Solar Farm – Project #46</span>
              <div className="flex gap-2">
                <Link href="/dashboard/admin/queue"><Button size="sm">Approve</Button></Link>
                <Link href="/dashboard/admin/queue"><Button size="sm" variant="secondary">Reject</Button></Link>
                <Link href="/dashboard/admin/queue"><Button size="sm" variant="ghost">More Info</Button></Link>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Audit" subtitle="Recent events" />
        <CardBody>
          <Link href="/dashboard/admin/audit" className="text-sm text-blue-700 hover:underline">Open audit log</Link>
        </CardBody>
      </Card>
    </div>
  );
}
