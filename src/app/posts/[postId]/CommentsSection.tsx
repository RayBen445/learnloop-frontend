'use client';

import { useState, FormEvent, useEffect } from 'react';
import { createComment, Comment, getCommentVotes } from '../../lib/api';
import VoteButton from '../../components/VoteButton';

interface CommentsSectionProps {
  postId: number;
  initialComments: Comment[];
}

export default function CommentsSection({ postId, initialComments }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [userVotes, setUserVotes] = useState<Record<number, number | null>>({});
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('learnloop_token');
    if (!token) return;

    if (initialComments.length === 0) return;

    const fetchVotes = async () => {
      const promises = initialComments.map(async (comment) => {
        try {
          const status = await getCommentVotes(comment.id);
          return { id: comment.id, userVoteId: status.user_vote_id || null };
        } catch (error) {
          return { id: comment.id, userVoteId: null };
        }
      });

      const results = await Promise.all(promises);
      const votesMap: Record<number, number | null> = {};
      results.forEach(result => {
        votesMap[result.id] = result.userVoteId;
      });
      setUserVotes(votesMap);
    };

    fetchVotes();
  }, [initialComments]);

  const MIN_CHARS = 20;
  const charCount = content.length;
  const isValid = charCount >= MIN_CHARS;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isValid) {
      setError(`Comment must be at least ${MIN_CHARS} characters`);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const newComment = await createComment({
        post_id: postId,
        content,
      });
      
      // Add new comment to the list
      setComments([...comments, newComment]);
      
      // Initialize vote status for new comment (user hasn't voted yet)
      setUserVotes(prev => ({ ...prev, [newComment.id]: null }));

      // Clear the textarea
      setContent('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-900">
          Comments ({comments.length})
        </h2>
        <div className="mt-2 border-t border-gray-200"></div>
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="py-8">
          <p className="text-sm text-gray-600 text-center">No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-6 mb-8">
          {comments.map((comment) => (
            <div key={comment.id} className="border-l-2 border-gray-200 pl-4 py-2">
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                <span className="font-medium text-gray-900">{comment.author.username}</span>
                <span>·</span>
                <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                <span>·</span>
                <VoteButton 
                  targetType="comment" 
                  targetId={comment.id} 
                  initialVoteCount={comment.vote_count || 0}
                  initialUserVoteId={userVotes[comment.id]}
                  disableSelfFetch={true}
                />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Comment Form */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Add a comment</h3>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <div className="border-l-4 border-red-500 pl-4 py-3 bg-red-50">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-y"
              placeholder="Write your comment..."
            />
            <div className="flex justify-between items-center mt-1">
              <p className={`text-xs ${charCount < MIN_CHARS ? 'text-gray-500' : 'text-green-600'}`}>
                {charCount}/{MIN_CHARS} characters {charCount < MIN_CHARS && `(${MIN_CHARS - charCount} more needed)`}
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="py-2 px-4 bg-blue-700 text-white text-sm font-medium rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>
    </section>
  );
}
