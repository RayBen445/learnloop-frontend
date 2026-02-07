import { Suspense } from 'react';
import { getHomeFeed } from '../lib/api';
import HomeContent from './HomeContent';
import HomeAuthGuard from './HomeAuthGuard';
import LoadingState from '../../components/LoadingState';

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

// Force dynamic rendering since we rely on searchParams
export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }: HomePageProps) {
  // Await searchParams before accessing properties
  const { page } = await searchParams;
  const pageNum = parseInt(page || '1', 10);

  let feed = null;
  let error: string | undefined = undefined;

  try {
    // Fetch data on the server
    feed = await getHomeFeed(pageNum);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load home feed';
  }

  return (
    <HomeAuthGuard>
      <Suspense fallback={
        <div className="min-h-screen bg-dark-bg flex items-center justify-center">
          <LoadingState size="lg" />
        </div>
      }>
        <HomeContent initialFeed={feed} error={error} />
      </Suspense>
    </HomeAuthGuard>
  );
}
