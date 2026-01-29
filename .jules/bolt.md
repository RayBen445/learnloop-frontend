## 2024-05-22 - [Excessive no-store usage]
**Learning:** The codebase defaults to `cache: 'no-store'` for all API calls, including public feeds. This cripples performance by bypassing Next.js Data Cache.
**Action:** Always check `api.ts` or data fetching layers for `no-store` when looking for easy wins in Next.js apps.
