
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
          {/* Glassy Transparent Navbar */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-green-500/10"></div>
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              {/* Logo */}
              <a
                href="/"
                className="font-bold tracking-tight text-lg text-white hover:text-blue-200 transition-all duration-300 flex items-center space-x-2 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">🌊</span>
                <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  BlueCarbon Registry
                </span>
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8 text-sm">
                <a 
                  href="/" 
                  className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                >
                  Home
                </a>
                <a 
                  href="/projects" 
                  className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                >
                  Projects
                </a>
                <a 
                  href="#how" 
                  className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                >
                  How It Works
                </a>
                <a 
                  href="/marketplace" 
                  className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                >
                  Marketplace
                </a>
                <a 
                  href="/auth" 
                  className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                >
                  Login
                </a>
              </nav>

              {/* CTA Button */}
              <a
                href="/auth"
                className="relative px-6 py-2.5 text-sm font-semibold rounded-xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm group-hover:bg-white/10 transition-colors"></div>
                <span className="relative text-white drop-shadow-sm">Get Started</span>
              </a>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </header>

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer
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
          </footer> */}
        </div>
      </body>
    </html>
  );
}
