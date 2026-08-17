# IONITIX - Department of Computer Science & Engineering

A premium, production-ready department website built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

### Public Website
- **Modern Hero Section** - Animated, visually impressive landing
- **Events Management** - Complete event system with categories, registration, and individual event pages
- **Announcements** - Categorized, searchable announcements with pagination
- **Faculty Directory** - Profiles with photos, designations, specializations
- **Laboratories** - Detailed lab information with equipment and technologies
- **Achievements** - Student, faculty, and research achievements showcase
- **Gallery** - Masonry-style image gallery with lightbox and categories
- **Academics** - Program information, curriculum downloads
- **Contact** - Contact form, department info, Google Maps integration

### Event Registration System
- **Multiple Registration Types:**
  - Google Forms (button or embedded)
  - Native website registration (stored in Supabase)
  - External registration links
  - No registration required
- **Automatic Status Calculation** - Open, Closing Soon, Closed, Completed
- **Registration Deadlines** - Configurable per event
- **Google Sheets Workflow** - Natural Google Forms → Sheets integration

### Admin Dashboard
- **Secure Authentication** - Supabase Auth with protected routes
- **Statistics Dashboard** - Events, registrations, announcements overview
- **Event CRUD** - Create, edit, delete, publish, unpublish, duplicate, preview
- **Announcement Management** - Full CRUD with publishing workflow
- **Faculty Management** - Complete faculty directory management
- **Gallery Management** - Upload, organize, delete images with categories
- **Registration Management** - View, search, filter, export registrations (CSV)
- **Achievements Management** - Track and showcase accomplishments

### Technical Features
- **Server Components** - Optimized performance with Next.js App Router
- **Server Actions** - Secure form handling and mutations
- **Row Level Security** - Database-level access control
- **Image Optimization** - Next.js Image with Supabase Storage
- **Dark/Light Mode** - System-aware with manual toggle
- **Responsive Design** - Mobile-first, works on all devices
- **SEO Optimized** - Meta tags, Open Graph, sitemap, structured data
- **Accessibility** - WCAG 2.1 AA compliant
- **Animations** - Framer Motion with reduced-motion support
- **Toast Notifications** - Sonner for user feedback

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui + Radix UI |
| Animations | Framer Motion |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Forms | React Hook Form + Zod |
| Notifications | Sonner |
| Deployment | Vercel |

## 📦 Installation

### Prerequisites
- Node.js 20+
- npm/pnpm/yarn
- Supabase account

### Local Development

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd ionitix
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key (safe for client)
   - `SUPABASE_SERVICE_ROLE_KEY` - Service role key (server-only!)

3. **Set up Supabase Database**
   - Create a new Supabase project
   - Run migrations in order:
     ```bash
     # In Supabase SQL Editor, run:
     # 1. supabase/migrations/001_initial_schema.sql
     # 2. supabase/migrations/002_rls_policies.sql
     # 3. supabase/migrations/003_storage.sql
     ```
   - (Optional) Run seed data: `supabase/seed/seed.sql`

4. **Configure Storage Buckets**
   The migration creates these buckets automatically:
   - `events` - Event banners and galleries
   - `faculty` - Faculty profile images
   - `gallery` - Gallery images
   - `announcements` - Announcement images
   - `documents` - Curriculum PDFs, attachments

5. **Set up Admin Authentication**
   - In Supabase Auth, enable Email provider
   - Create admin user(s) through Supabase Dashboard
   - Or use the signup flow at `/auth/signup`

6. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
ionitix/
├── src/
│   ├── app/
│   │   ├── (public)/          # Public pages
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── about/
│   │   │   ├── academics/
│   │   │   ├── faculty/
│   │   │   ├── laboratories/
│   │   │   ├── events/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   ├── announcements/
│   │   │   ├── achievements/
│   │   │   ├── gallery/
│   │   │   └── contact/
│   │   ├── admin/             # Admin dashboard
│   │   │   ├── page.tsx
│   │   │   ├── events/
│   │   │   ├── announcements/
│   │   │   ├── faculty/
│   │   │   ├── laboratories/
│   │   │   ├── gallery/
│   │   │   ├── achievements/
│   │   │   └── registrations/
│   │   ├── api/               # API routes
│   │   ├── auth/              # Auth pages
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── providers.tsx
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── navbar/
│   │   ├── footer/
│   │   ├── events/
│   │   ├── announcements/
│   │   ├── faculty/
│   │   ├── gallery/
│   │   └── admin/
│   ├── lib/
│   │   ├── supabase/          # Supabase clients & queries
│   │   ├── validations/       # Zod schemas
│   │   ├── utils/             # Utility functions
│   │   └── constants/         # App constants
│   ├── hooks/                 # Custom React hooks
│   └── types/                 # TypeScript types
├── supabase/
│   ├── migrations/            # Database migrations
│   └── seed/                  # Seed data
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🗄 Database Schema

### Core Tables
- **events** - Event information with registration config
- **registrations** - Native registrations linked to events
- **announcements** - Department announcements
- **faculty** - Faculty profiles
- **laboratories** - Lab information
- **achievements** - Achievements and awards
- **gallery** - Image gallery with categories

### Key Features
- UUID primary keys
- Timestamps (created_at, updated_at)
- Foreign key relationships
- Comprehensive indexes
- Row Level Security policies

## 🔐 Security

- **Environment Variables** - Client-safe vs server-only clearly separated
- **Service Role Key** - Never exposed to client, used only in server actions
- **RLS Policies** - Database-level access control
- **Input Validation** - Zod schemas on all forms
- **File Upload Validation** - Type, size limits enforced
- **Authentication** - Supabase Auth with secure session handling

## 📝 Google Forms Integration

### Architecture
```
Admin creates event
    ↓
Selects "Google Form" registration type
    ↓
Pastes Google Form URL
    ↓
Publishes event
    ↓
Student visits event page
    ↓
Clicks "Register Now" → Opens Google Form
    ↓
Student submits → Google Sheets
```

### Configuration Options
- **Display Mode:** Button (opens in new tab) or Embedded (iframe)
- **Fallback:** If iframe blocked, shows "Open Registration Form" button
- **Per-Event:** Each event has its own Google Form/Sheet

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Import in Vercel**
3. **Add Environment Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   ```
4. **Deploy**

### Environment Variables for Production
- All variables from `.env.example`
- Ensure `NEXT_PUBLIC_SUPABASE_URL` uses production Supabase project
- Service role key must be kept secret

## 📋 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## 🎨 Customization

### Design Tokens
Edit `src/app/globals.css` for:
- Color palette (CSS variables)
- Typography (font families)
- Spacing scale
- Border radius
- Animations

### Branding
- Update `IONITIX` references throughout
- Replace logo in Navbar/Footer
- Modify colors in `globals.css`
- Update metadata in `layout.tsx`

### Content
All content managed through Admin Dashboard:
- Events, announcements, faculty, labs, achievements, gallery
- No hardcoded content in components

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## 📞 Support

For issues and feature requests, please open a GitHub issue.

For department-specific inquiries, contact: info@ionitix.edu