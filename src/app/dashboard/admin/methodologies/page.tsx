import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AdminMethodologiesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Methodologies</h1>
      <Card>
        <CardHeader title="Carbon Estimation Models" />
        <CardBody>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Manage MRV rules</span>
            <Button size="sm">Add</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
