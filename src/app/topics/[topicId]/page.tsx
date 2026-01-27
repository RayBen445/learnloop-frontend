import { getTopicFeed } from '../../lib/api';
import PostCard from '../../components/PostCard';
import Pagination from '../../components/Pagination';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface TopicPageProps {
  params: Promise<{ topicId: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function TopicPage({ params, searchParams }: TopicPageProps) {
  const { topicId } = await params;
  const searchParamsValue = await searchParams;
  const page = parseInt(searchParamsValue.page || '1', 10);

  let feed;
  let error;

  try {
    feed = await getTopicFeed(topicId, page);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load topic feed';
  }

  const topicName = feed?.posts[0]?.topic.name || `Topic ${topicId}`;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">{topicName}</h1>
          <p className="text-sm text-gray-600">Posts in this topic</p>
        </header>

        {/* Error State */}
        {error && (
          <div className="border-l-4 border-red-500 pl-4 py-3 mb-8">
            <p className="text-sm font-medium text-red-900 mb-1">Unable to load topic feed</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Topic Posts Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-base font-semibold text-gray-900">Posts</h2>
            <div className="mt-2 border-t border-gray-200"></div>
          </div>

          {/* Empty State */}
          {!error && feed && feed.posts.length === 0 && (
            <div className="py-12">
              <p className="text-sm text-gray-600 text-center mb-4">
                No posts under this topic yet.
              </p>
              <div className="border-t border-gray-200"></div>
            </div>
          )}

          {/* Posts Feed */}
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
                basePath={`/topics/${topicId}`}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
