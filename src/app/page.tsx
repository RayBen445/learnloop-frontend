import { Suspense } from 'react';
import { getHomeFeed } from './lib/api';
import PostCard from './components/PostCard';
import Pagination from './components/Pagination';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

// Loading component
function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Home({ searchParams }: HomePageProps) {
  const searchParamsValue = await searchParams;
  const page = parseInt(searchParamsValue.page || '1', 10);

  let feed;
  let error;

  try {
    feed = await getHomeFeed(page);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load home feed';
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">LearnLoop</h1>
          <p className="text-lg text-gray-600">A learning-based community for students</p>
        </header>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-900 mb-2">Unable to load feed</h2>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!error && feed && feed.posts.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No posts yet</h3>
            <p className="text-gray-600">Be the first to share something with the community!</p>
          </div>
        )}

        {/* Feed */}
        {!error && feed && feed.posts.length > 0 && (
          <>
            <div className="space-y-4">
              {feed.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            <Suspense fallback={<div className="mt-8 text-center text-gray-500">Loading...</div>}>
              <Pagination 
                currentPage={feed.page} 
                totalPages={feed.total_pages}
                basePath="/"
              />
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
}
