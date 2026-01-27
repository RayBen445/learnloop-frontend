import Link from 'next/link';
import { Post } from '../lib/api';
import VoteButton from './VoteButton';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border-b border-gray-200 pb-8">
      <Link href={`/posts/${post.id}`} className="block group mb-2">
        <h2 className="text-lg font-medium text-gray-900 group-hover:text-blue-700">
          {post.title}
        </h2>
      </Link>
      
      <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
        <span>{post.author.username}</span>
        <span>·</span>
        <Link 
          href={`/topics/${post.topic.id}`}
          className="text-blue-700 hover:underline"
        >
          {post.topic.name}
        </Link>
        <span>·</span>
        <VoteButton 
          targetType="post" 
          targetId={post.id} 
          initialVoteCount={post.vote_count}
        />
      </div>
      
      <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>
    </article>
  );
}
