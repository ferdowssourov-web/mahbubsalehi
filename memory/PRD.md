# PRD - Barrister Mahbubul Alam Salehi Portfolio Website

## Original Problem Statement
Redesign https://mahbubsalehi.com/ with modern and classic style. Full Bengali language, all pages. Admin panel for CMS-style post management with image upload.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn UI components
- **Backend**: FastAPI + MongoDB (Motor async) + JWT Auth + File Upload
- **Design System**: Forest Green (#064e3b) + Gold (#d97706), Noto Serif Bengali + Hind Siliguri

## What's Been Implemented (Feb 2026)

### Phase 1 - Website Redesign
- [x] Home page with hero slider, about, vision preview, quote, activities
- [x] Biography page with timeline, education, career history
- [x] Vision page with 8 development plans + PDF download
- [x] Contact page with working form (MongoDB storage)
- [x] Responsive glassmorphism navbar + dark footer

### Phase 2 - Admin Panel
- [x] Admin login (JWT auth) at /admin
- [x] Activities CRUD (Create, Read, Update, Delete)
- [x] Toggle publish/unpublish + contact messages management
- [x] Activities fetched dynamically from MongoDB

### Phase 3 - Detail Pages + Image Upload
- [x] Activity detail page at /activities/:id with full content, image, breadcrumbs
- [x] Related posts section ("আরো কার্যক্রম") on detail pages
- [x] Share button on detail pages
- [x] Professional drag-and-drop image uploader in admin
- [x] URL-based image option as alternative
- [x] Image preview with change/remove overlay
- [x] Backend file upload at POST /api/upload
- [x] Static file serving at /api/uploads/
- [x] All clickable activity cards (home + activities page)
- [x] All tests passing (100% backend + 100% frontend)

## Admin Credentials
- Username: admin | Password: admin123

## Backlog
### P1: Rich text editor, admin password change, photo gallery section
### P2: Multi-language, newsletter, event calendar, SEO meta tags, analytics
