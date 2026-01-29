'use client';

import { useState, useEffect } from 'react';
import { Post, getPostVotes } from '../lib/api';
import PostCard from './PostCard';

interface FeedWithVotesProps {
  posts: Post[];
  className?: string;
}

export default function FeedWithVotes({ posts, className }: FeedWithVotesProps) {
  const [userVotes, setUserVotes] = useState<Record<number, number | null>>({});

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
          return { id: post.id, userVoteId: status.user_vote_id || null };
        } catch (error) {
          // If fetch fails, we assume no vote or handle it silently
          return { id: post.id, userVoteId: null };
        }
      });

      // Wait for all promises to resolve
      // We use Promise.all because we handled errors in the map function
      const results = await Promise.all(promises);

      // Reduce to a map
      const votesMap: Record<number, number | null> = {};
      results.forEach(result => {
        votesMap[result.id] = result.userVoteId;
      });

      setUserVotes(votesMap);
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
          initialUserVoteId={userVotes[post.id]}
          disableVoteFetch={true}
        />
      ))}
    </div>
  );
}
