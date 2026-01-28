import { getUser, getUserPosts } from '@/app/lib/api';
import PostCard from '@/app/components/PostCard';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function UserProfilePage({ params, searchParams }: PageProps) {
  const { userId } = await params;
  const resolvedSearchParams = await searchParams;
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;

  try {
    const [user, postsData] = await Promise.all([
      getUser(userId),
      getUserPosts(userId, page),
    ]);

    // Format date to show "Member since Month Year"
    const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });

    return (
      <div 
        className="min-h-screen"
        style={{ 
          backgroundColor: 'var(--color-luxury-white)',
          color: 'var(--color-luxury-black)'
        }}
      >
        <div className="max-w-2xl mx-auto px-6 py-12">
          {/* User Profile Header */}
          <div className="mb-12">
            <h1 
              className="text-3xl font-medium mb-2"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              {user.username}
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-luxury-gray-600)' }}>
              Member since {memberSince}
            </p>
          </div>

          {/* Posts Section */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <h2 
                className="text-xl font-medium"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                Posts
              </h2>
              <span 
                className="ml-2 text-sm"
                style={{ color: 'var(--color-luxury-gray-500)' }}
              >
                ({postsData.total})
              </span>
            </div>
            <div 
              className="border-b mb-8"
              style={{ borderColor: 'var(--color-luxury-gray-200)' }}
            />

            {postsData.posts.length > 0 ? (
              <div className="space-y-8">
                {postsData.posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p style={{ color: 'var(--color-luxury-gray-600)' }}>
                  No posts yet.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {postsData.total_pages > 1 && (
            <div 
              className="flex items-center justify-between border-t pt-6 mt-8"
              style={{ borderColor: 'var(--color-luxury-gray-200)' }}
            >
              {page > 1 ? (
                <Link
                  href={`/users/${userId}?page=${page - 1}`}
                  className="text-sm hover:underline"
                  style={{ color: 'var(--color-luxury-black)' }}
                >
                  ← Previous
                </Link>
              ) : (
                <div />
              )}
              
              <span className="text-xs" style={{ color: 'var(--color-luxury-gray-500)' }}>
                Page {page} of {postsData.total_pages}
              </span>

              {page < postsData.total_pages ? (
                <Link
                  href={`/users/${userId}?page=${page + 1}`}
                  className="text-sm hover:underline"
                  style={{ color: 'var(--color-luxury-black)' }}
                >
                  Next →
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div 
        className="min-h-screen"
        style={{ 
          backgroundColor: 'var(--color-luxury-white)',
          color: 'var(--color-luxury-black)'
        }}
      >
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div 
            className="border-l-4 p-6"
            style={{ borderColor: 'var(--color-luxury-gray-900)' }}
          >
            <p className="font-medium mb-2">Unable to load user profile</p>
            <p className="text-sm" style={{ color: 'var(--color-luxury-gray-600)' }}>
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
          </div>
          <Link
            href="/"
            className="inline-block mt-6 text-sm hover:underline"
            style={{ color: 'var(--color-luxury-black)' }}
          >
            ← Back to feed
          </Link>
        </div>
      </div>
    );
  }
}
