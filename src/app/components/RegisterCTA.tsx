'use client';

import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterCTA() {
  const { user, mounted } = useAuth();

  // Don't show anything during hydration or if user is logged in
  if (!mounted || user) {
    return null;
  }

  return (
    <div 
      className="border rounded-lg p-8 mb-12 text-center"
      style={{
        borderColor: 'var(--color-luxury-gray-200)',
        backgroundColor: 'var(--color-luxury-gray-50)'
      }}
    >
      <h2 
        className="text-xl font-semibold mb-3"
        style={{ 
          fontFamily: 'var(--font-primary)',
          color: 'var(--color-luxury-black)'
        }}
      >
        Join LearnLoop Today
      </h2>
      <p 
        className="text-sm mb-6"
        style={{ color: 'var(--color-luxury-gray-600)' }}
      >
        Create an account to share your knowledge, engage with the community, and grow your learning journey.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link
          href="/register"
          className="px-6 py-3 text-sm font-medium rounded transition-opacity hover:opacity-80"
          style={{ 
            fontFamily: 'var(--font-primary)',
            color: 'var(--color-luxury-white)',
            backgroundColor: 'var(--color-luxury-black)'
          }}
        >
          Create Account
        </Link>
        <Link
          href="/login"
          className="px-6 py-3 text-sm font-medium rounded transition-opacity hover:opacity-80"
          style={{ 
            fontFamily: 'var(--font-primary)',
            color: 'var(--color-luxury-black)',
            backgroundColor: 'transparent',
            border: '1px solid var(--color-luxury-gray-300)'
          }}
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
