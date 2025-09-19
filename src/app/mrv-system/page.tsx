import { Card, CardBody, CardHeader } from "@/components/ui/Card";

export default function MRVSystemPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">MRV System</h1>
      <Card>
        <CardHeader title="Monitoring, Reporting & Verification" />
        <CardBody>
          <p className="text-sm text-gray-700">Multi-layered monitoring using field apps, drones, and satellites.</p>
        </CardBody>
      </Card>
    </div>
  );
}
