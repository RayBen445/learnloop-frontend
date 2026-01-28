'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '../lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({ username, email, password });
      // Show confirmation screen instead of auto-login
      setRegisteredEmail(email);
      setShowConfirmation(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Confirmation screen after successful registration
  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 shadow-xl text-center">
            {/* Success icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-3 text-gradient-secondary">
              Check your email
            </h1>
            
            <p className="text-base text-luxury-gray-400 mb-6">
              We've sent a verification link to <span className="text-luxury-white font-medium">{registeredEmail}</span>
            </p>

            <p className="text-sm text-luxury-gray-500 mb-8">
              Click the link in the email to verify your account and start learning with LearnLoop.
            </p>

            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full py-3 px-4 bg-gradient-secondary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Go to Login
              </Link>
              
              <p className="text-xs text-luxury-gray-500">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  className="text-accent-teal hover:text-accent-emerald transition-colors"
                  onClick={() => setShowConfirmation(false)}
                >
                  try again
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Header with gradient */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-3 text-gradient-secondary">Create an account</h1>
          <p className="text-base text-luxury-gray-400">Join LearnLoop to share and learn</p>
        </div>

        {/* Form card */}
        <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="border-l-4 border-red-500 bg-red-950 bg-opacity-20 pl-4 py-3 rounded">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-luxury-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-dark-surface-elevated border border-dark-border rounded-lg text-sm text-luxury-white placeholder-luxury-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-emerald focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-luxury-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-dark-surface-elevated border border-dark-border rounded-lg text-sm text-luxury-white placeholder-luxury-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-emerald focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-luxury-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-dark-surface-elevated border border-dark-border rounded-lg text-sm text-luxury-white placeholder-luxury-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-emerald focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-secondary text-white text-sm font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent-emerald focus:ring-offset-2 focus:ring-offset-dark-surface disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-lg"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-luxury-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-accent-emerald hover:text-accent-teal transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
