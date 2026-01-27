import Link from 'next/link';
import { Post } from '../lib/api';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <Link href={`/posts/${post.id}`} className="block">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
          {post.title}
        </h2>
      </Link>
      
      <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
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
          {post.vote_count}
        </span>
      </div>
      
      <p className="text-gray-700 line-clamp-3">
        {post.excerpt}
      </p>
    </article>
  );
}
