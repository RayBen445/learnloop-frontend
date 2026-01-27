import Link from 'next/link';
import { Post } from '../lib/api';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg p-6 transition-all hover:border-gray-300 hover:shadow-sm">
      <Link href={`/posts/${post.id}`} className="block group">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
          {post.title}
        </h2>
      </Link>
      
      <div className="flex items-center gap-3 text-sm mb-4">
        <span className="text-gray-700 font-medium">{post.author.username}</span>
        <span className="text-gray-400">•</span>
        <Link 
          href={`/topics/${post.topic.id}`}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
        >
          {post.topic.name}
        </Link>
        <span className="text-gray-400">•</span>
        <span className="flex items-center gap-1.5 text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <span className="font-medium">{post.vote_count}</span>
        </span>
      </div>
      
      <p className="text-gray-600 leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>
    </article>
  );
}
