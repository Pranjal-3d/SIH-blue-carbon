"use client";

import React, { useState, useEffect } from 'react';
import { Waves, Menu, X } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "About", href: "/about" },
    { label: "MRV System", href: "/mrv" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = () => {
    setIsMenuOpen(false);
  };

  const isActivePage = (href) => {
    return pathname === href;
  };

  return (
    <>
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/95 backdrop-blur-md'
      } border-b border-gray-200`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                BlueCarbon
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md ${
                    isActivePage(item.href) ? 'text-blue-600 bg-blue-50' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                href="/auth"
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                href="/dashboard/Register"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Register Project
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 pt-4 pb-3 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleMobileNavClick}
                  className={`block w-full text-left px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors ${
                    isActivePage(item.href) ? 'text-blue-600 bg-blue-50' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-2">
                <Link 
                  href="/auth"
                  onClick={handleMobileNavClick}
                  className="px-3 py-2 text-blue-600 text-left hover:bg-blue-50 rounded-md transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register-project"
                  onClick={handleMobileNavClick}
                  className="px-3 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg text-center hover:shadow-lg transition-all"
                >
                  Register Project
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}