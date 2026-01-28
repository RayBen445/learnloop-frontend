'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { verifyEmail } from '../lib/api';
import { motion } from 'framer-motion';
import ResendVerificationButton from '../components/ResendVerificationButton';

function VerifyContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'already_verified'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('Verification token is missing. Please check your email link.');
      return;
    }

    // Verify the email
    verifyEmail(token)
      .then((response) => {
        setStatus('success');
        setMessage(response.message || 'Your email has been verified successfully!');
      })
      .catch((error) => {
        const errorMsg = error.message || 'Verification failed. The link may be expired or invalid.';
        
        // Check if already verified
        if (errorMsg.toLowerCase().includes('already verified')) {
          setStatus('already_verified');
          setMessage('Your email is already verified. You can log in now.');
        } else {
          setStatus('error');
          setMessage(errorMsg);
        }
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-6">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-dark-bg">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.05), transparent 70%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.08), transparent 50%)'
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-md w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-dark-surface border border-dark-border rounded-2xl p-8 shadow-xl text-center backdrop-blur-sm bg-opacity-90"
        >
          {/* Status icon */}
          <div className="mb-6 flex justify-center">
            {status === 'verifying' && (
              <div className="w-16 h-16 rounded-full bg-dark-surface-elevated flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-accent-indigo border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {status === 'success' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2
                }}
                className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center"
              >
                <motion.svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                </motion.svg>
              </motion.div>
            )}
            
            {(status === 'error' || status === 'already_verified') && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={`w-16 h-16 rounded-full flex items-center justify-center border ${
                  status === 'already_verified'
                    ? 'bg-amber-900 bg-opacity-30 border-amber-500'
                    : 'bg-red-900 bg-opacity-30 border-red-500'
                }`}
              >
                <svg className={`w-8 h-8 ${status === 'already_verified' ? 'text-amber-400' : 'text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {status === 'already_verified' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  )}
                </svg>
              </motion.div>
            )}
          </div>

          {/* Status heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-2xl font-bold mb-3 ${
              status === 'verifying' ? 'text-luxury-white' :
              status === 'success' ? 'text-gradient-secondary' :
              status === 'already_verified' ? 'text-amber-400' :
              'text-red-400'
            }`}
          >
            {status === 'verifying' && 'Verifying your email...'}
            {status === 'success' && 'Email Verified!'}
            {status === 'already_verified' && 'Already Verified'}
            {status === 'error' && 'Verification Failed'}
          </motion.h1>
          
          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base text-luxury-gray-400 mb-8"
          >
            {message || 'Please wait while we verify your email address...'}
          </motion.p>

          {/* Action buttons */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/login"
                className="inline-block w-full py-3 px-4 bg-gradient-secondary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Continue to LearnLoop
              </Link>
            </motion.div>
          )}

          {status === 'already_verified' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/login"
                className="inline-block w-full py-3 px-4 bg-gradient-secondary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Continue to LearnLoop
              </Link>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <ResendVerificationButton />
              
              <div className="pt-2 space-y-3">
                <Link
                  href="/register"
                  className="block w-full py-3 px-4 bg-transparent border-2 border-dark-border hover:border-luxury-gray-600 transition-colors text-luxury-gray-300 hover:text-luxury-white rounded-lg font-semibold text-sm"
                >
                  Register Again
                </Link>
                <Link
                  href="/login"
                  className="block w-full py-3 px-4 bg-transparent border-2 border-dark-border hover:border-luxury-gray-600 transition-colors text-luxury-gray-300 hover:text-luxury-white rounded-lg font-semibold text-sm"
                >
                  Go to Login
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6">
        <div className="w-16 h-16 border-4 border-accent-indigo border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
