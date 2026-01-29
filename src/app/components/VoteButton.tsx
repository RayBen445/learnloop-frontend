'use client';

import { useState, useEffect, memo } from 'react';
import { createVote, deleteVote, getPostVotes, getCommentVotes } from '../lib/api';

interface VoteButtonProps {
  targetType: 'post' | 'comment';
  targetId: number;
  initialVoteCount?: number;
}

function VoteButton({ targetType, targetId, initialVoteCount = 0 }: VoteButtonProps) {
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  const [userVoteId, setUserVoteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch vote status on mount
    const fetchVoteStatus = async () => {
      try {
        const voteStatus = targetType === 'post' 
          ? await getPostVotes(targetId)
          : await getCommentVotes(targetId);
        
        setVoteCount(voteStatus.vote_count);
        setUserVoteId(voteStatus.user_vote_id || null);
      } catch (error) {
        // Silently fail if not authenticated or error occurs
        setVoteCount(initialVoteCount);
      }
    };

    fetchVoteStatus();
  }, [targetType, targetId, initialVoteCount]);

  const handleVote = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (userVoteId) {
        // Remove vote
        await deleteVote(userVoteId);
        setUserVoteId(null);
        setVoteCount(prev => prev - 1);
      } else {
        // Add vote
        const vote = await createVote({
          target_type: targetType,
          target_id: targetId,
        });
        setUserVoteId(vote.id);
        setVoteCount(prev => prev + 1);
      }
    } catch (error) {
      // Silently handle errors (user not logged in, etc.)
      console.error('Vote error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={loading}
      className={`flex items-center gap-1 text-xs ${
        userVoteId 
          ? 'text-blue-700' 
          : 'text-gray-600 hover:text-blue-700'
      } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
    >
      <svg 
        className="w-3 h-3" 
        fill={userVoteId ? "currentColor" : "none"} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
      <span>{voteCount}</span>
    </button>
  );
}

export default memo(VoteButton);
