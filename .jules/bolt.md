## 2024-05-23 - Feed Component Optimization
**Learning:** Individual `PostCard` components fetching their own vote status causes an N+1 request waterfall on the client. Using a centralized feed component (like `FeedWithVotes`) that batches fetches (via `Promise.all` or a specific batch API) significantly reduces React hook overhead and network connection contention.
**Action:** Always prefer `FeedWithVotes` or similar patterns for lists of entities requiring auxiliary data fetching. Ensure the feed component propagates ALL fetched data (like updated vote counts) to children to avoid stale UI.
