## 2025-02-26 - Missing ARIA labels on icon-only buttons
**Learning:** Icon-only buttons (like vote/like buttons) often lack ARIA labels, making them inaccessible to screen reader users who only hear the content (e.g., a number) or nothing at all.
**Action:** Always inspect icon-only buttons and add `aria-label` describing the action and state. For toggle buttons, use `aria-pressed`.
