## 2024-05-22 - Accessible Dropdown Menus
**Learning:** Standard dropdowns often lack ARIA attributes and keyboard support, making them invisible or unusable for screen reader users. Adding `aria-expanded`, `role="menu"`, and Escape key support transforms a "div soup" dropdown into a robust, accessible component without changing the visual design significantly.
**Action:** Always check interactive dropdowns for `aria-expanded` and keyboard dismissibility (Escape key). Use `role="menu"` for list of actions.
