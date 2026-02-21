// app/layout.tsx
'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Login", href: "/auth" },
  ];

  const isActivePage = (href: string) => {
    if (href.startsWith('#')) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <div className="min-h-screen flex flex-col">
          {/* Navbar - fixed, high z-index above map (Leaflet uses ~400), always visible */}
          <header className="fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
              
              {/* Logo */}
              <Link
                href="/"
                className="font-bold tracking-tight text-lg flex items-center space-x-2 group text-gray-800 hover:text-blue-600 transition-colors"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">🌊</span>
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  BlueCarbon Registry
                </span>
              </Link>

              {/* Desktop Navigation - always dark text for visibility */}
              <nav className="hidden md:flex items-center gap-2 text-sm">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                      isActivePage(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* CTA Button */}
              <Link
                href="/auth"
                className="hidden md:block relative px-6 py-2.5 text-sm font-semibold rounded-xl overflow-hidden group bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-lg transition-shadow"
              >
                Get Started
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-lg">
                <div className="px-4 pt-4 pb-3 space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block w-full text-black text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                        isActivePage(item.href)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-black hover:bg-gray-100 hover:text-blue-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200">
                    <Link
                      href="/auth"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white text-center rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </header>

          {/* Main Content */}
          <main className="flex-1 pt-14 min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}