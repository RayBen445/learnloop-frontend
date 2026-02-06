## 2025-02-06 - Optimistic UI Patterns
**Learning:** Optimistic UI updates (like in VoteButton) significantly improve perceived performance but introduce complexity in state management (temporary IDs, reversion).
**Action:** When implementing optimistic updates, always ensure a robust rollback mechanism (try/catch/finally) and handle race conditions (e.g., blocking subsequent interactions or queuing).
