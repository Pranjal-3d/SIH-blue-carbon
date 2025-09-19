import { Card, CardBody, CardHeader } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">About</h1>
      <Card>
        <CardHeader title="Our Mission" />
        <CardBody>
          <p className="text-sm text-gray-700">Transparent, verifiable, and decentralized blue carbon restoration.</p>
        </CardBody>
      </Card>
    </div>
  );
}
