import { getHomeFeed, FeedResponse } from '../lib/api';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import HomeActions from './HomeActions';
import HomeAuthGuard from './HomeAuthGuard';

export default async function HomePage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1;

  let feed: FeedResponse | null = null;
  let error = '';

  try {
    feed = await getHomeFeed(page);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load home feed';
  }

  return (
    <HomeAuthGuard>
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
          {!error && (
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
    </HomeAuthGuard>
  );
}
