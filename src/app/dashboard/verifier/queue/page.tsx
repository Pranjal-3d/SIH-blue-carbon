import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import Link from "next/link";

export default function VerifierQueuePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Verification Queue</h1>
      <Card>
        <CardHeader title="Pending Items" />
        <CardBody>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              Sundarbans Mangrove • Evidence pending — {""}
              <Link href="/dashboard/verifier/queue/45" className="text-blue-700 hover:underline">Open</Link>
            </li>
            <li>
              Gulf of Mannar Seagrass • Additional data — {""}
              <Link href="/dashboard/verifier/queue/46" className="text-blue-700 hover:underline">Open</Link>
            </li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
