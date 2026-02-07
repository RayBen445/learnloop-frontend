'use client';

import FeedWithVotes from '../components/FeedWithVotes';
import Pagination from '../components/Pagination';
import HomeActions from './HomeActions';
import { FeedResponse } from '../lib/api';

interface HomeContentProps {
  initialFeed: FeedResponse | null;
  error?: string;
}

export default function HomeContent({ initialFeed, error }: HomeContentProps) {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Home Actions: Create Post and Search */}
        <HomeActions />

        {/* Error State */}
        {error && (
          <div className="border-l-4 border-red-500 bg-red-950 bg-opacity-20 pl-4 py-3 mb-8 rounded">
            <p className="text-sm font-medium text-red-400 mb-1">Unable to load feed</p>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Latest Posts Section */}
        {!error && initialFeed && (
          <section>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-luxury-white mb-3">Latest Posts</h2>
              <div className="border-t border-dark-border"></div>
            </div>

            {/* Empty State */}
            {initialFeed.posts.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-base text-luxury-gray-500 mb-4">
                  No posts have been shared yet. Be the first to contribute!
                </p>
              </div>
            )}

            {/* Feed */}
            {initialFeed.posts.length > 0 && (
              <>
                <FeedWithVotes posts={initialFeed.posts} className="space-y-6" />

                {/* Pagination */}
                <Pagination
                  currentPage={initialFeed.page}
                  totalPages={initialFeed.total_pages}
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
