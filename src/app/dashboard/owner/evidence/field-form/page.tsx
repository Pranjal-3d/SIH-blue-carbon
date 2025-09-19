import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function FieldFormPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Field Data Form</h1>
      <Card>
        <CardHeader title="Basic Information" />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <input className="h-10 rounded-md border px-3" placeholder="Project name" />
            <input className="h-10 rounded-md border px-3" placeholder="Location" />
            <input className="h-10 rounded-md border px-3" placeholder="Area (ha)" />
            <input className="h-10 rounded-md border px-3" placeholder="Plant species" />
          </div>
          <div className="mt-4">
            <Button>Submit</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
