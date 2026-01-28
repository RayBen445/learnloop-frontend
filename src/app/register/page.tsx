'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '../lib/api';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await register({ username, email, password });
      // Update auth context with the token
      await authLogin(response.access_token);
      // Redirect to home on success
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

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
