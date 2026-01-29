'use client';

import { memo } from 'react';
import { Comment } from '../../lib/api';
import VoteButton from '../../components/VoteButton';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = memo(function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="border-l-2 border-gray-200 pl-4 py-2">
      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
        <span className="font-medium text-gray-900">{comment.author.username}</span>
        <span>·</span>
        <span>{new Date(comment.created_at).toLocaleDateString()}</span>
        <span>·</span>
        <VoteButton
          targetType="comment"
          targetId={comment.id}
          initialVoteCount={comment.vote_count || 0}
        />
      </div>
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
    </div>
  );
});

export default CommentItem;
