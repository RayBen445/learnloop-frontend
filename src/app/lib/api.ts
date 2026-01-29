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

// API Error type for consistent error handling
export class ApiError extends Error {
  code: string;
  
  constructor(message: string, code: string = 'UNKNOWN_ERROR') {
    super(message);
    this.name = 'ApiError';
    this.code = code;
  }
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

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
}

// Helper function to create excerpt from content
export function createExcerpt(content: string, wordLimit: number = 40): string {
  const regex = /\s+/g;
  const words: string[] = [];
  let lastIndex = 0;
  let match;

  // Iterate through the string to find words up to the limit
  // This avoids splitting the entire string which can be expensive for large content
  while ((match = regex.exec(content)) !== null) {
    const word = content.slice(lastIndex, match.index);
    words.push(word);
    lastIndex = regex.lastIndex;

    // Optimization: Stop once we have enough words to determine if we need an excerpt
    if (words.length > wordLimit) {
      break;
    }
  }

  // If we haven't exceeded the limit yet, add the final segment
  if (words.length <= wordLimit) {
    words.push(content.slice(lastIndex));
  }

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
    const error = await response.json().catch(() => ({ detail: 'Registration failed', code: 'REGISTRATION_ERROR' }));
    throw new ApiError(error.detail || 'Registration failed', error.code || 'REGISTRATION_ERROR');
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
    const error = await response.json().catch(() => ({ detail: 'Login failed', code: 'LOGIN_ERROR' }));
    throw new ApiError(error.detail || 'Login failed', error.code || 'LOGIN_ERROR');
  }

  return response.json();
}

// Post creation function
export async function createPost(data: CreatePostData): Promise<Post> {
  // Get JWT token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  if (!token) {
    throw new ApiError('Authentication required. Please login first.', 'NO_TOKEN');
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
    const error = await response.json().catch(() => ({ detail: 'Failed to create post', code: 'CREATE_POST_ERROR' }));
    throw new ApiError(error.detail || 'Failed to create post', error.code || 'CREATE_POST_ERROR');
  }

  return response.json();
}

// Comment creation function
export async function createComment(data: CreateCommentData): Promise<Comment> {
  // Get JWT token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  if (!token) {
    throw new ApiError('Authentication required. Please login first.', 'NO_TOKEN');
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
    const error = await response.json().catch(() => ({ detail: 'Failed to create comment', code: 'CREATE_COMMENT_ERROR' }));
    throw new ApiError(error.detail || 'Failed to create comment', error.code || 'CREATE_COMMENT_ERROR');
  }

  return response.json();
}

// Vote functions
export async function createVote(data: CreateVoteData): Promise<Vote> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  if (!token) {
    throw new ApiError('Authentication required. Please login first.', 'NO_TOKEN');
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
    const error = await response.json().catch(() => ({ detail: 'Failed to create vote', code: 'CREATE_VOTE_ERROR' }));
    throw new ApiError(error.detail || 'Failed to create vote', error.code || 'CREATE_VOTE_ERROR');
  }

  return response.json();
}

export async function deleteVote(voteId: number): Promise<void> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  if (!token) {
    throw new ApiError('Authentication required. Please login first.', 'NO_TOKEN');
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
    const error = await response.json().catch(() => ({ detail: 'Failed to delete vote', code: 'DELETE_VOTE_ERROR' }));
    throw new ApiError(error.detail || 'Failed to delete vote', error.code || 'DELETE_VOTE_ERROR');
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
export async function getCurrentUser(): Promise<User | null> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  if (!token) {
    throw new ApiError('Authentication required. Please login first.', 'NO_TOKEN');
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
    const error = await response.json().catch(() => ({ detail: 'Failed to fetch user data', code: 'FETCH_ERROR' }));
    throw new ApiError(error.detail || 'Failed to fetch user data', error.code || 'FETCH_ERROR');
  }

  const data = await response.json();
  
  // Handle new response format: { user: null } or { user: User }
  if (data && typeof data === 'object' && 'user' in data) {
    return data.user;
  }
  
  // Fallback for direct User object response (backward compatibility)
  return data;
}

export async function updateUser(data: UpdateUserData): Promise<User> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  if (!token) {
    throw new ApiError('Authentication required. Please login first.', 'NO_TOKEN');
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
    const error = await response.json().catch(() => ({ detail: 'Failed to update user', code: 'UPDATE_USER_ERROR' }));
    throw new ApiError(error.detail || 'Failed to update user', error.code || 'UPDATE_USER_ERROR');
  }

  return response.json();
}

export async function changePassword(data: ChangePasswordData): Promise<{ message: string }> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('learnloop_token') : null;
  
  if (!token) {
    throw new ApiError('Authentication required. Please login first.', 'NO_TOKEN');
  }

  const response = await fetch(
    `${getApiBaseUrl()}/api/me/password`,
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
    const error = await response.json().catch(() => ({ detail: 'Failed to change password', code: 'CHANGE_PASSWORD_ERROR' }));
    throw new ApiError(error.detail || 'Failed to change password', error.code || 'CHANGE_PASSWORD_ERROR');
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
    const error = await response.json().catch(() => ({ detail: 'Verification failed', code: 'VERIFY_EMAIL_ERROR' }));
    throw new ApiError(error.detail || 'Verification failed', error.code || 'VERIFY_EMAIL_ERROR');
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
    const error = await response.json().catch(() => ({ detail: 'Failed to resend verification email', code: 'RESEND_VERIFICATION_ERROR' }));
    throw new ApiError(error.detail || 'Failed to resend verification email', error.code || 'RESEND_VERIFICATION_ERROR');
  }

  return response.json();
}
