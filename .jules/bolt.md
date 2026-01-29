## 2024-05-22 - [Excessive no-store usage]
**Learning:** The codebase defaults to `cache: 'no-store'` for all API calls, including public feeds. This cripples performance by bypassing Next.js Data Cache.
**Action:** Always check `api.ts` or data fetching layers for `no-store` when looking for easy wins in Next.js apps.

## 2024-05-22 - [Artificial Delays in Auth]
**Learning:** Found unnecessary `await new Promise(resolve => setTimeout(resolve, 100))` in critical auth flows (Login/Register). These "band-aids" often mask state management issues but degrade user experience.
**Action:** Remove explicit timeouts in flow control; rely on `await` of async functions instead.

## 2024-05-22 - [State Synchronization Race Conditions]
**Learning:** Imperative redirection (e.g., `router.push`) immediately after setting global context state can race with React's render cycle, causing the destination page to see stale state. This manifests as "redirect loops" in auth guards.
**Action:** Use reactive redirection (e.g., `useEffect` watching `user` state) to ensure navigation only occurs *after* the state has propagated.
