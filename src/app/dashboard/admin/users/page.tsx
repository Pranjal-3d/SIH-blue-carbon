import { Card, CardBody, CardHeader } from "@/components/ui/Card";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Users</h1>
      <Card>
        <CardHeader title="Pending Approvals" />
        <CardBody>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>NGO • Green Shores Foundation</li>
            <li>Verifier • Ananya Rao</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
