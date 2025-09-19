import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import Link from "next/link";

export default function VerifierQueueItemPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Queue Item #{id}</h1>
        <p className="text-sm text-gray-600">Review evidence and decide</p>
      </div>
      <Card>
        <CardHeader title="Evidence" />
        <CardBody>
          <div className="aspect-video rounded-md bg-gray-100 mb-4" />
          <div className="text-sm text-gray-700">Placeholder for maps and charts</div>
        </CardBody>
      </Card>
      <Link href="/dashboard/verifier/queue" className="text-blue-700 hover:underline text-sm">Back to queue</Link>
    </div>
  );
}
