import { VoteStatus } from './api';

export const votesCache = new Map<string, { timestamp: number; data: VoteStatus }>();
export const VOTE_CACHE_TTL = 60 * 1000; // 1 minute

export function getVoteCacheKey(token: string, postId: number): string {
  return `${token}-${postId}`;
}

export function invalidateVoteCache(token: string, postId: number) {
  votesCache.delete(getVoteCacheKey(token, postId));
}
