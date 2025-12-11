# Database Setup for Vercel Deployment

Your app is ready to deploy, but you need to set up a PostgreSQL database first since Vercel doesn't support SQLite.

## Quick Setup Options

### Option 1: Vercel Postgres (Recommended - Easiest)

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Select your `upepo-bookclub` project
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Follow the prompts to create your database
7. Vercel will automatically add `DATABASE_URL` to your environment variables ✅

### Option 2: Supabase (Free & Great)

1. Go to https://supabase.com and sign up
2. Create a new project
3. Go to **Project Settings** → **Database**
4. Copy the **Connection string** (URI format)
5. In Vercel:
   - Go to **Settings** → **Environment Variables**
   - Add `DATABASE_URL` with your Supabase connection string
   - Make sure it's available for **Production, Preview, and Development**

### Option 3: Neon (Serverless Postgres)

1. Go to https://neon.tech and sign up
2. Create a new project
3. Copy the connection string
4. Add to Vercel environment variables

## After Setting Up Database

1. **In Vercel**, add these environment variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXTAUTH_URL` - Your production URL (e.g., `https://upepo-bookclub.vercel.app`)
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`

2. **Redeploy** your app from Vercel dashboard

3. **Run migrations** - After first deployment, you need to set up the database:
   
   Option A: Use Vercel CLI locally:
   ```bash
   vercel env pull .env.production
   npx prisma db push
   ```
   
   Option B: Add this to your `package.json` build script (I'll do this for you):
   ```json
   "vercel-build": "prisma generate && prisma db push --accept-data-loss && next build"
   ```

## Connection String Format

Your `DATABASE_URL` should look like:
```
postgresql://username:password@host:5432/database?sslmode=require
```

## Troubleshooting

- **Error: "Environment variable not found"** - Make sure DATABASE_URL is set in Vercel
- **Error: "Can't reach database"** - Check your connection string format
- **Error: "SSL required"** - Add `?sslmode=require` to the end of your connection string

## Local Development

For local development with SQLite:
1. Change `prisma/schema.prisma`: `provider = "sqlite"`
2. Update `.env`: `DATABASE_URL="file:./dev.db"`
3. Run: `npx prisma db push`

For local development with PostgreSQL:
1. Use your production DATABASE_URL or a local Postgres instance
2. Run: `npx prisma db push`
