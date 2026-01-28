'use client';

import { useState, useEffect } from 'react';
import { resendVerificationEmail } from '../lib/api';
import { motion, AnimatePresence } from 'framer-motion';

interface ResendVerificationButtonProps {
  email?: string;
}

export default function ResendVerificationButton({ email }: ResendVerificationButtonProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (success) {
      // Reset success state after 5 seconds
      timeoutId = setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
    
    // Cleanup timeout on unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [success]);

  const handleResend = async () => {
    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      await resendVerificationEmail(email);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend verification email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleResend}
        disabled={loading || success}
        className="w-full py-3 px-4 bg-gradient-secondary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : success ? 'Email Sent!' : 'Resend Verification Email'}
      </button>

      <AnimatePresence mode="wait">
        {success && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="flex items-center gap-2 p-3 bg-emerald-950 bg-opacity-20 border border-emerald-500 rounded-lg"
          >
            {/* Animated check icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1
              }}
            >
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />
              </svg>
            </motion.div>
            <p className="text-sm text-emerald-400">
              Verification email sent! Check your inbox{email ? ` at ${email}` : ''}.
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div
            role="alert"
            aria-live="assertive"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="border-l-4 border-red-500 bg-red-950 bg-opacity-20 pl-4 py-3 rounded"
          >
            <p className="text-sm text-red-400">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
