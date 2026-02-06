## 2025-02-12 - Dynamic ARIA Labels for Toggle Buttons
**Learning:** For toggle buttons (like upvotes) that display a count, screen readers need context. A static label isn't enough.
**Action:** Use a dynamic `aria-label` that includes the action (Upvote/Remove vote), the context (post/comment), and the current count. Also use `aria-pressed` to indicate state.
