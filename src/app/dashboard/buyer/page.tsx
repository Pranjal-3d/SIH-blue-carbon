import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function BuyerDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Buyer</h1>
        <p className="text-sm text-gray-600">Purchase and retire carbon credits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Credits Owned" value="150 tCO₂e" />
        <StatCard label="Retired" value="0 tCO₂e" />
        <StatCard label="Spent" value="₹ 3.2L" />
      </div>

      <Card>
        <CardHeader title="Marketplace" subtitle="Browse and buy credit batches" />
        <CardBody>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Explore available credits</span>
            <a href="/marketplace"><Button size="sm">Open Marketplace</Button></a>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Portfolio" subtitle="Your holdings" />
          <CardBody>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Batch b-2024-07 • 150 tCO₂e • Not retired</li>
            </ul>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Transactions" subtitle="Recent activity" />
          <CardBody>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Purchased 150 tCO₂e • tx 0x999…aaa</li>
            </ul>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Retire Credits" subtitle="Generate a certificate" />
        <CardBody>
          <div className="flex gap-2 text-sm">
            <input placeholder="Quantity to retire" className="h-9 w-48 rounded-md border px-3" />
            <Link href="/dashboard/buyer/retire"><Button size="md">Retire & Generate Certificate</Button></Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}


