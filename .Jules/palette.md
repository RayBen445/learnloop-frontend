## 2024-05-22 - [Accessible Toggle Buttons]
**Learning:** Icon-only buttons (like vote toggles) need explicit `aria-label` describing the action/context and `aria-pressed` for state, not just reliance on visual icons or inner text that might be just a number.
**Action:** Always check `VoteButton` or similar toggle components for `aria-pressed` and `aria-label` that includes the count/status if visible text is insufficient.
