## 2024-05-23 - N+1 Request Waterfall in Post Lists
**Learning:** `PostCard` components independently fetching data (like vote status) creates massive N+1 request waterfalls when rendered in a list. Centralizing this logic in a parent component (`FeedWithVotes`) that performs parallel fetching (`Promise.all`) significantly improves perceived performance and data management.
**Action:** Always verify list items don't trigger individual API calls on mount. Use container components to batch or parallelize data fetching for lists.

## 2024-05-23 - React.memo and Prop Stability
**Learning:** `React.memo` is ineffective if parent components recreate object/array props on every render. However, for components with primitive props or stable references, it remains a critical optimization to prevent render cascades. `PostCard` benefits from this when `FeedWithVotes` updates state.
**Action:** Ensure props passed to memoized components are stable.
