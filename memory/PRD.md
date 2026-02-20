# PRD - Barrister Mahbubul Alam Salehi Portfolio Website

## Original Problem Statement
Redesign https://mahbubsalehi.com/ with modern and classic style. Full Bengali language, all pages included. Then add admin panel for CMS-style post management.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn UI components
- **Backend**: FastAPI + MongoDB (Motor async) + JWT Auth
- **Design System**: Forest Green (#064e3b) + Gold (#d97706) palette, Noto Serif Bengali + Hind Siliguri fonts

## User Personas
1. **উলিপুর/কুড়িগ্রাম Constituents** - Bengali-speaking voters
2. **প্রবাসী (Diaspora)** - Bangladeshi expatriates
3. **মিডিয়া (Media)** - Journalists seeking bio, vision, activities
4. **অ্যাডমিন (Admin)** - Website administrator managing posts

## What's Been Implemented (Feb 2026)
### Phase 1 - Website Redesign
- [x] Home page with hero slider, about, vision preview, quote, activities
- [x] Biography page with timeline, education, career history
- [x] Vision page with 8 development plans + downloadable PDF
- [x] Activities page fetching from MongoDB API
- [x] Contact page with working form
- [x] Responsive glassmorphism navbar + dark footer
- [x] Bengali Google Fonts + Gold accent design system

### Phase 2 - Admin Panel
- [x] Admin login (JWT auth): /admin route
- [x] Admin dashboard: /admin/dashboard
- [x] Activities CRUD (Create, Read, Update, Delete)
- [x] Toggle publish/unpublish
- [x] Image preview in post form
- [x] Contact messages management
- [x] Activities fetched dynamically from MongoDB (Home + Activities page)
- [x] Seed data: 5 initial activities + default admin (admin/admin123)
- [x] All tests passing (100% backend + 100% frontend)

## API Endpoints
- POST /api/admin/login - Admin authentication
- GET /api/activities - Public list (published only)
- POST /api/activities - Create (auth required)
- PUT /api/activities/{id} - Update (auth required)
- DELETE /api/activities/{id} - Delete (auth required)
- POST /api/contact - Public contact form
- GET /api/admin/contacts - List messages (auth required)
- DELETE /api/admin/contacts/{id} - Delete message (auth required)

## Admin Credentials
- Username: admin
- Password: admin123

## Prioritized Backlog
### P1
- Rich text editor for post content
- Image upload (local or cloud storage)
- Admin password change
- Photo/video gallery section

### P2
- Multi-language (English toggle)
- Newsletter/email subscription
- Event calendar
- Search functionality
- SEO meta tags
- Analytics integration
