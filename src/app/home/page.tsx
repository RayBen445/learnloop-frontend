'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getHomeFeed } from '../lib/api';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import HomeActions from './HomeActions';
import HomeAuthGuard from './HomeAuthGuard';
import LoadingState from '../../components/LoadingState';

interface Feed {
  posts: any[];
  page: number;
  total_pages: number;
}

function HomePageContent() {
  const searchParams = useSearchParams();
  const [feed, setFeed] = useState<Feed | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    loadFeed(page);
  }, [searchParams]);

  const loadFeed = async (page: number) => {
    setLoading(true);
    try {
      const feedData = await getHomeFeed(page);
      setFeed(feedData);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load home feed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Home Actions: Create Post and Search */}
        <HomeActions />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-16">
            <LoadingState size="lg" />
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="border-l-4 border-red-500 bg-red-950 bg-opacity-20 pl-4 py-3 mb-8 rounded">
            <p className="text-sm font-medium text-red-400 mb-1">Unable to load feed</p>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Latest Posts Section */}
        {!loading && !error && (
          <section>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-luxury-white mb-3">Latest Posts</h2>
              <div className="border-t border-dark-border"></div>
            </div>

            {/* Empty State */}
            {feed && feed.posts.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-base text-luxury-gray-500 mb-4">
                  No posts have been shared yet. Be the first to contribute!
                </p>
              </div>
            )}

            {/* Feed */}
            {feed && feed.posts.length > 0 && (
              <>
                <div className="space-y-6">
                  {feed.posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination 
                  currentPage={feed.page} 
                  totalPages={feed.total_pages}
                  basePath="/home"
                />
              </>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <HomeAuthGuard>
      <Suspense fallback={
        <div className="min-h-screen bg-dark-bg flex items-center justify-center">
          <LoadingState size="lg" />
        </div>
      }>
        <HomePageContent />
      </Suspense>
    </HomeAuthGuard>
  );
}
