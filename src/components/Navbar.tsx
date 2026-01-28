'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LogoSymbol from './LogoSymbol';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, mounted } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout } = useAuth();

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

  // Prevent hydration mismatch by not rendering auth-dependent content until mounted
  if (!mounted) {
    return (
      <nav 
        className="border-b" 
        style={{ 
          borderColor: 'var(--color-luxury-gray-200)', 
          backgroundColor: 'var(--color-luxury-white)' 
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Left: Logo */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 transition-opacity hover:opacity-70"
          >
            <div style={{ color: 'var(--color-luxury-black)' }}>
              <LogoSymbol size={28} />
            </div>
            
            <span 
              className="text-lg font-medium tracking-tight"
              style={{ 
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-luxury-black)' 
              }}
            >
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
    <nav 
      className="border-b" 
      style={{ 
        borderColor: 'var(--color-luxury-gray-200)', 
        backgroundColor: 'var(--color-luxury-white)' 
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 transition-opacity hover:opacity-70"
        >
          <div style={{ color: 'var(--color-luxury-black)' }}>
            <LogoSymbol size={28} />
          </div>
          
          <span 
            className="text-lg font-medium tracking-tight"
            style={{ 
              fontFamily: 'var(--font-primary)',
              color: 'var(--color-luxury-black)' 
            }}
          >
            LearnLoop
          </span>
        </Link>

        {/* Right: Navigation */}
        {user ? (
          // Logged in: Show Create, Settings, and user dropdown with Logout
          <div className="flex items-center gap-6">
            <Link
              href="/create"
              className="text-sm font-medium tracking-tight transition-opacity hover:opacity-70"
              style={{ 
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-luxury-black)'
              }}
            >
              Create
            </Link>
            
            <Link
              href="/settings"
              className="text-sm font-medium tracking-tight transition-opacity hover:opacity-70"
              style={{ 
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-luxury-black)'
              }}
            >
              Settings
            </Link>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-sm font-medium tracking-tight px-3 py-2 rounded transition-opacity hover:opacity-70"
                style={{ 
                  fontFamily: 'var(--font-primary)',
                  color: 'var(--color-luxury-black)',
                  backgroundColor: isMenuOpen ? 'var(--color-luxury-gray-100)' : 'transparent'
                }}
              >
                {user.username}
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div 
                  className="absolute right-0 mt-1 w-48 border rounded"
                  style={{
                    backgroundColor: 'var(--color-luxury-white)',
                    borderColor: 'var(--color-luxury-gray-200)'
                  }}
                >
                  <Link
                    href={`/users/${user.id}`}
                    className="block px-4 py-2 text-sm transition-opacity hover:opacity-70"
                    style={{ 
                      fontFamily: 'var(--font-primary)',
                      color: 'var(--color-luxury-black)',
                      backgroundColor: 'transparent'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  
                  <div 
                    className="border-t" 
                    style={{ borderColor: 'var(--color-luxury-gray-200)' }}
                  />
                  
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm transition-opacity hover:opacity-70"
                    style={{ 
                      fontFamily: 'var(--font-primary)',
                      color: 'var(--color-luxury-black)',
                      backgroundColor: 'transparent'
                    }}
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
              className="text-sm font-medium tracking-tight px-3 py-2 transition-opacity hover:opacity-70"
              style={{ 
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-luxury-black)'
              }}
            >
              Login
            </Link>
            
            <Link
              href="/register"
              className="text-sm font-medium tracking-tight px-4 py-2 rounded transition-opacity hover:opacity-70"
              style={{ 
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-luxury-white)',
                backgroundColor: 'var(--color-luxury-black)'
              }}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
