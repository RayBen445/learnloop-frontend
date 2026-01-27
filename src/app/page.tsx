import { Suspense } from 'react';
import { getHomeFeed } from './lib/api';
import PostCard from './components/PostCard';
import Pagination from './components/Pagination';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);

  let feed;
  let error;

  try {
    feed = await getHomeFeed(page);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load feed';
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-900 mb-2">Error Loading Feed</h2>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!feed || feed.posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Home Feed</h1>
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-600">No posts found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Home Feed</h1>
        
        <div className="space-y-4">
          {feed.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <Pagination 
            currentPage={feed.page} 
            totalPages={feed.total_pages}
          />
        </Suspense>
      </div>
    </div>
  );
}
