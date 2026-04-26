# 🏪 كشك النهاردة — Koshk El-Naharda

> كشكك الرقمي المصري — أخبار، نكت، أمثال شعبية، وميمز كل يوم الصبح

A nostalgic digital Egyptian street kiosk (Koshk) web application that recreates the warm, humorous, and culturally authentic experience of stopping by your neighborhood koshk every morning.

## ✨ Features

### 🏠 Daily Koshk Homepage
- **خبر الكشك** — AI-generated daily Egyptian news in colloquial Arabic
- **نكتة الكشك** — Fresh daily Egyptian joke
- **ميم النهاردة** — Daily meme (Egyptian context)
- **مثل شعبي** — Egyptian proverb with humorous modern explanation
- **تقرير الكشك** — Warm daily report written as if by the old koshk owner

### 📦 رمي في الكشك (User Submissions)
- Submit jokes, memes, local news, proverbs, and street photos
- Anonymous posting supported
- Submissions go through moderation queue

### 🔥 آخر اللي اترمي (Realtime Feed)
- Live feed of approved user contributions
- Egyptian-style reactions: 😂 يا راجل | 🔥 صح كلامك | 👏 برافو | 😭 ههههه | ❤️ معاك

### ❤️ كشكي الخاص (Personal Saved Koshk)
- Save favorite jokes, memes, and proverbs
- Requires authentication

### 🌙 Daily Reset
- Content refreshes automatically at midnight Cairo time
- Powered by Vercel Cron + OpenAI

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (Auth, PostgreSQL, Storage, Realtime)
- **AI**: OpenAI GPT-4o-mini for Egyptian colloquial content
- **Deployment**: Vercel

## 📁 Project Structure

```
koshk-el-naharda/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate-daily/route.ts   # AI content generation
│   │   │   ├── submissions/route.ts       # User submissions CRUD
│   │   │   ├── reactions/route.ts         # Reactions API
│   │   │   └── saved/route.ts             # Saved items API
│   │   ├── auth/callback/route.ts         # Supabase auth callback
│   │   ├── feed/page.tsx                  # Realtime feed page
│   │   ├── login/page.tsx                 # Auth page
│   │   ├── saved/page.tsx                 # Personal saved items
│   │   ├── submit/page.tsx                # Submission form
│   │   ├── layout.tsx                     # Root layout (RTL, Arabic fonts)
│   │   ├── page.tsx                       # Homepage
│   │   └── globals.css                    # Koshk theme & styles
│   ├── components/
│   │   ├── koshk/
│   │   │   ├── KoshkHeader.tsx            # Nostalgic koshk header
│   │   │   ├── KoshkFooter.tsx            # Footer
│   │   │   ├── KoshkSection.tsx           # Reusable section wrapper
│   │   │   ├── DailyNews.tsx              # News section
│   │   │   ├── DailyJoke.tsx              # Joke section
│   │   │   ├── DailyMeme.tsx              # Meme section
│   │   │   ├── DailyProverb.tsx           # Proverb section
│   │   │   └── DailyReport.tsx            # Koshk owner's report
│   │   └── ui/                            # shadcn/ui components
│   └── lib/
│       ├── supabase/
│       │   ├── client.ts                  # Browser Supabase client
│       │   ├── server.ts                  # Server Supabase client
│       │   └── middleware.ts              # Auth middleware
│       ├── types.ts                       # TypeScript types
│       ├── date-utils.ts                  # Arabic date formatting
│       ├── placeholder-data.ts            # Placeholder content
│       └── utils.ts                       # Utility functions
├── supabase/
│   └── schema.sql                         # Database schema
├── .env.example                           # Environment variables template
├── vercel.json                            # Cron job config
└── next.config.ts                         # Next.js config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm
- A [Supabase](https://supabase.com) account
- An [OpenAI](https://platform.openai.com) API key

### 1. Clone & Install

```bash
git clone https://github.com/MohammedAtaaaa/koshk-el-naharda.git
cd koshk-el-naharda
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Go to **Settings > API** and copy your project URL and anon key

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Fill in the values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-api-key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app works with placeholder data even without Supabase configured.

### 5. Deploy to Vercel

```bash
npx vercel
```

Set the same environment variables in Vercel dashboard. The cron job in `vercel.json` will automatically generate new content daily at midnight Cairo time.

## 🎨 Design Philosophy

- **Warm nostalgia**: Wooden frames, faded paper textures, grain effect
- **Color palette**: Browns, oranges, yellows, off-white, red accents
- **Typography**: Cairo (body) + Amiri (Arabic titles)
- **Mobile-first**: Responsive design for all screen sizes
- **RTL-native**: Full right-to-left support

## 📝 License

MIT
