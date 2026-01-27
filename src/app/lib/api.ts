// API utility functions for LearnLoop

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types
export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  author: {
    id: number;
    username: string;
  };
  topic: {
    id: number;
    name: string;
  };
  vote_count: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  content: string;
  author: {
    id: number;
    username: string;
  };
  created_at: string;
  updated_at: string;
}

export interface PostDetail extends Post {
  comments: Comment[];
}

export interface FeedResponse {
  posts: Post[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

// Helper function to create excerpt from content
export function createExcerpt(content: string, wordLimit: number = 40): string {
  const words = content.split(/\s+/);
  if (words.length <= wordLimit) {
    return content;
  }
  return words.slice(0, wordLimit).join(' ') + '...';
}

// API functions
export async function getHomeFeed(page: number = 1, pageSize: number = 10): Promise<FeedResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/feed/home?page=${page}&page_size=${pageSize}`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch home feed');
  }

  const data = await response.json();
  
  // Process posts to ensure they have excerpts
  const posts = data.posts.map((post: Post) => ({
    ...post,
    excerpt: post.excerpt || createExcerpt(post.content)
  }));

  return { ...data, posts };
}

export async function getTopicFeed(topicId: string, page: number = 1, pageSize: number = 10): Promise<FeedResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/feed/topic/${topicId}?page=${page}&page_size=${pageSize}`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch topic feed');
  }

  const data = await response.json();
  
  // Process posts to ensure they have excerpts
  const posts = data.posts.map((post: Post) => ({
    ...post,
    excerpt: post.excerpt || createExcerpt(post.content)
  }));

  return { ...data, posts };
}

export async function getPost(postId: string): Promise<PostDetail> {
  const response = await fetch(
    `${API_BASE_URL}/api/posts/${postId}`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  return response.json();
}

// Auth API functions
export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Registration failed' }));
    throw new Error(error.detail || 'Registration failed');
  }

  return response.json();
}

export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Login failed' }));
    throw new Error(error.detail || 'Login failed');
  }

  return response.json();
}
