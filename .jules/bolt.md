## 2024-05-22 - [Client-Side N+1 API Waterfalls]
**Learning:** React components (like `PostCard`) performing their own data fetching (`VoteButton`) inside a list create severe N+1 API request storms when rendered in client-side loops (`HomePageContent`).
**Action:** Always prefer batched data fetching or parent-level data aggregation (like `FeedWithVotes`) over self-fetching components in lists.
