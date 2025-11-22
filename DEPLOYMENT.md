# Cloudflare Pages Deployment Guide

## Build succeeded! Ready to deploy to Cloudflare Pages.

### Option 1: Deploy via Cloudflare Dashboard (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Production build ready"
   git push origin main
   ```

2. **Create Cloudflare Pages Project**
   - Go to https://dash.cloudflare.com/
   - Navigate to "Workers & Pages"
   - Click "Create application" → "Pages" → "Connect to Git"
   - Select your repository

3. **Configure Build Settings**
   - Framework preset: **Next.js**
   - Build command: `pnpm build`
   - Build output directory: `.next`
   - Node version: `18`

4. **Set Environment Variables**
   Add these in Cloudflare Pages settings:
   ```
   TURSO_DATABASE_URL=your_turso_url
   TURSO_AUTH_TOKEN=your_turso_token
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   STRIPE_SECRET_KEY=your_stripe_secret
   ```

5. **Deploy**
   - Click "Save and Deploy"
   - Cloudflare will build and deploy your site
   - You'll get a URL like `urbanejungle.pages.dev`

### Option 2: Deploy via Wrangler CLI

```bash
# Install Wrangler
pnpm add -D wrangler

# Login to Cloudflare
npx wrangler login

# Deploy
npx wrangler pages deploy .next
```

## Custom Domain Setup

After deployment, to use custom domain `urbanejungle.org`:

1. Go to your Cloudflare Pages project
2. Click "Custom domains"
3. Add `urbanejungle.org`
4. Update your domain's DNS settings in Cloudflare

## What's Deployed

- ✅ Luxury home page with hero, categories, products
- ✅ Shop page (placeholder)
- ✅ Product detail pages
- ✅ Cart system
- ✅ Checkout with Stripe
- ✅ Auth pages (signup pending database)
- ✅ All API routes

## Known Limitations

- Signup currently returns "coming soon" (needs database migration)
- Product data needs seeding
- Some Prisma→Drizzle migrations pending

## Next Steps After Deployment

1. Run database migrations on Turso
2. Seed product data
3. Test checkout flow
4. Complete auth implementation
