'use client';

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { resendVerificationEmail } from '../lib/api';

export default function VerificationBanner() {
  const { user, mounted } = useAuth();
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState('');

  // Don't show if not mounted, no user, or user is verified
  if (!mounted || !user || user.email_verified) {
    return null;
  }

  const handleResend = async () => {
    setResending(true);
    setError('');
    setResent(false);

    try {
      await resendVerificationEmail();
      setResent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend verification email');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-900 to-orange-900 border-b border-orange-700">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Warning icon */}
          <svg className="w-5 h-5 text-amber-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          
          <div>
            <p className="text-sm font-medium text-white">
              Please verify your email address
            </p>
            <p className="text-xs text-amber-200">
              Check your inbox for a verification link to unlock all features.
            </p>
          </div>
        </div>

        {/* Resend button */}
        <button
          onClick={handleResend}
          disabled={resending || resent}
          className="text-xs font-semibold px-4 py-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {resending ? 'Sending...' : resent ? 'Email Sent!' : 'Resend Email'}
        </button>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="max-w-6xl mx-auto px-6 pb-3">
          <p className="text-xs text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
}
