'use client';

import { useState, useEffect } from 'react';
import { Post, getPostVotes, VoteStatus } from '../lib/api';
import PostCard from './PostCard';

interface FeedWithVotesProps {
  posts: Post[];
  className?: string;
}

export default function FeedWithVotes({ posts, className }: FeedWithVotesProps) {
  const [voteData, setVoteData] = useState<Record<number, VoteStatus>>({});

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
          return { id: post.id, status };
        } catch (error) {
          // If fetch fails, we assume no vote or handle it silently
          return { id: post.id, status: null };
        }
      });

      // Wait for all promises to resolve
      // We use Promise.all because we handled errors in the map function
      const results = await Promise.all(promises);

      // Reduce to a map
      const votesMap: Record<number, VoteStatus> = {};
      results.forEach(result => {
        if (result.status) {
          votesMap[result.id] = result.status;
        }
      });

      setVoteData(votesMap);
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
          initialUserVoteId={voteData[post.id] ? (voteData[post.id].user_vote_id ?? null) : undefined}
          overrideVoteCount={voteData[post.id]?.vote_count}
          disableVoteFetch={true}
        />
      ))}
    </div>
  );
}
