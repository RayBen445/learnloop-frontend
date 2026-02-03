## 2024-05-22 - Accessibility & Autocomplete Patterns
**Learning:** Authentication forms (Login/Register) were missing `autocomplete` attributes, and icon-only buttons (like "Clear search") were missing `aria-label`.
**Action:** When working on forms, always check for `autocomplete` attributes on email, username, and password fields. For icon-only buttons, ensure `aria-label` is present and `aria-hidden="true"` is on the icon.
