# Learnings

- To verify `fetch` caching options in a standalone script, one can mock `global.fetch` and inspect the `init` object passed to it. This is useful for testing Next.js specific extensions like `next: { revalidate: N }` without running the full server.
- The project has `package-lock.json` but instructions say to use `pnpm`. Avoid committing `pnpm-lock.yaml` unless intended to migrate.
