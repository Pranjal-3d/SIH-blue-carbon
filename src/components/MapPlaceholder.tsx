export function MapPlaceholder({ label = "Interactive map coming soon" }: { label?: string }) {
  return (
    <div className="aspect-[16/9] w-full rounded-lg border bg-gray-50 flex items-center justify-center text-gray-500">
      {label}
    </div>
  );
}


