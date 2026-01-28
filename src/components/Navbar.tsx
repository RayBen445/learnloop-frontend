'use client';

import Link from 'next/link';
import LogoSymbol from './LogoSymbol';

export default function Navbar() {
  return (
    <nav 
      className="border-b" 
      style={{ 
        borderColor: 'var(--color-luxury-gray-200)', 
        backgroundColor: 'var(--color-luxury-white)' 
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3">
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 transition-opacity hover:opacity-70"
        >
          {/* Animated Logo Symbol */}
          <div style={{ color: 'var(--color-luxury-black)' }}>
            <LogoSymbol size={28} />
          </div>
          
          {/* Wordmark */}
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
      </div>
    </nav>
  );
}
