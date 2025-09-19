"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Waves, ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const allNavItems = [
  { href: "/dashboard/owner", label: "🌱 Project Owner", desc: "Manage projects", role: "owner" },
  { href: "/dashboard/verifier", label: "✅ Verifier", desc: "Review submissions", role: "verifier" },
  { href: "/dashboard/buyer", label: "💰 Buyer", desc: "Purchase credits", role: "buyer" },
  { href: "/dashboard/admin", label: "⚙️ Admin", desc: "Platform admin", role: "admin" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = typeof window !== "undefined" ? window.localStorage.getItem("bc_role") : null;
    setRole(savedRole);
  }, []);

  useEffect(() => {
    if (!role) return;
    const roleToPath: Record<string, string> = {
      owner: "/dashboard/owner",
      verifier: "/dashboard/verifier",
      buyer: "/dashboard/buyer",
      admin: "/dashboard/admin",
    };
    const expectedPrefix = roleToPath[role];
    if (expectedPrefix && !pathname?.startsWith(expectedPrefix)) {
      router.replace(expectedPrefix);
    }
  }, [role, pathname, router]);

  const navItems = useMemo(() => {
    if (!role) return [] as typeof allNavItems;
    return allNavItems.filter((i) => i.role === role);
  }, [role]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="glass rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Waves className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">BlueCarbon</div>
                  <div className="text-sm text-gray-600">Dashboard</div>
                </div>
              </div>
              <Link
                href="/"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[var(--primary)] transition-colors mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 font-medium text-sm transition-all ${
                      isActive
                        ? "bg-[var(--eco)] text-white shadow-lg"
                        : "glass hover:bg-[var(--soft)] text-gray-700 hover:shadow-md"
                    }`}
                  >
                    <div className="font-semibold">{item.label}</div>
                    <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                      {item.desc}
                    </div>
                  </Link>
                );
              })}
              {!role && (
                <div className="text-sm text-gray-600 px-4 py-3">Select a role on the sign-in page.</div>
              )}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <section className="lg:col-span-4">
          <div className="glass rounded-2xl p-8 min-h-[600px]">
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
