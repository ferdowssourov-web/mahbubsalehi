# PRD - Barrister Mahbubul Alam Salehi Portfolio Website

## Original Problem Statement
Redesign https://mahbubsalehi.com/ with modern and classic style. Full Bengali language, all pages included.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn UI components
- **Backend**: FastAPI + MongoDB (Motor async)
- **Design System**: Forest Green (#064e3b) + Gold (#d97706) palette, Noto Serif Bengali + Hind Siliguri fonts

## User Personas
1. **উলিপুর/কুড়িগ্রাম Constituents** - Bengali-speaking voters seeking information about the candidate
2. **প্রবাসী (Diaspora)** - Bangladeshi expatriates following political developments
3. **মিডিয়া (Media)** - Journalists seeking biography, vision, and activity updates
4. **সমর্থক (Supporters)** - Party supporters engaging with activities and vision

## Core Requirements (Static)
- Full Bengali language throughout
- Modern + Classic statesman aesthetic
- 5 pages: Home, Biography, Vision, Activities, Contact
- Contact form with MongoDB storage
- Responsive design
- Micro-animations and hover effects

## What's Been Implemented (Feb 2026)
- [x] Home page with hero slider, about section, vision preview, quote section, activities section
- [x] Biography page with full bio, education timeline, career history
- [x] Vision page with 8 development plan items and downloadable PDF link
- [x] Activities page with news/blog cards
- [x] Contact page with working form (POST /api/contact)
- [x] Glassmorphism navbar with mobile responsive menu
- [x] Dark forest-deep footer with 4-column layout
- [x] Gold accent design system throughout
- [x] Bengali Google Fonts (Noto Serif Bengali + Hind Siliguri)
- [x] All content in Bengali language
- [x] Backend contact form API
- [x] All tests passing (100% backend, 95% frontend)

## Prioritized Backlog
### P0 (Done)
- All 5 pages implemented and functional
- Contact form with backend API
- Responsive navigation

### P1 (Next)
- Admin panel for managing activities/news
- Photo/Video gallery section
- Social media feed integration

### P2 (Future)
- Multi-language support (English toggle)
- Newsletter/email subscription
- Event calendar
- Search functionality
- SEO optimization
- Analytics integration

## Next Tasks
1. Add photo gallery section
2. Admin CRUD for activities management
3. Social media links integration (Facebook, YouTube)
4. SEO meta tags for Bengali content
