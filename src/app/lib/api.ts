// API utility functions for LearnLoop

/**
 * Validates and returns the API base URL
 * Fails loudly if NEXT_PUBLIC_API_URL is not configured
 * This is called on each API request to support runtime configuration
 */
function getApiBaseUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    throw new Error(
      'NEXT_PUBLIC_API_URL environment variable is not configured. ' +
      'Please set it in your .env.local file or environment variables.'
    );
  }
  
  return apiUrl;
}

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
  vote_count: number;
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

export interface CreatePostData {
  title: string;
  content: string;
  topic_id: number;
}

export interface CreateCommentData {
  post_id: number;
  content: string;
}

export interface Vote {
  id: number;
  user_id: number;
  target_type: 'post' | 'comment';
  target_id: number;
  created_at: string;
}

export interface CreateVoteData {
  target_type: 'post' | 'comment';
  target_id: number;
}

export interface VoteStatus {
  vote_count: number;
  user_vote_id?: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  email_verified: boolean;
  bio?: string;
  created_at: string;
}

export interface UpdateUserData {
  username?: string;
  bio?: string;
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
    `${getApiBaseUrl()}/api/feed/home?page=${page}&page_size=${pageSize}`,
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
    `${getApiBaseUrl()}/api/feed/topic/${topicId}?page=${page}&page_size=${pageSize}`,
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
    `${getApiBaseUrl()}/api/posts/${postId}`,
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
    `${getApiBaseUrl()}/api/auth/register`,
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
    `${getApiBaseUrl()}/api/auth/login`,
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

// Post creation function
export async function createPost(data: CreatePostData): Promise<Post> {
  // Get JWT token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  if (!token) {
    throw new Error('Authentication required. Please login first.');
  }

  const response = await fetch(
    `${getApiBaseUrl()}/api/posts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to create post' }));
    throw new Error(error.detail || 'Failed to create post');
  }

  return response.json();
}

// Comment creation function
export async function createComment(data: CreateCommentData): Promise<Comment> {
  // Get JWT token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  if (!token) {
    throw new Error('Authentication required. Please login first.');
  }

  const response = await fetch(
    `${getApiBaseUrl()}/api/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to create comment' }));
    throw new Error(error.detail || 'Failed to create comment');
  }

  return response.json();
}

// Vote functions
export async function createVote(data: CreateVoteData): Promise<Vote> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  if (!token) {
    throw new Error('Authentication required. Please login first.');
  }

  const response = await fetch(
    `${getApiBaseUrl()}/api/votes`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to create vote' }));
    throw new Error(error.detail || 'Failed to create vote');
  }

  return response.json();
}

export async function deleteVote(voteId: number): Promise<void> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  if (!token) {
    throw new Error('Authentication required. Please login first.');
  }

  const response = await fetch(
    `${getApiBaseUrl()}/api/votes/${voteId}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to delete vote' }));
    throw new Error(error.detail || 'Failed to delete vote');
  }
}

export async function getPostVotes(postId: number): Promise<VoteStatus> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  const headers: HeadersInit = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${getApiBaseUrl()}/api/votes/posts/${postId}`,
    { 
      headers,
      cache: 'no-store'
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch vote status');
  }

  return response.json();
}

export async function getCommentVotes(commentId: number): Promise<VoteStatus> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  const headers: HeadersInit = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${getApiBaseUrl()}/api/votes/comments/${commentId}`,
    { 
      headers,
      cache: 'no-store'
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch vote status');
  }

  return response.json();
}

// User API functions
export async function getUser(userId: string): Promise<User> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/users/${userId}`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
}

export async function getUserPosts(authorId: string, page: number = 1, pageSize: number = 10): Promise<FeedResponse> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/posts/author/${authorId}?page=${page}&page_size=${pageSize}`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user posts');
  }

  const data = await response.json();
  
  // Process posts to ensure they have excerpts
  const posts = data.posts.map((post: Post) => ({
    ...post,
    excerpt: post.excerpt || createExcerpt(post.content)
  }));

  return { ...data, posts };
}

// Current user API functions (authenticated)
export async function getCurrentUser(): Promise<User> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  if (!token) {
    throw new Error('Authentication required. Please login first.');
  }

  const response = await fetch(
    `${getApiBaseUrl()}/api/me`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store'
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return response.json();
}

export async function updateUser(data: UpdateUserData): Promise<User> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  if (!token) {
    throw new Error('Authentication required. Please login first.');
  }

  const response = await fetch(
    `${getApiBaseUrl()}/api/me`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to update user' }));
    throw new Error(error.detail || 'Failed to update user');
  }

  return response.json();
}

// Email verification function
export async function verifyEmail(token: string): Promise<{ message: string }> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/auth/verify-email?token=${token}`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Verification failed' }));
    throw new Error(error.detail || 'Verification failed');
  }

  return response.json();
}

// Resend verification email
export async function resendVerificationEmail(email?: string): Promise<{ message: string }> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  const headers: HeadersInit = {};
  const body: any = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  if (email) {
    headers['Content-Type'] = 'application/json';
    body.email = email;
  }

  const response = await fetch(
    `${getApiBaseUrl()}/api/auth/resend-verification`,
    {
      method: 'POST',
      headers,
      ...(email ? { body: JSON.stringify(body) } : {}),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to resend verification email' }));
    throw new Error(error.detail || 'Failed to resend verification email');
  }

  return response.json();
}
