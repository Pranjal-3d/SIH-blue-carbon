export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-gradient-to-br from-blue-50 to-emerald-50 p-5">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-3xl font-semibold">{value}</div>
    </div>
  );
}


