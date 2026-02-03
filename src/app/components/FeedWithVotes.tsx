'use client';

import { useState, useEffect } from 'react';
import { Post, getPostVotes } from '../lib/api';
import { votesCache, VOTE_CACHE_TTL, getVoteCacheKey } from '../lib/voteCache';
import PostCard from './PostCard';

interface FeedWithVotesProps {
  posts: Post[];
  className?: string;
}

export default function FeedWithVotes({ posts, className }: FeedWithVotesProps) {
  // Store both userVoteId and voteCount to ensure data freshness
  const [votesData, setVotesData] = useState<Record<number, { userVoteId: number | null; voteCount: number }>>({});

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('learnloop_token');
    if (!token) return;

    // Fetch vote statuses for all posts in parallel
    const fetchVotes = async () => {
      // Create a map of promises
      const promises = posts.map(async (post) => {
        const cacheKey = getVoteCacheKey(token, post.id);
        const cached = votesCache.get(cacheKey);

        // Use cache if valid
        if (cached && (Date.now() - cached.timestamp < VOTE_CACHE_TTL)) {
          return { id: post.id, status: cached.data };
        }

        try {
          const status = await getPostVotes(post.id);
          // Update cache
          votesCache.set(cacheKey, { timestamp: Date.now(), data: status });
          return { id: post.id, status };
        } catch (error) {
          // If fetch fails, we assume no vote or handle it silently
          return { id: post.id, status: null };
        }
      });

      // Wait for all promises to resolve
      const results = await Promise.all(promises);

      // Reduce to a map
      const newVotesData: Record<number, { userVoteId: number | null; voteCount: number }> = {};
      results.forEach(result => {
        if (result.status) {
          newVotesData[result.id] = {
            userVoteId: result.status.user_vote_id || null,
            voteCount: result.status.vote_count
          };
        }
      });

      setVotesData(newVotesData);
    };

    if (posts.length > 0) {
      fetchVotes();
    }
  }, [posts]);

  return (
    <div className={className}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          initialUserVoteId={votesData[post.id]?.userVoteId}
          overrideVoteCount={votesData[post.id]?.voteCount}
          disableVoteFetch={true}
        />
      ))}
    </div>
  );
}
