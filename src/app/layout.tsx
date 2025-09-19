import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blue Carbon Registry",
  description: "Blockchain-based Blue Carbon Registry & MRV System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="mt-16 bg-[var(--primary)] text-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                <div>
                  <p className="font-semibold mb-2 text-white">
                    Blue Carbon Registry
                  </p>
                  <p className="text-gray-300">
                    Transparent MRV and tokenized carbon credits for India’s blue
                    ecosystems.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2 text-white">Explore</p>
                  <ul className="space-y-1">
                    <li>
                      <a className="hover:text-white" href="/projects">
                        Projects
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-white" href="/marketplace">
                        Marketplace
                      </a>
                    </li>
                    <li>
                      <a
                        className="hover:text-white"
                        href="/dashboard/owner"  
                      >
                        Owner Dashboard
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2 text-white">For Verifiers</p>
                  <ul className="space-y-1">
                    <li>
                      <a
                        className="hover:text-white"
                        href="/dashboard/verifier"
                      >
                        Verification Queue
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-white" href="/auth">
                        Become a verifier
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2 text-white">Legal</p>
                  <ul className="space-y-1">
                    <li>
                      <a className="hover:text-white" href="#">
                        Terms
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-white" href="#">
                        Privacy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
                <p>© {new Date().getFullYear()} Blue Carbon Registry</p>
                <p className="mt-2 md:mt-0">
                  Built for transparency and climate impact
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
