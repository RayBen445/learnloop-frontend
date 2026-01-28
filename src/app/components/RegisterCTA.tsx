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
    <div className="relative border border-dark-border bg-dark-surface-elevated rounded-2xl p-12 mb-12 text-center overflow-hidden">
      {/* Gradient background accent */}
      <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-3 text-gradient-primary">
          Join LearnLoop Today
        </h2>
        <p className="text-base text-luxury-gray-400 mb-8 max-w-2xl mx-auto">
          Create an account to share your knowledge, engage with the community, and grow your learning journey.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/register"
            className="px-8 py-3.5 text-sm font-semibold rounded-lg bg-gradient-primary hover:opacity-90 transition-opacity text-white shadow-xl"
          >
            Create Account
          </Link>
          <Link
            href="/login"
            className="px-8 py-3.5 text-sm font-semibold rounded-lg bg-transparent border-2 border-dark-border hover:border-luxury-gray-600 transition-colors text-luxury-gray-300 hover:text-luxury-white"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
