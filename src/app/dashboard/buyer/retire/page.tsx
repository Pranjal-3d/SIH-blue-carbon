import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function BuyerRetirePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Retire Credits</h1>
      <Card>
        <CardHeader title="Generate Retirement Certificate" />
        <CardBody>
          <div className="flex gap-2 text-sm">
            <input placeholder="Quantity to retire" className="h-10 w-56 rounded-md border px-3" />
            <Button>Retire</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
