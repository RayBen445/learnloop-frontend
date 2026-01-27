import Link from 'next/link';
import { getPost } from '../../lib/api';

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-900 mb-2">Error Loading Post</h2>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-600">Post not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back navigation */}
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:underline mb-6"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to feed
        </Link>

        {/* Post content */}
        <article className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
            <span className="font-medium">{post.author.username}</span>
            <span>•</span>
            <Link 
              href={`/topics/${post.topic.id}`}
              className="text-blue-600 hover:underline"
            >
              {post.topic.name}
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              {post.vote_count} votes
            </span>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
          </div>
        </article>

        {/* Comments section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({post.comments?.length || 0})
          </h2>

          {!post.comments || post.comments.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No comments yet</p>
          ) : (
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <div key={comment.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span className="font-medium text-gray-900">{comment.author.username}</span>
                    <span>•</span>
                    <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
