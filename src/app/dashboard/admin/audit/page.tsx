import { Card, CardBody, CardHeader } from "@/components/ui/Card";

export default function AdminAuditPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Audit</h1>
      <Card>
        <CardHeader title="Recent Events" />
        <CardBody>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>tx 0xabc…111 • Owner submitted evidence</li>
            <li>tx 0xabc…222 • Verifier approved</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
