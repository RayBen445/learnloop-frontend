'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { verifyEmail } from '../lib/api';

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
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
        setStatus('error');
        setMessage(error.message || 'Verification failed. The link may be expired or invalid.');
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 shadow-xl text-center">
          {/* Status icon */}
          <div className="mb-6 flex justify-center">
            {status === 'verifying' && (
              <div className="w-16 h-16 rounded-full bg-dark-surface-elevated flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-accent-indigo border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {status === 'success' && (
              <div className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            
            {status === 'error' && (
              <div className="w-16 h-16 rounded-full bg-red-900 bg-opacity-30 flex items-center justify-center border border-red-500">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
          </div>

          {/* Status heading */}
          <h1 className={`text-2xl font-bold mb-3 ${
            status === 'verifying' ? 'text-luxury-white' :
            status === 'success' ? 'text-gradient-secondary' :
            'text-red-400'
          }`}>
            {status === 'verifying' && 'Verifying your email...'}
            {status === 'success' && 'Email Verified!'}
            {status === 'error' && 'Verification Failed'}
          </h1>
          
          {/* Message */}
          <p className="text-base text-luxury-gray-400 mb-8">
            {message || 'Please wait while we verify your email address...'}
          </p>

          {/* Action buttons */}
          {status === 'success' && (
            <Link
              href="/login"
              className="inline-block w-full py-3 px-4 bg-gradient-secondary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Continue to Login
            </Link>
          )}

          {status === 'error' && (
            <div className="space-y-3">
              <Link
                href="/register"
                className="block w-full py-3 px-4 bg-gradient-secondary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
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
          )}
        </div>
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
