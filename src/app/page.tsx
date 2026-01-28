import { getHomeFeed } from './lib/api';
import PostCard from './components/PostCard';
import Pagination from './components/Pagination';
import RegisterCTA from './components/RegisterCTA';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

// Loading component
function FeedSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border-b border-gray-200 pb-8">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-3 bg-gray-200 rounded w-20"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
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
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm text-gray-600">Learn, share, and grow together</p>
        </header>

        {/* Register CTA for unauthenticated users */}
        <RegisterCTA />

        {/* Error State */}
        {error && (
          <div className="border-l-4 border-red-500 pl-4 py-3 mb-8">
            <p className="text-sm font-medium text-red-900 mb-1">Unable to load feed</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Latest Posts Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-base font-semibold text-gray-900">Latest Posts</h2>
            <div className="mt-2 border-t border-gray-200"></div>
          </div>

          {/* Empty State */}
          {!error && feed && feed.posts.length === 0 && (
            <div className="py-12">
              <p className="text-sm text-gray-600 text-center mb-4">
                No posts have been shared yet.
              </p>
              <div className="border-t border-gray-200"></div>
            </div>
          )}

          {/* Feed */}
          {!error && feed && feed.posts.length > 0 && (
            <>
              <div className="space-y-8">
                {feed.posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination 
                currentPage={feed.page} 
                totalPages={feed.total_pages}
                basePath="/"
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
