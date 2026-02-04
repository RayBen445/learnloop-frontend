'use client';

import { useState, useEffect } from 'react';
import { Post, getPostVotes } from '../lib/api';
import PostCard from './PostCard';

interface FeedWithVotesProps {
  posts: Post[];
  className?: string;
}

export default function FeedWithVotes({ posts, className }: FeedWithVotesProps) {
  const [votesData, setVotesData] = useState<Record<number, { userVoteId: number | null; voteCount: number }>>({});

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('learnloop_token');
    if (!token) return;

    // Fetch vote statuses for all posts in parallel
    const fetchVotes = async () => {
      // Create a map of promises
      const promises = posts.map(async (post) => {
        try {
          const status = await getPostVotes(post.id);
          return {
            id: post.id,
            userVoteId: status.user_vote_id || null,
            voteCount: status.vote_count
          };
        } catch (error) {
          // If fetch fails, we assume no vote or handle it silently
          return {
            id: post.id,
            userVoteId: null,
            voteCount: post.vote_count // Fallback to initial count
          };
        }
      });

      // Wait for all promises to resolve
      // We use Promise.all because we handled errors in the map function
      const results = await Promise.all(promises);

      // Reduce to a map
      const votesMap: Record<number, { userVoteId: number | null; voteCount: number }> = {};
      results.forEach(result => {
        votesMap[result.id] = {
          userVoteId: result.userVoteId,
          voteCount: result.voteCount
        };
      });

      setVotesData(votesMap);
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
