## 2024-05-22 - [Excessive no-store usage]
**Learning:** The codebase defaults to `cache: 'no-store'` for all API calls, including public feeds. This cripples performance by bypassing Next.js Data Cache.
**Action:** Always check `api.ts` or data fetching layers for `no-store` when looking for easy wins in Next.js apps.

## 2024-05-22 - [Artificial Delays in Auth]
**Learning:** Found unnecessary `await new Promise(resolve => setTimeout(resolve, 100))` in critical auth flows (Login/Register). These "band-aids" often mask state management issues but degrade user experience.
**Action:** Remove explicit timeouts in flow control; rely on `await` of async functions instead.
