import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function OwnerDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Project Owner</h1>
        <p className="text-sm text-gray-600">Create projects, upload evidence, track credits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Projects" value="2" />
        <StatCard label="Credits Minted" value="12,000" />
        <StatCard label="Pending" value="3,400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="My Projects" subtitle="Status overview" />
          <CardBody>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Sundarbans Mangrove • <span className="text-amber-700 font-medium">Pending verification</span></li>
              <li>Gulf of Mannar Seagrass • <span className="text-green-700 font-medium">Approved</span></li>
            </ul>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Impact Reports" subtitle="Before/after maps and certificates" />
          <CardBody>
            <div className="text-sm text-gray-700">Download certificates and maps</div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Add New Project" subtitle="Start the submission wizard" />
        <CardBody>
          <Link href="/dashboard/owner/add-project">
            <Button>Open Wizard</Button>
          </Link>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Upload Evidence" subtitle="Forms and media" />
        <CardBody>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/owner/evidence/field-form"><Button variant="secondary">Field Data Form</Button></Link>
            <Link href="/dashboard/owner/evidence/photos"><Button variant="secondary">Upload Photos</Button></Link>
            <Link href="/dashboard/owner/evidence/drone"><Button variant="secondary">Upload Drone Imagery</Button></Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}


