import { Card, CardBody, CardHeader } from "@/components/ui/Card";

export default function AdminQueuePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Verification Queue</h1>
      <Card>
        <CardHeader title="Recent Submissions" />
        <CardBody>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>Project #45 • Mangrove Restoration • Pending</li>
            <li>Project #46 • Community Solar • Pending</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
