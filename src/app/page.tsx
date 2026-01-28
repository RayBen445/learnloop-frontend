import { getHomeFeed } from './lib/api';
import PostCard from './components/PostCard';
import Pagination from './components/Pagination';
import Hero from './components/Hero';

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
        <div key={i} className="border-b border-dark-border pb-8">
          <div className="h-5 bg-dark-surface-elevated rounded w-3/4 mb-3"></div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-3 bg-dark-surface-elevated rounded w-20"></div>
            <div className="h-3 bg-dark-surface-elevated rounded w-16"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-dark-surface-elevated rounded w-full"></div>
            <div className="h-4 bg-dark-surface-elevated rounded w-5/6"></div>
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
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section with animated logo */}
      <Hero />

      <div className="max-w-3xl mx-auto px-6 pb-12">
        {/* Error State */}
        {error && (
          <div className="border-l-4 border-red-500 bg-red-950 bg-opacity-20 pl-4 py-3 mb-8 rounded">
            <p className="text-sm font-medium text-red-400 mb-1">Unable to load feed</p>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Latest Posts Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-luxury-white mb-3">Latest Posts</h2>
            <div className="border-t border-dark-border"></div>
          </div>

          {/* Empty State */}
          {!error && feed && feed.posts.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-base text-luxury-gray-500 mb-4">
                No posts have been shared yet. Be the first to contribute!
              </p>
            </div>
          )}

          {/* Feed */}
          {!error && feed && feed.posts.length > 0 && (
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
                basePath="/"
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
