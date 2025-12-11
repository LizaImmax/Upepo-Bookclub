# 🌬️ Upepo Bookclub

**Books that move with the wind — ideas that expand the mind.**

A full-stack web application for building a thriving bookclub community focused on personal growth, structured learning, and soulful reflection.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.7-2D3748)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)

## ✨ Features

### 📚 Book Management
- Monthly book selection with themes and descriptions
- Weekly reading plans with structured chapters
- Current, upcoming, and completed book tracking
- Beautiful book detail pages

### 💬 Community Discussions
- Threaded discussions with comments and replies
- Weekly, mid-month, and end-of-month discussion types
- Pinned discussions for important topics
- Rich text support for meaningful conversations

### 🎯 Live Sessions
- Schedule and manage live reading sessions
- Meeting links and recordings
- Session summaries and key takeaways
- Calendar of upcoming and past sessions

### 👥 User Management
- Secure authentication with NextAuth.js
- Role-based access (Member & Admin)
- User profiles and engagement tracking
- Activity history

### ⚙️ Admin Dashboard
- Book creation and management
- Weekly plan setup with discussion prompts
- Member management
- Session scheduling
- Analytics and statistics

### 🎨 Beautiful Design
- Wind-inspired gradient themes
- Responsive design for all devices
- Clean, modern interface
- Accessible and intuitive navigation

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Vercel-ready
- **Date Handling**: date-fns
- **Validation**: Zod

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/upepo-bookclub.git
cd upepo-bookclub
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Update the `.env` file with your credentials:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
NODE_ENV="development"
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

The application includes comprehensive models for:
- Users (with role-based access)
- Books (with status tracking)
- Weekly Plans (structured reading schedules)
- Discussion Prompts
- Discussions & Comments (threaded conversations)
- Live Sessions
- Monthly Summaries
- Reflections
- Voice Notes
- Visual Content

See `prisma/schema.prisma` for the complete schema.

## 🎯 Usage

### For Admins

1. **Create your account** and update your role to ADMIN in the database:
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

2. **Add a new book** via `/admin/books/new`
3. **Create weekly plans** with chapters and prompts
4. **Schedule live sessions** for community gatherings
5. **Monitor engagement** through the dashboard

### For Members

1. **Sign up** and join the community
2. **Browse books** and see what's currently being read
3. **Join discussions** and share insights
4. **Attend live sessions** for deep conversations
5. **Track your reading** through weekly plans

## 📁 Project Structure

```
upepo-bookclub/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   └── assets/                # Logo and images
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   ├── admin/             # Admin dashboard
│   │   ├── auth/              # Authentication pages
│   │   ├── books/             # Book pages
│   │   ├── discussions/       # Discussion pages
│   │   ├── sessions/          # Live session pages
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   └── lib/                   # Utilities and configs
├── .env.example               # Environment template
├── DEPLOYMENT.md              # Deployment guide
└── package.json               # Dependencies
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for Vercel.

Quick deploy:
```bash
# Push to GitHub
git push origin main

# Deploy with Vercel CLI
vercel --prod
```

## 🎨 Customization

### Brand Colors

Update colors in `tailwind.config.ts`:
```typescript
colors: {
  upepo: {
    // Your primary color shades
  },
  wind: {
    // Your secondary color shades
  }
}
```

### Logo

Replace the placeholder logo at `/public/assets/upepo-logo.png` with your own design. See `/public/assets/LOGO-README.md` for specifications.

## 🤝 Contributing

This is a custom project for Upepo Bookclub. If you'd like to contribute or suggest features, please reach out to the project maintainer.

## 📄 License

This project is private and proprietary to Upepo Ecosystem.

## 🌟 About Upepo Bookclub

Upepo Bookclub is the reading arm of the Upepo Ecosystem — a calm, inspiring space where books become portals to growth, community, clarity, and creativity.

Every month is intentional. Every discussion is purposeful. Every reader is a contributor.

**Core Values:**
- 🌱 Expand the mind through transformative reading
- 🤝 Build community through shared journeys
- 📖 Make learning structured, enjoyable, and soulful
- 🎯 Bridge reading with personal transformation

---

Built with 💙 for the Upepo community

🌬️ **Books that move with the wind — ideas that expand the mind.**
