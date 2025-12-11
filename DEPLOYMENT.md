# 🚀 Deploying Upepo Bookclub to Vercel

This guide will help you deploy your Upepo Bookclub web application to Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- PostgreSQL database (recommended: [Neon](https://neon.tech) or [Supabase](https://supabase.com))

## Step 1: Prepare Your Database

### Option A: Neon (Recommended - Free Tier)
1. Go to [neon.tech](https://neon.tech) and create an account
2. Create a new project
3. Copy the connection string (starts with `postgresql://...`)

### Option B: Supabase (Alternative)
1. Go to [supabase.com](https://supabase.com) and create a project
2. Go to Project Settings → Database
3. Copy the connection string under "Connection pooling"

## Step 2: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Upepo Bookclub"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/upepo-bookclub.git
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com/new)
2. Import your GitHub repository
3. Configure your project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `prisma generate && next build`
   - **Install Command**: `npm install`

## Step 4: Add Environment Variables

In your Vercel project settings, add these environment variables:

```bash
# Database
DATABASE_URL="your-postgresql-connection-string"

# NextAuth
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="generate-a-random-secret-here"

# Node Environment
NODE_ENV="production"
```

### Generate NEXTAUTH_SECRET

Run this command locally:
```bash
openssl rand -base64 32
```
Copy the output and use it as your `NEXTAUTH_SECRET`.

## Step 5: Run Database Migrations

After deployment, you need to set up your database:

### Option 1: Via Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Link your project:
```bash
vercel link
```

3. Run migrations:
```bash
vercel env pull .env.local
npx prisma migrate deploy
npx prisma db push
```

### Option 2: Manual Database Setup

If you prefer, you can run migrations directly:

```bash
# Set your production DATABASE_URL
export DATABASE_URL="your-production-database-url"

# Push the schema
npx prisma db push

# (Optional) Seed initial data
npx prisma db seed
```

## Step 6: Create Your First Admin User

After deployment, you'll need an admin account:

1. Visit your deployed site: `https://your-domain.vercel.app`
2. Sign up for an account
3. Update the user in your database to make them an admin:

```sql
-- Connect to your database and run:
UPDATE users 
SET role = 'ADMIN' 
WHERE email = 'your-email@example.com';
```

## Step 7: Verify Deployment

Visit your site and test:
- ✅ Homepage loads
- ✅ Sign up / Sign in works
- ✅ Admin dashboard accessible
- ✅ Database operations work

## 🔧 Troubleshooting

### Build Errors
- Check Vercel build logs
- Ensure all environment variables are set
- Verify database connection string is correct

### Database Issues
- Ensure DATABASE_URL includes `?schema=public` at the end
- Check that your database allows external connections
- Verify Prisma schema is correct

### Authentication Issues
- Ensure NEXTAUTH_SECRET is set
- Verify NEXTAUTH_URL matches your domain
- Check that database tables are created

## 📝 Post-Deployment Checklist

- [ ] Database is connected and migrations ran successfully
- [ ] Admin user created and can access /admin
- [ ] All environment variables are set
- [ ] SSL/HTTPS is working
- [ ] Custom domain configured (optional)
- [ ] Logo uploaded to `/public/assets/`
- [ ] First book added to the platform

## 🌟 Next Steps

1. **Add Your Logo**: Upload your logo to `/public/assets/upepo-logo.png`
2. **Create Your First Book**: Use the admin dashboard to add a book
3. **Invite Members**: Share your site URL with your community
4. **Customize**: Update colors, fonts, and content to match your brand

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)

---

**Need Help?** Check the Vercel logs or reach out to your development team.

🌬️ **Upepo Bookclub** - Books that move with the wind, ideas that expand the mind.
