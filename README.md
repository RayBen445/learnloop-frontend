# LearnLoop Frontend

A learning-based social app for students built with Next.js, TypeScript, and Tailwind CSS.

## Phase 1: Read-only Experience

This implementation provides a complete read-only frontend for browsing posts, topics, and comments.

## Features

- **Home Feed** - Browse all posts with pagination
- **Topic Feed** - View posts filtered by topic
- **Post Detail** - Read full post content and comments
- Server-side rendering for optimal performance
- Responsive design with Tailwind CSS
- TypeScript for type safety

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Server Components (with client components where needed)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL to your backend API URL
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Requirements

The frontend expects the following API endpoints:

- `GET /api/feed/home?page={page}&page_size={size}` - Home feed
- `GET /api/feed/topic/{topicId}?page={page}&page_size={size}` - Topic feed
- `GET /api/posts/{postId}` - Post detail with comments

## Project Structure

```
src/app/
├── page.tsx                    # Home feed
├── topics/[topicId]/page.tsx   # Topic feed
├── posts/[postId]/page.tsx     # Post detail
├── components/
│   ├── PostCard.tsx            # Post card component
│   └── Pagination.tsx          # Pagination controls
├── lib/
│   └── api.ts                  # API utilities and types
├── layout.tsx                  # Root layout
└── globals.css                 # Global styles
```

## Build

```bash
npm run build
```

## Deployment

For production deployment to Vercel, see [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Configuration verification
- Troubleshooting Ghost 404 errors
- Environment setup
- Deployment checklist

## Files Created

- `src/app/page.tsx` - Home feed page
- `src/app/topics/[topicId]/page.tsx` - Topic feed page
- `src/app/posts/[postId]/page.tsx` - Post detail page
- `src/app/components/PostCard.tsx` - Reusable post card component
- `src/app/components/Pagination.tsx` - Pagination component
- `src/app/lib/api.ts` - API utility functions and TypeScript interfaces

## Assumptions Made

1. **API Response Format**: The API returns responses in the expected JSON format with `posts`, `total`, `page`, `page_size`, and `total_pages` fields
2. **Post Excerpts**: If the API doesn't provide excerpts, they are automatically generated from the first 40 words of the content
3. **Authentication**: Phase 1 does not include authentication (as specified in requirements)
4. **Mutations**: No create, update, or delete operations are included (read-only experience)
5. **Error Handling**: Basic error states are shown when API calls fail
6. **API Base URL**: Defaults to `http://localhost:8000` if `NEXT_PUBLIC_API_URL` is not set

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
