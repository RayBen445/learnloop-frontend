## 2024-05-22 - Navbar Dropdown Accessibility
**Learning:** The user dropdown in the Navbar was missing critical ARIA attributes (`aria-expanded`, `aria-haspopup`, `aria-controls`) and visual affordance (chevron).
**Action:** Always verify dropdowns for keyboard accessibility and screen reader support. Added a rotating chevron for better visual feedback.

## 2024-05-22 - Auth Context Behavior
**Learning:** `AuthContext` clears the authentication token immediately if the `getCurrentUser` API call fails. This makes testing authenticated states difficult without a full backend or comprehensive API mocking.
**Action:** When testing authenticated routes, ensure all auth-related API endpoints (`/api/me`) are mocked successfully to prevent auto-logout.
