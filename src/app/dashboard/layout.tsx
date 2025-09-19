"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Waves, ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const allNavItems = [
  { href: "/dashboard/owner", label: "🌱 Project Owner", desc: "Manage projects", role: "owner" },
  { href: "/dashboard/verifier", label: "✅ Verifier", desc: "Review submissions", role: "verifier" },
  { href: "/dashboard/buyer", label: "💰 Buyer", desc: "Purchase credits", role: "buyer" },
  { href: "/dashboard/admin", label: "⚙️ Admin", desc: "Platform admin", role: "admin" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <div className="min-h-screen flex flex-col">
          {/* Navbar */}
          <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <a
                href="/"
                className="font-semibold tracking-tight text-lg text-[var(--primary)]"
              >
                🌊 BlueCarbon Registry
              </a>
              <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
                <a href="/" className="hover:text-[var(--primary)]">
                  Home
                </a>
                <a href="/projects" className="hover:text-[var(--primary)]">
                  Projects
                </a>
                <a href="#how" className="hover:text-[var(--primary)]">
                  How It Works
                </a>
                <a href="/marketplace" className="hover:text-[var(--primary)]">
                  Marketplace
                </a>
                <a href="/auth" className="hover:text-[var(--primary)]">
                  Login
                </a>
              </nav>
              <a
                href="/auth"
                className="rounded-xl px-4 py-2 text-sm font-medium shadow-md bg-[var(--eco)] text-white hover:brightness-105"
              >
                Get Started
              </a>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                    <Waves className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900">Dashboard</span>
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

            {/* Main Content Area */}
            <main className="flex-1">{children}</main>
          </div>

          {/* Newsletter & CTA Section */}
          <section className="relative py-20 bg-gradient-to-br from-blue-800 via-green-700 to-blue-900 overflow-hidden">
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute top-1/4 left-10 w-32 h-32 opacity-10 animate-bounce"
                style={{ animationDuration: "20s" }}
              >
                <div className="w-full h-full bg-white rounded-full blur-2xl"></div>
              </div>
              <div
                className="absolute top-3/5 right-15 w-24 h-24 opacity-10 animate-pulse"
                style={{ animationDelay: "7s" }}
              >
                <div className="w-full h-full bg-green-300 rounded-full blur-2xl"></div>
              </div>
              <div
                className="absolute bottom-1/3 left-20 w-28 h-28 opacity-10 animate-spin"
                style={{ animationDuration: "30s" }}
              >
                <div className="w-full h-full bg-blue-300 rounded-full blur-2xl"></div>
              </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Newsletter */}
                <div className="text-center lg:text-left">
                  <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                    Join the Blue Carbon
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">
                      Revolution
                    </span>
                  </h2>
                  <p className="text-xl text-white/90 mb-8">
                    Get updates on new projects, carbon credit opportunities,
                    and ecosystem restoration insights delivered to your inbox.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* Right side - Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 hover:-translate-y-2 transition-all duration-300">
                    <div className="text-green-300 mb-3 flex justify-center">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      150+
                    </div>
                    <div className="text-sm text-white/80">Active Projects</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 hover:-translate-y-2 transition-all duration-300">
                    <div className="text-green-300 mb-3 flex justify-center">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      50k+
                    </div>
                    <div className="text-sm text-white/80">
                      Hectares Restored
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 hover:-translate-y-2 transition-all duration-300">
                    <div className="text-green-300 mb-3 flex justify-center">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      200k+
                    </div>
                    <div className="text-sm text-white/80">tCO₂e Credits</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 hover:-translate-y-2 transition-all duration-300">
                    <div className="text-green-300 mb-3 flex justify-center">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      100+
                    </div>
                    <div className="text-sm text-white/80">Communities</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Footer */}
          <footer className="relative bg-gray-900 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-green-900/50"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {/* Company Info */}
                <div className="lg:col-span-1">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                      <svg
                        className="h-7 w-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <span className="text-2xl font-bold gradient-text bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                      BlueCarbon
                    </span>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Revolutionizing coastal ecosystem restoration through
                    blockchain technology and transparent MRV systems for a
                    sustainable future.
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <svg
                        className="w-4 h-4 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>Mumbai, Maharashtra, India</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>contact@bluecarbon.in</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <svg
                        className="w-4 h-4 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>+91 98765 43210</span>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex space-x-3">
                    {/* Twitter */}
                    <a
                      href="#"
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a
                      href="#"
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                      </svg>
                    </a>
                    {/* GitHub */}
                    <a
                      href="#"
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Explore */}
                <div>
                  <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Platform
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="/projects"
                        className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group"
                      >
                        <svg
                          className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        Browse Projects
                      </a>
                    </li>
                    <li>
                      <a
                        href="/marketplace"
                        className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group"
                      >
                        <svg
                          className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        Carbon Marketplace
                      </a>
                    </li>
                    <li>
                      <a
                        href="/dashboard/owner"
                        className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group"
                      >
                        <svg
                          className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        Owner Dashboard
                      </a>
                    </li>
                  </ul>
                </div>

                {/* For Verifiers */}
                <div>
                  <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    For Verifiers
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="/dashboard/verifier"
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                      >
                        <svg
                          className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Verification Queue
                      </a>
                    </li>
                    <li>
                      <a
                        href="/auth"
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                      >
                        <svg
                          className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Become a verifier
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Support & Legal */}
                <div>
                  <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.657-1.79 3-4 3-.403 0-.787-.06-1.139-.171m-2.861 0C7.21 13.343 9 14.686 11 14.686c1.742 0 3.223-.835 3.772-2"
                      />
                    </svg>
                    Support & Legal
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="/support"
                        className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group"
                      >
                        <svg
                          className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM12 7v5l3 3"
                          />
                        </svg>
                        Help & Support
                      </a>
                    </li>
                    <li>
                      <a
                        href="/terms"
                        className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group"
                      >
                        <svg
                          className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 8h10M7 12h8m-8 4h6m-3 4a9 9 0 100-18 9 9 0 000 18z"
                          />
                        </svg>
                        Terms & Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        href="/privacy"
                        className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group"
                      >
                        <svg
                          className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 11c0-1.657-1.79-3-4-3s-4 1.343-4 3c0 1.306.835 2.417 2.001 2.83C6.68 15.054 8.257 16 10 16s3.32-.946 3.999-2.17A2.996 2.996 0 0016 11c0-1.657-1.79-3-4-3s-4 1.343-4 3z"
                          />
                        </svg>
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
                <p>
                  © {new Date().getFullYear()} Blue Carbon Registry. All rights
                  reserved.
                </p>
                <p className="mt-4 md:mt-0 text-gray-300">
                  Built with 🌊 blockchain for climate action 🌍
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
