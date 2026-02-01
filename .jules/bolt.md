## 2024-05-23 - Inconsistent Component Usage in Auth Views
**Learning:** The authenticated home view (`src/app/home`) manually implemented feed rendering using `PostCard` mapping, while the public view used `FeedWithVotes`. This caused a performance regression for logged-in users because `PostCard` individually fetches vote status (N+1 requests), whereas `FeedWithVotes` batches these requests.
**Action:** When working on authenticated vs public views of the same content, ensure shared optimized components (like `FeedWithVotes`) are used in both places to maintain performance characteristics.
