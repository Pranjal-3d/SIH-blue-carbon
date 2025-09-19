import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function RegisterProjectPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Register Project</h1>
      <Card>
        <CardHeader title="Project Details" />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <input className="h-10 rounded-md border px-3" placeholder="Project name" />
            <input className="h-10 rounded-md border px-3" placeholder="Location" />
            <input className="h-10 rounded-md border px-3" placeholder="Area (ha)" />
            <input className="h-10 rounded-md border px-3" placeholder="Species" />
          </div>
          <div className="mt-4">
            <Button>Submit</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
