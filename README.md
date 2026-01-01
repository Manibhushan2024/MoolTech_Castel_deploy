# CastleElevator - Production-Ready Next.js Website

A complete, full-stack elevator service company website built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Development
```bash
cd C:\Users\dell\Desktop\Mani_work\castleelevator
npm run dev
```
Open http://localhost:3000

### Production Build
```bash
npm run build
npm run start
```

##  What''s Included

### Pages (11 Total)
- **Home** (/) - Hero, services, products, trust section, testimonials
- **About** (/about) - Company story, stats, values
- **Products** (/products) - Product hub with links to details
- **Product Detail** (/products/[slug]) - Dynamic product pages with FAQ
- **Services** (/services) - Service hub with links to details
- **Service Detail** (/services/[slug]) - Dynamic with process steps + FAQ
- **Projects** (/projects) - Project gallery
- **Service Areas** (/service-areas) - Service coverage locations
- **Contact** (/contact) - Form with voice recorder
- **API** (/api/enquiry) - Form submission endpoint
- **404** (/not-found) - Custom error page

### Components
- **ThemeProvider** - Dark/light mode with localStorage
- **Header** - Sticky navigation + contact bar
- **Footer** - Links and contact info
- **MobileStickyBar** - Mobile-only call/enquiry buttons
- **VoiceRecorder** - Voice note capture + fallback upload
- **ThemeToggle** - Theme switcher button

### Features
 Dark/Light mode (persists to localStorage)  
 Mobile responsive design  
 Contact form with validation  
 Voice note recorder (60 sec limit)  
 Dynamic content from JSON  
 SEO-ready metadata  
 Sticky header with 24/7 contact  
 Mobile sticky bottom bar  
 FAQ sections on all service/product pages  
 Process steps visualization  
 TypeScript with full type safety  

##  Project Structure

```
castleelevator/
 src/
    app/                    # Next.js App Router
       page.tsx           # Home
       about/page.tsx      # About
       products/           # Product hub + detail
       services/           # Service hub + detail
       projects/page.tsx   # Projects
       service-areas/      # Service areas
       contact/page.tsx    # Contact form
       api/enquiry/        # API endpoint
       layout.tsx          # Root layout
   
    components/             # React components
       Header.tsx
       Footer.tsx
       ThemeProvider.tsx
       ThemeToggle.tsx
       MobileStickyBar.tsx
       VoiceRecorder.tsx
   
    lib/
        content.ts          # Utilities
        products.json       # 3 products
        services.json       # 3 services
        projects.json       # 4 projects
        testimonials.json   # 4 reviews
        service_areas.json  # 6 locations

 public/images/              # Image directories (empty)
 PROJECT_SETUP.md            # Detailed setup guide
 FILE_TREE.md                # Complete file tree
 IMAGE_MIGRATION.md          # How to add images
 SUMMARY.txt                 # Executive summary
```

##  Contact Information

- **Phone:** +91 8285266082 (hardcoded in components)
- **Email:** support@castelelevator.com (hardcoded in components)
- **Domain:** castelelevator.com

To update: Find and replace in:
- src/components/Header.tsx
- src/components/Footer.tsx
- src/app/contact/page.tsx

##  Styling

- **Framework:** Tailwind CSS 4.x
- **Dark Mode:** Class-based (html.dark)
- **Primary Color:** #0066cc (Blue)
- **Accent Color:** #ff6600 (Orange)
- **Responsive:** Mobile-first design

##  Configuration

- **Framework:** Next.js 16.1.1 (Turbopack)
- **Language:** TypeScript
- **Linter:** ESLint
- **Node:** 18+ required
- **npm:** 9+ required

##  Build Status

 Build: Successful  
 TypeScript: No errors  
 Pages: Pre-rendered & Dynamic  
 Mobile: Responsive  
 Accessibility: Semantic HTML  

##  Form Submission

The contact form at `/contact` currently:
- Logs enquiries to console.log()
- Returns success JSON response
- Accepts voice file uploads (not stored)

**Phase 2 Enhancement:**
- Connect to email service (SendGrid, Nodemailer)
- Setup database (MongoDB, PostgreSQL)
- Implement file storage (AWS S3, Cloudinary)

##  Images Setup

Empty image directories ready:
- `/public/images/home/`
- `/public/images/services/`
- `/public/images/projects/`
- `/public/images/about/`
- `/public/images/testimonials/`
- `/public/images/office/`

**To add images:**
1. Copy images from your existing folders
2. Update imagePath in JSON files
3. See IMAGE_MIGRATION.md for detailed steps

##  Mobile Features

- Sticky bottom bar with Call & Enquiry buttons
- Touch-optimized forms
- Responsive navigation
- Mobile-first Tailwind classes
- Voice recorder with file upload fallback

##  Theme Persistence

Dark/Light mode preference is:
- Stored in: `localStorage.theme`
- Default: System preference (`prefers-color-scheme`)
- Applied via: `html.dark` class
- All colors: Tailwind `dark:` utilities

Clear preference: `localStorage.removeItem('theme')`

##  Next Steps

1. **Add Images** (See IMAGE_MIGRATION.md)
2. **Customize Content** (Edit JSON files)
3. **Setup Email Backend** (Phase 2)
4. **Add Analytics** (Google Analytics, etc.)
5. **Deploy** (Vercel recommended)

##  Deployment

### Vercel (Recommended)
```bash
git push
# Auto-deploys from GitHub
```

### Self-Hosted (Node.js)
```bash
npm run build
npm run start
```

### Docker
```bash
docker build -t castleelevator .
docker run -p 3000:3000 castleelevator
```

##  Documentation

- `PROJECT_SETUP.md` - Detailed setup and configuration
- `FILE_TREE.md` - Complete file structure and descriptions
- `IMAGE_MIGRATION.md` - How to add your own images
- `SUMMARY.txt` - Executive project summary

##  Key Files to Modify

**Content:**
- src/lib/products.json
- src/lib/services.json
- src/lib/projects.json
- src/lib/testimonials.json
- src/lib/service_areas.json

**Contact Details:**
- src/components/Header.tsx (line with +91 number)
- src/components/Footer.tsx (email/phone)
- src/app/contact/page.tsx (form links)

**Styling:**
- tailwind.config.ts (colors, fonts)
- src/app/globals.css (global styles)

##  Features Breakdown

### Header
- Sticky top bar with 24/7 Emergency Support
- Call link (tel: protocol)
- Email link (mailto: protocol)
- Dark/light mode toggle
- Navigation with dropdowns
- Mobile menu button ready

### Home Page
- Full-height hero section
- CTA buttons (Call Now, Request Service)
- Services grid (3 cards from JSON)
- Products grid (3 cards from JSON)
- Trust section (4 stat blocks)
- Testimonials (4 reviews scrollable)
- Final CTA section

### Product/Service Detail Pages
- Full description
- Feature/inclusion bullets
- FAQ accordion sections
- Call-to-action buttons
- SEO metadata

### Contact Form
- Full Name, Phone, Email fields
- Service Area dropdown
- Address/Landmark input
- Request Type dropdown
- Product Type dropdown
- Description textarea
- Voice note recorder (60s limit)
- Consent checkbox
- Form validation
- Success/error messages

### Mobile Sticky Bar
- Only visible on mobile (md:hidden)
- Call button (tel: link)
- Enquiry button (smooth scroll)
- Always visible at bottom

##  Troubleshooting

**Build fails?**
```bash
npm install
npm run build
```

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**Dark mode not working?**
```bash
# Clear localStorage
localStorage.removeItem('theme')
# Refresh page
```

**Form not submitting?**
- Check browser console for errors
- Verify /api/enquiry endpoint exists
- Check form field names match API

**Voice recorder not working?**
- Check browser microphone permissions
- Fallback to file upload should work
- Supported: .mp3, .wav, .webm

##  Support

For issues or questions:
1. Check documentation files
2. Review code comments
3. Check browser console
4. Review Next.js docs (nextjs.org)

---

**Project Status:**  Production-Ready  
**Last Updated:** January 2025  
**Version:** 1.0  
**License:** MIT (or your chosen license)