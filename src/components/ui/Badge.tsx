import clsx from "classnames";

export function Badge({ children, color = "blue" as "blue" | "emerald" | "amber", className = "" }: { children: React.ReactNode; color?: "blue" | "emerald" | "amber"; className?: string }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
  } as const;
  return <span className={clsx("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs", colors[color], className)}>{children}</span>;
}


