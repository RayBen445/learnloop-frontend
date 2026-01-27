import Link from 'next/link';
import { getPost } from '../../lib/api';
import CommentsSection from './CommentsSection';
import VoteButton from '../../components/VoteButton';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface PostPageProps {
  params: Promise<{ postId: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = await params;

  let post;
  let error;

  try {
    post = await getPost(postId);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load post';
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Back navigation */}
        <Link 
          href="/"
          className="inline-flex items-center text-sm text-blue-700 hover:underline mb-8"
        >
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to feed
        </Link>

        {/* Error State */}
        {error && (
          <div className="border-l-4 border-red-500 pl-4 py-3 mb-8">
            <p className="text-sm font-medium text-red-900 mb-1">Unable to load post</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Not Found State */}
        {!error && !post && (
          <div className="py-12">
            <p className="text-sm text-gray-600 text-center mb-4">Post not found</p>
            <div className="border-t border-gray-200"></div>
          </div>
        )}

        {/* Post Content */}
        {!error && post && (
          <>
            <article className="mb-12">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">{post.title}</h1>
              
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-6 pb-6 border-b border-gray-200">
                <span>{post.author.username}</span>
                <span>·</span>
                <Link 
                  href={`/topics/${post.topic.id}`}
                  className="text-blue-700 hover:underline"
                >
                  {post.topic.name}
                </Link>
                <span>·</span>
                <VoteButton 
                  targetType="post" 
                  targetId={post.id} 
                  initialVoteCount={post.vote_count}
                />
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
              </div>
            </article>

            {/* Comments Section - now a client component */}
            <CommentsSection postId={parseInt(postId)} initialComments={post.comments || []} />
          </>
        )}
      </div>
    </div>
  );
}
