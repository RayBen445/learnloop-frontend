'use client';

import { useAuth } from '../../contexts/AuthContext';
import LogoMark from '../../../components/LogoMark';
import Link from 'next/link';

export default function Hero() {
  const { user, mounted } = useAuth();

  // Don't show hero to authenticated users
  if (!mounted) {
    return null;
  }

  if (user) {
    return null;
  }

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-primary opacity-5 blur-3xl"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Animated Logo */}
        <div className="mb-8 flex justify-center">
          <LogoMark size={140} animate={true} showText={false} />
        </div>

        {/* Hero heading */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="text-gradient-primary">Learn</span>
          <span className="text-luxury-white">, </span>
          <span className="text-gradient-secondary">Connect</span>
          <span className="text-luxury-white">, </span>
          <span className="text-gradient-primary">Grow</span>
        </h1>

        <p className="text-xl text-luxury-gray-400 mb-10 max-w-2xl mx-auto">
          Join a community where knowledge flows freely, connections form naturally, and learning never stops.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/register"
            className="px-8 py-4 text-base font-semibold rounded-lg bg-gradient-primary hover:opacity-90 transition-opacity text-white shadow-xl"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 text-base font-semibold rounded-lg bg-transparent border-2 border-dark-border hover:border-luxury-gray-600 transition-colors text-luxury-gray-300 hover:text-luxury-white"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
