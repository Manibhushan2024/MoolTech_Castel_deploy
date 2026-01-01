════════════════════════════════════
  CASTLEELEVATOR - COMPLETE PROJECT FILE TREE
═════════════════

castleelevator/

 .gitignore
 .eslintrc.json
 package.json
 package-lock.json
 tsconfig.json
 next.config.ts
 tailwind.config.ts
 postcss.config.mjs
 PROJECT_SETUP.md           READ THIS FIRST!
 IMAGE_MIGRATION.md          Image setup guide
 SUMMARY.txt                 Executive summary

 public/
    images/
       home/              (placeholder structure)
       services/          (placeholder structure)
       projects/          (placeholder structure)
       about/             (placeholder structure)
       testimonials/      (placeholder structure)
       office/            (placeholder structure)
    next.svg
    vercel.svg
    globe.svg
    window.svg
    file.svg

 src/
    app/
       layout.tsx              (Root layout with ThemeProvider)
       page.tsx                (Home page - hero, services, products, testimonials)
       globals.css             (Tailwind directives)
       favicon.ico
       not-found.tsx           (404 page)
      
       about/
          page.tsx            (About company page)
      
       products/
          page.tsx            (Products hub - lists all products)
          [slug]/
              page.tsx        (Product detail page template - dynamic)
      
       services/
          page.tsx            (Services hub - lists all services)
          [slug]/
              page.tsx        (Service detail page - process steps + FAQ)
      
       projects/
          page.tsx            (Project gallery page)
      
       service-areas/
          page.tsx            (Service locations page)
      
       contact/
          page.tsx            (Contact form + voice recorder)
      
       api/
           enquiry/
               route.ts        (POST endpoint for form submissions)
   
    components/
       ThemeProvider.tsx       (Dark/light mode context - client)
       ThemeToggle.tsx         (Theme toggle button - client)
       Header.tsx              (Navigation + sticky header - client)
       Footer.tsx              (Footer component - server)
       MobileStickyBar.tsx     (Mobile bottom bar - client)
       VoiceRecorder.tsx       (Voice recorder UI - client)
   
    lib/
        content.ts              (Type-safe JSON loading utilities)
        products.json           (3 products: passenger, freight, home)
        services.json           (3 services: installation, maintenance, modernization)
        projects.json           (4 projects: tech tower, residency, mall, gardens)
        testimonials.json       (4 client reviews)
        service_areas.json      (6 service locations)

 .next/                          (Build output - auto-generated)
     (compiled files and optimized assets)


  KEY STATISTICS


PAGES:           11 (7 public pages + 1 404 + 1 API route + 2 dynamic templates)
COMPONENTS:      6 React components
JSON FILES:      5 content files
TOTAL ROUTES:    20+ with dynamic routing

CODE FILES:
  - React/TypeScript: 17 files
  - JSON: 5 files
  - CSS: 1 file
  - Config: 6 files

DEPENDENCIES:
  - Next.js: 16.1.1
  - React: 19.x
  - TypeScript: 5.x
  - Tailwind CSS: 4.x


  FILE DESCRIPTIONS


CORE PAGES:
  page.tsx (home)
    - Hero section with CTA buttons
    - Services grid (maps from services.json)
    - Products grid (maps from products.json)
    - Trust/Stats section (4 cards)
    - Testimonials section (4 reviews)
    - Final CTA section

DETAIL PAGES (Dynamic):
  products/[slug]/page.tsx
    - Product name, description, features
    - Feature bullets
    - FAQ accordion
    - Call-to-action button

  services/[slug]/page.tsx
    - Service description
    - Inclusions list
    - 5-step process timeline
    - FAQ accordion
    - Request button

COMPONENTS:
  Header.tsx (sticky, client-rendered)
    - Sticky top contact bar (24/7 Support, phone, email, theme toggle)
    - Main navigation (Home, About, Products dropdown, Services dropdown, Projects, Contact)
    - Logo and branding
    - Mobile menu button (ready for implementation)

  Footer.tsx (server-rendered)
    - 4-column grid (About, Quick Links, Services, Contact)
    - Copyright notice
    - All internal links

  ThemeProvider.tsx (client context)
    - Manages dark/light mode
    - Persists preference to localStorage
    - Detects system preference
    - Applies dark class to html element

  ThemeToggle.tsx (client button)
    - Sun icon (light mode)
    - Moon icon (dark mode)
    - Smooth transition

  MobileStickyBar.tsx (mobile-only)
    - Bottom sticky bar (md: hidden)
    - Call button (tel: link)
    - Enquiry button (scrolls to form)
    - Responsive layout

  VoiceRecorder.tsx (voice capture)
    - Start/Stop buttons
    - 60-second timer
    - Audio preview
    - Delete option
    - Fallback file upload

API ENDPOINT:
  /api/enquiry (POST)
    - Accepts FormData with form fields
    - Optional voice file upload
    - Returns JSON success/error
    - Logs to console (Phase 2: DB storage)

JSON FILES:
  products.json
    - 3 products with specs
    - Each has: slug, name, description, bullets, FAQ

  services.json
    - 3 services with process
    - Each has: slug, name, inclusions, steps, FAQ

  projects.json
    - 4 completed projects
    - Each has: title, location, type, description

  testimonials.json
    - 4 client reviews
    - Each has: name, location, building type, review

  service_areas.json
    - 6 service regions
    - Each has: name, description

UTILITIES:
  content.ts
    - Type definitions for all JSON structures
    - Functions to load and retrieve data
    - getProducts(), getServices(), getProjects(), etc.
    - getProductBySlug(), getServiceBySlug() for detail pages


  DATA FLOW


Page Load:
  1. Browser requests /
  2. Next.js serves index from .next/ (prerendered)
  3. ThemeProvider wraps page
  4. Header component mounts (client-side)
  5. Footer and MobileStickyBar render
  6. Dynamic content from JSON loaded server-side

Form Submission:
  1. User fills contact form
  2. Optional voice recording captured
  3. Form submitted via fetch to /api/enquiry
  4. API receives FormData
  5. Server logs enquiry
  6. Returns success/error JSON
  7. UI shows confirmation message

Theme Toggle:
  1. User clicks theme button
  2. ThemeContext updates
  3. HTML element gets dark class
  4. Tailwind CSS applies dark: styles
  5. Preference saved to localStorage
  6. Persists across page reloads

Dynamic Routing:
  1. User clicks product link
  2. Next.js routes to /products/passenger-elevators
  3. Route params extracted: { slug: "passenger-elevators" }
  4. getProductBySlug("passenger-elevators") called
  5. Product data loaded from JSON
  6. Template renders with data
  7. SEO metadata generated


  ENVIRONMENT SETUP


Installed Globally:
  - Node.js 18+ (required)
  - npm 9+ (included with Node.js)

Project Dependencies:
  - next@16.1.1
  - react@19.x
  - react-dom@19.x
  - typescript@5.x
  - tailwindcss@4.x
  - @tailwindcss/postcss
  - postcss

Development Dependencies:
  - @types/node
  - @types/react
  - @types/react-dom
  - @typescript-eslint/eslint-plugin
  - @typescript-eslint/parser
  - eslint
  - eslint-config-next


  DEPLOYMENT READY


For Vercel (Recommended):
  1. Push repo to GitHub
  2. Connect to Vercel dashboard
  3. Vercel auto-detects Next.js
  4. Deploy with zero config
  5. Automatic SSL certificate
  6. CDN globally distributed

For Self-Hosted:
  1. Run: npm run build
  2. Creates .next folder
  3. Run: npm run start
  4. Production server on port 3000
  5. Requires Node.js 18+

For Docker:
  - Create Dockerfile with Node.js 18
  - Copy package.json
  - Run npm ci && npm run build
  - Start with npm start
  - Listen on port 3000


  QUICK REFERENCE


START DEVELOPMENT:
  cd castleelevator
  npm run dev
  Open: http://localhost:3000

BUILD FOR PRODUCTION:
  npm run build
  npm run start

LINTING:
  npm run lint

ADD NEW PRODUCT:
  1. Add entry to src/lib/products.json
  2. Include slug (URL-safe)
  3. Auto-generates detail page

ADD NEW SERVICE:
  1. Add entry to src/lib/services.json
  2. Include process steps and FAQ
  3. Detail page auto-generated

ADD TESTIMONIAL:
  1. Add entry to src/lib/testimonials.json
  2. Updates home page automatically

UPDATE CONTACT:
  1. Find all occurrences of "+91 8285266082"
  2. Replace with new number
  3. Update in: Header, Footer, contact page

UPDATE COMPANY EMAIL:
  1. Find "support@castelelevator.com"
  2. Replace with new email
  3. Updates in: Header, Footer, contact page

