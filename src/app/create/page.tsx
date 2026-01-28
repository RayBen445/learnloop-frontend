'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createPost } from '../lib/api';
import { useAuth } from '../../contexts/AuthContext';

export default function CreatePostPage() {
  const router = useRouter();
  const { user, mounted } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topicId, setTopicId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (mounted && !user) {
      router.push('/login');
    }
  }, [mounted, user, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Check if user is verified
    if (!user?.email_verified) {
      setError('Please verify your email address before creating posts.');
      return;
    }

    setLoading(true);

    try {
      const post = await createPost({
        title,
        content,
        topic_id: parseInt(topicId, 10),
      });
      // Redirect to the created post
      router.push(`/posts/${post.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gradient-primary">Create a Post</h1>
          <p className="text-base text-luxury-gray-400">Share your knowledge with the community</p>
        </div>

        <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="border-l-4 border-red-500 bg-red-950 bg-opacity-20 pl-4 py-3 rounded">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-luxury-gray-300 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-dark-surface-elevated border border-dark-border rounded-lg text-sm text-luxury-white placeholder-luxury-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-luxury-gray-300 mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                disabled={loading}
                rows={10}
                className="w-full px-4 py-3 bg-dark-surface-elevated border border-dark-border rounded-lg text-sm text-luxury-white placeholder-luxury-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-y transition-all"
                placeholder="Write your post content..."
              />
            </div>

            <div>
              <label htmlFor="topicId" className="block text-sm font-medium text-luxury-gray-300 mb-2">
                Topic ID
              </label>
              <input
                id="topicId"
                type="number"
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                required
                disabled={loading}
                min="1"
                className="w-full px-4 py-3 bg-dark-surface-elevated border border-dark-border rounded-lg text-sm text-luxury-white placeholder-luxury-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                placeholder="Enter topic ID (e.g., 1)"
              />
              <p className="mt-2 text-xs text-luxury-gray-500">
                Enter the numeric ID of the topic for this post
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading || !user?.email_verified}
                className="flex-1 py-3.5 px-4 bg-gradient-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2 focus:ring-offset-dark-surface disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-lg"
              >
                {loading ? 'Creating...' : 'Create Post'}
              </button>
              <Link
                href="/"
                className="py-3.5 px-6 bg-transparent border-2 border-dark-border hover:border-luxury-gray-600 transition-colors text-luxury-gray-300 hover:text-luxury-white rounded-lg font-semibold text-sm text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
