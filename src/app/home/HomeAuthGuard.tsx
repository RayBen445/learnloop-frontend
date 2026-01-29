'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import LoadingState from '../../components/LoadingState';

export default function HomeAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, mounted, loading } = useAuth();

  useEffect(() => {
    // Only redirect if we're sure the user is not authenticated
    if (mounted && !loading && !user) {
      router.push('/login');
    }
  }, [mounted, loading, user, router]);

  // Show loading state while checking authentication
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <LoadingState size="lg" />
      </div>
    );
  }

  // If no user after loading, show nothing (will redirect)
  if (!user) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <LoadingState size="lg" />
      </div>
    );
  }

  // User is authenticated, show the page
  return <>{children}</>;
}
