# Palette's UX Improvement Recommendations

Based on a review of the current implementation, here are key opportunities for UX and accessibility enhancements.

## 1. Contextual Form Feedback
**Current State:** Forms (Login, Register) rely on backend error messages displayed at the top of the form after submission.
**Opportunity:** Implement inline validation (e.g., checking password strength or email format) as the user types. This reduces friction and prevents errors before submission.
**Status:** `PasswordStrengthIndicator` exists but could be integrated more prominently in `RegisterPage`.

## 2. Intuitive "Create Post" Flow
**Current State:** The "Topic ID" field requires users to input a numeric ID (e.g., "1"). This is highly unintuitive as users don't know topic IDs.
**Opportunity:** Replace the "Topic ID" input with a dropdown (`<select>`) populated with available topics.
**Blocker:** Requires `getTopics` API endpoint (currently missing in `src/app/lib/api.ts`).

## 3. Clear Verification Requirements
**Current State:** In `CreatePostPage`, the "Create Post" button is simply disabled if the user's email is not verified. No explanation is given.
**Opportunity:** Add a helper message or tooltip explaining *why* the action is disabled and how to fix it (e.g., "Please verify your email to post").
**Status:** **Selected for implementation.**

## 4. Navigation Accessibility
**Current State:** Navigation links use standard text.
**Opportunity:** Ensure all interactive elements (icons, inputs) have `focus-visible` styles that stand out (e.g., a thick ring) for keyboard users.
**Status:** Tailwind's `focus:ring` is used, but consistency checks are recommended.

## 5. Empty States
**Current State:** Some pages handle empty lists, but others might just show nothing.
**Opportunity:** Ensure every list (Comments, Topic Feed) has a friendly "No content yet" state with a Call-to-Action (e.g., "Be the first to comment!").
