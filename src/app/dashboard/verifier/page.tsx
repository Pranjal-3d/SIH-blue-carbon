import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function VerifierDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Verifier</h1>
        <p className="text-sm text-gray-600">Review evidence and approve projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Pending" value="2" />
        <StatCard label="Approved" value="18" />
        <StatCard label="Rejected" value="3" />
      </div>

      <Card>
        <CardHeader title="Verification Queue" subtitle="Items awaiting your review" />
        <CardBody>
          <div className="divide-y">
            <div className="py-3 flex items-center justify-between text-sm">
              <span>Sundarbans Mangrove • Evidence pending review</span>
              <div className="flex gap-2">
                <Link href="/dashboard/verifier/queue/45"><Button size="sm" variant="ghost">View</Button></Link>
                <Link href="/dashboard/verifier/queue"><Button size="sm">Approve</Button></Link>
                <Link href="/dashboard/verifier/queue"><Button size="sm" variant="secondary">Reject</Button></Link>
              </div>
            </div>
            <div className="py-3 flex items-center justify-between text-sm">
              <span>Gulf of Mannar Seagrass • Additional data uploaded</span>
              <div className="flex gap-2">
                <Link href="/dashboard/verifier/queue/46"><Button size="sm" variant="ghost">View</Button></Link>
                <Link href="/dashboard/verifier/queue"><Button size="sm">Approve</Button></Link>
                <Link href="/dashboard/verifier/queue"><Button size="sm" variant="secondary">Reject</Button></Link>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Evidence Viewer" subtitle="Imagery and time-series" />
          <CardBody>
            <div className="aspect-video rounded-md bg-gray-100" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Recent Decisions" subtitle="Your activity" />
          <CardBody>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Approved • Gulf of Mannar Seagrass • tx 0xabc…123</li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}


