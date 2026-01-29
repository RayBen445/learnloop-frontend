'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LogoSymbol from './LogoSymbol';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, mounted, loading, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    router.push('/');
  };

  // Prevent hydration mismatch by not rendering auth-dependent content until mounted and loaded
  if (!mounted || loading) {
    return (
      <nav className="border-b border-dark-border bg-dark-surface">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="inline-flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="text-luxury-white">
              <LogoSymbol size={28} />
            </div>
            <span className="text-lg font-semibold tracking-tight text-luxury-white">
              LearnLoop
            </span>
          </Link>
          
          {/* Right: Empty space during hydration */}
          <div className="w-32"></div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="border-b border-dark-border bg-dark-surface backdrop-blur-sm bg-opacity-80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href={user ? "/home" : "/"} className="inline-flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="text-gradient-primary">
            <LogoSymbol size={28} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-luxury-white">
            LearnLoop
          </span>
        </Link>

        {/* Right: Navigation */}
        {user ? (
          // Logged in: Show Create, Settings, and user dropdown with Logout
          <div className="flex items-center gap-6">
            <Link
              href="/create"
              className="text-sm font-medium tracking-tight text-luxury-gray-300 hover:text-luxury-white transition-colors"
            >
              Create
            </Link>
            
            <Link
              href="/settings"
              className="text-sm font-medium tracking-tight text-luxury-gray-300 hover:text-luxury-white transition-colors"
            >
              Settings
            </Link>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`text-sm font-medium tracking-tight px-4 py-2 rounded-lg transition-all ${
                  isMenuOpen 
                    ? 'bg-dark-surface-elevated text-luxury-white' 
                    : 'text-luxury-gray-300 hover:text-luxury-white hover:bg-dark-surface-elevated'
                }`}
              >
                {user.username}
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 border border-dark-border bg-dark-surface-elevated rounded-lg shadow-xl overflow-hidden">
                  <Link
                    href={`/users/${user.id}`}
                    className="block px-4 py-3 text-sm text-luxury-gray-300 hover:text-luxury-white hover:bg-dark-surface transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  
                  <div className="border-t border-dark-border" />
                  
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-sm text-luxury-gray-300 hover:text-luxury-white hover:bg-dark-surface transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Logged out: Show Login and Register links
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium tracking-tight px-4 py-2 text-luxury-gray-300 hover:text-luxury-white transition-colors"
            >
              Login
            </Link>
            
            <Link
              href="/register"
              className="text-sm font-medium tracking-tight px-6 py-2.5 rounded-lg bg-gradient-primary hover:opacity-90 transition-opacity text-white shadow-lg"
            >
              Register
            </Link>
          </div>
        )}
        </div>
      </nav>
    </>
  );
}
