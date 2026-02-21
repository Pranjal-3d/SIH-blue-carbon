"use client";

import React, { useState, useEffect } from 'react';
import { Waves, Menu, X } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ethers } from 'ethers';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [walletError, setWalletError] = useState('');
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "About", href: "/about" },
    { label: "MRV System", href: "/mrv" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !(window as any).ethereum) return;

    const ethereum = (window as any).ethereum;

    const handleAccountsChanged = (accounts: string[]) => {
      setWalletAddress(accounts && accounts.length > 0 ? accounts[0] : '');
      if (accounts.length === 0) {
        setWalletError('Wallet disconnected');
      }
    };

    ethereum.on?.('accountsChanged', handleAccountsChanged);

    // Check if already connected
    ethereum.request({ method: 'eth_accounts' })
      .then((accounts: string[]) => {
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      })
      .catch(console.error);

    return () => {
      ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const connectWallet = async () => {
    try {
      setWalletError('');
      setIsConnectingWallet(true);

      if (typeof window === 'undefined' || !(window as any).ethereum) {
        setWalletError('MetaMask not detected. Please install MetaMask extension.');
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);

      if (!accounts || accounts.length === 0) {
        setWalletError('No accounts available. Please unlock MetaMask.');
        return;
      }

      setWalletAddress(accounts[0]);
    } catch (error: any) {
      if (error?.code === 4001) {
        setWalletError('Connection rejected by user');
      } else {
        setWalletError('Failed to connect wallet');
      }
      console.error('Wallet connect error:', error);
    } finally {
      setIsConnectingWallet(false);
    }
  };

  const handleMobileNavClick = () => {
    setIsMenuOpen(false);
  };

  const isActivePage = (href: string) => {
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
              {walletAddress ? (
                <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 text-sm font-medium">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  disabled={isConnectingWallet}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition disabled:opacity-60"
                >
                  {isConnectingWallet ? 'Connecting...' : 'Connect Wallet'}
                </button>
              )}
              <Link 
                href="/auth"
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                href="/register-project"
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
              {/* Navigation Links */}
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

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-2">
                {/* Wallet Connection */}
                {walletAddress ? (
                  <div className="px-3 py-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-md">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      connectWallet();
                      handleMobileNavClick();
                    }}
                    disabled={isConnectingWallet}
                    className="px-3 py-2 text-left rounded-md bg-gray-900 text-white text-sm font-medium disabled:opacity-60"
                  >
                    {isConnectingWallet ? 'Connecting...' : 'Connect Wallet'}
                  </button>
                )}
                
                {/* Login Link */}
                <Link 
                  href="/auth"
                  onClick={handleMobileNavClick}
                  className="px-3 py-2 text-blue-600 text-left hover:bg-blue-50 rounded-md transition-colors"
                >
                  Login
                </Link>
                
                {/* Register Project Link */}
                <Link
                  href="/register-project"
                  onClick={handleMobileNavClick}
                  className="px-3 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg text-center hover:shadow-lg transition-all"
                >
                  Register Project
                </Link>
              </div>

              {/* Error Message */}
              {walletError && (
                <div className="pt-2">
                  <p className="text-sm text-red-600 px-3">{walletError}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}