# Deployment Troubleshooting Guide

## Ghost 404 Error - Diagnosis and Solutions

This guide helps diagnose and fix "Ghost 404" errors where the build succeeds but the deployed site shows a 404 error.

### Current Configuration Status ✅

The LearnLoop frontend is correctly configured with:

- ✅ **No basePath**: The app serves from the root domain (`/`)
- ✅ **No middleware**: No request interception or blocking
- ✅ **No public/index.html**: No conflicts with Next.js routing
- ✅ **Proper build output**: Routes are generated correctly

### Build Verification

When you run `npm run build`, you should see:

```
Route (app)
┌ ○ /                    ← Homepage exists and is static
├ ○ /_not-found
├ ƒ /posts/[postId]
└ ƒ /topics/[topicId]
```

This confirms all routes are properly generated.

### Common Causes of Ghost 404 Errors

#### 1. basePath Misconfiguration

**Problem**: If `basePath` is defined in `next.config.ts`, the app serves from a subpath instead of root.

**Check**: Review `next.config.ts`
```typescript
const nextConfig: NextConfig = {
  // ❌ basePath: '/learning', // Would make site accessible at /learning instead of /
  // ✅ No basePath (current configuration) - serves from root /
};
```

**Current Status**: ✅ Correctly configured - no basePath

#### 2. Middleware Blocking

**Problem**: Middleware can intercept requests and return 404 or redirect incorrectly.

**Check**: Look for `middleware.ts` in root or `src/` folder

**Current Status**: ✅ No middleware present

#### 3. Vercel Project Settings

**Problem**: Incorrect "Root Directory" setting in Vercel Dashboard.

**Solution**:
1. Go to Vercel Dashboard → Your Project → Settings → General
2. Check "Root Directory" setting:
   - Should be `.` or empty (since Next.js files are at repo root)
   - ❌ Do NOT set it to a subfolder if your code is at root

**Current Repo Structure**: 
- `next.config.ts` is at repo root
- `package.json` is at repo root
- ✅ Root Directory should be `.` or empty

#### 4. Public Folder Conflicts

**Problem**: An `index.html` file in `public/` can conflict with Next.js routing.

**Check**: Ensure `public/index.html` does not exist

**Current Status**: ✅ No index.html in public folder

### Deployment Checklist

Before deploying, verify:

- [ ] `npm run build` succeeds locally
- [ ] Root route (`/`) appears in build output
- [ ] No `basePath` in `next.config.ts` (unless intentional)
- [ ] No `middleware.ts` blocking root requests
- [ ] No `public/index.html` file
- [ ] Vercel "Root Directory" = `.` or empty
- [ ] Environment variables are set in Vercel Dashboard

### Vercel Configuration

The `vercel.json` file ensures optimal deployment:

```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

### Testing Locally

Run the production build locally to verify:

```bash
npm run build
npm start
```

Visit `http://localhost:3000` - you should see the homepage.

### Environment Variables

Required for production:

1. Create `.env.local` (not committed to git):
```bash
NEXT_PUBLIC_API_URL=https://your-backend-api-url
```

2. Set in Vercel Dashboard → Settings → Environment Variables:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: Your backend API URL

### Getting Help

If you still encounter issues:

1. Check Vercel deployment logs
2. Verify the build output shows your routes
3. Test the production build locally first
4. Ensure environment variables are set correctly

---

**Last Updated**: January 2026  
**Status**: All configurations verified ✅
