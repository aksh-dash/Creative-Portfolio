# 🎬 Creative Lenses — Official Portfolio & Launch Architecture

<p align="center">
  <strong>Akshat Dange • Commercial Photographer, Filmmaker & Visual Storyteller</strong><br />
  <em>Pune, Maharashtra, India • <a href="https://creativelylensed.com">creativelylensed.com</a></em>
</p>

---

## 1. Project Overview

**Creative Lenses** (`creativelylensed.com`) is the flagship commercial photography, cinematography, and creative media portfolio of Akshat Dange. The application showcases high-retention commercial films, viral short-form reels (4.5M+ top reel views), luxury editorial photography, brand identities, and an **Early Bird VIP Access** registration gateway for the upcoming Creative Lenses Store.

### Engineering Principles
- **Predictable & Scalable Architecture**: All components, layouts, pages, API handlers, and config tokens follow a strict, human-navigable folder structure.
- **Cinematic Dark Luxury Aesthetic**: High-contrast, minimal dark UI (`#080808` / `#0c0c10` with subtle crimson and gold accents) that lets visual media take center stage.
- **Enterprise-Grade Security**: Server-side rate limiting, bot honeypots, input sanitization, strict CORS, protected admin exports, and no client-side secret exposure.
- **Sub-Second Performance**: Static HTML pre-rendering, vendor code splitting (React vendor chunk separate from app code), responsive lazy loading, and priority hero preloading.

---

## 2. Technologies Used

- **Framework**: React 18.2 (Strict Mode, Component Error Boundaries)
- **Build System**: Vite 8.3 (with Rolldown engine, custom serverless dev plugin & SSR prerendering)
- **Styling**: Vanilla CSS3 with semantic design tokens, fluid clamp typography, and reduced-motion compliance
- **Backend / Serverless**: Vercel Serverless Functions (Node.js runtime in `/api/`)
- **Email Delivery**: Nodemailer (Gmail SMTP) with Resend API fallback and local outbox queue
- **SEO & Schema**: JSON-LD Structured Data (`Photographer`, `LocalBusiness`, `FAQPage`), static SSR pre-rendered HTML, canonical tags, Open Graph, and Twitter Cards

---

## 3. Installation Instructions

### Prerequisites
- **Node.js**: v18.0.0 or later (Node v20+ recommended)
- **npm**: v9.0.0 or later

```bash
# 1. Clone the repository
git clone https://github.com/aksh-dash/Creative-Portfolio.git

# 2. Enter project directory
cd "CREATIVE LENSES PORTFOLIO"

# 3. Install production and development dependencies
npm install

# 4. Create your local environment file
cp .env.example .env
```

---

## 4. Development Commands

```bash
# Start local development server with real-time API emulation
npm run dev
# Server opens at http://localhost:5173
```
*Note: In local development, the built-in Vite dev plugin automatically emulates `/api/waitlist` and `/api/contact` without needing external server processes.*

---

## 5. Production Build Commands

```bash
# Run full client build, SSR bundle, and static prerendering pipeline
npm run build

# Preview the finalized production build locally
npm run preview
```

### Build Pipeline Stages:
1. `vite build` — Compiles optimized client JavaScript & CSS into `dist/` with vendor chunk splitting.
2. `vite build --ssr src/prerender-entry.jsx --outDir dist-ssr` — Compiles SSR renderer.
3. `node scripts/prerender.js` — Renders static HTML for all core routes (`/`, `/store`, `/coming-soon`, `/thank-you`, `/success`, `/cancelled`, `/forbidden`, `/404`), generates `dist/404.html`, and removes intermediate artifacts.

---

## 6. Folder Structure Explanation

```
CREATIVE LENSES PORTFOLIO/
│
├── api/                             # Serverless backend functions (Vercel)
│   ├── contact.js                   # Secure contact form handler (rate limiting, honeypot)
│   ├── waitlist.js                  # Early Bird VIP registration API & protected export
│   └── templates/
│       └── earlyBirdEmail.js        # Responsive branded email templates (HTML & Text)
│
├── Public/                          # Static public assets (served at root /)
│   ├── assets/                      # Brand logos, hero portraits, venture banners
│   ├── photography/                 # High-resolution portfolio galleries (visdom, portraits)
│   ├── graphics/                    # Graphic design artworks and event posters
│   ├── videos/                      # Commercial videos, automotive cuts, reel edits
│   ├── email-templates/             # Standalone HTML email templates
│   ├── favicon.svg                  # Brand favicon
│   ├── robots.txt                   # Search crawler directives
│   └── sitemap.xml                  # Search engine XML sitemap
│
├── scripts/
│   └── prerender.js                 # Multi-route static pre-rendering build script
│
├── src/
│   ├── components/                  # Organized, modular React components
│   │   ├── common/                  # ErrorBoundary, EmptyState, GallerySkeleton, OfflineBanner, CookieBanner
│   │   ├── layout/                  # Navbar, CustomCursor, StickyMobileCTA, FirstVisitLoader
│   │   ├── modals/                  # ProjectModal, ThankYouModal, PrivacyPolicyModal, TermsModal
│   │   └── sections/                # Page sections (Hero, Showreel, Services, Projects, Photography, etc.)
│   │
│   ├── pages/                       # Full-page route views
│   │   ├── StoreComingSoonPage.jsx  # Iconic Eclipse Coming Soon & Early Bird registration
│   │   ├── NotFoundPage.jsx         # Custom branded 404 error page
│   │   ├── ThankYouPage.jsx         # Standalone inquiry confirmation page
│   │   ├── MaintenancePage.jsx      # Instant full-site maintenance view (VITE_MAINTENANCE)
│   │   ├── ForbiddenPage.jsx        # 403 Expired access page
│   │   ├── StoreSuccessPage.jsx     # Future Store payment success state
│   │   └── StoreCancelledPage.jsx   # Future Store payment cancellation state
│   │
│   ├── config/                      # Centralized configuration & constants
│   │   ├── routes.js                # Route paths and API endpoint constants
│   │   └── navigation.js            # Navbar links and footer navigation items
│   │
│   ├── content/                     # Copywriting and text content
│   │   └── status-pages.js          # Copy for 404, Thank You, FAQ, and status screens
│   │
│   ├── data/                        # Verified portfolio content & media records
│   │   └── portfolioData.js         # Personal info, services, projects, photo gallery, skills
│   │
│   ├── hooks/
│   │   └── useReveal.js             # Native IntersectionObserver scroll animation hook
│   │
│   ├── styles/                      # Modular CSS stylesheets matching component structure
│   │   ├── index.css                # Global design tokens, typography, and base CSS
│   │   ├── Hero.css                 # Hero section styling & 3D parallax layers
│   │   ├── StoreComingSoon.css      # Eclipse glowing stage & VIP pill input styling
│   │   └── ...                      # Section-specific styles
│   │
│   ├── utils/
│   │   └── securityPatch.js         # Client-side media asset protection (right-click, drag)
│   │
│   ├── App.jsx                      # Main application routing and section composer
│   ├── main.jsx                     # Client hydration & root rendering entry point
│   └── prerender-entry.jsx          # SSR server rendering entry point
│
├── .env.example                     # Environment variable blueprint with explanations
├── vercel.json                      # Vercel routing, security headers & caching policies
├── vite.config.js                   # Vite configuration with chunk splitting & dev plugin
└── package.json                     # Cleaned production dependencies
```

---

## 7. Where Each Functionality Lives

| Functionality | Primary Location |
|---|---|
| **Early Bird VIP Registration** | Form: `src/pages/StoreComingSoonPage.jsx`<br>Backend: `api/waitlist.js`<br>Email: `api/templates/earlyBirdEmail.js` |
| **Contact Inquiries** | Form: `src/components/sections/Contact.jsx`<br>Backend: `api/contact.js` |
| **Portfolio Projects & Media** | `src/data/portfolioData.js` (`projects` array) |
| **Photography Portfolio** | `src/data/portfolioData.js` (`photographyGallery` array) |
| **Services Offered** | `src/data/portfolioData.js` (`services` array) |
| **Status Page Copy (404, FAQ, etc.)** | `src/content/status-pages.js` |
| **Navigation Links** | `src/config/navigation.js` |
| **Security Headers & Caching** | `vercel.json` |
| **Maintenance Mode Switch** | Set `VITE_MAINTENANCE=true` in `.env` or Vercel dashboard |

---

## 8. How to Add a New Portfolio Project

1. Open `src/data/portfolioData.js`.
2. Locate the `projects` array.
3. Add a new project object following this schema:
```javascript
{
    id: "my-brand-film",
    num: "07",
    title: "Brand Name Commercial",
    category: "Commercial & Lifestyle",
    type: "Cinematography & Color Grading",
    coverImage: "/assets/your-cover-image.png",
    mediaType: "video",
    description: "High-retention commercial film for Brand Name.",
    items: [
        { id: 1, title: "Cut 01", src: "/videos/your-project/clip-1.mp4", type: "video" },
        { id: 2, title: "Cut 02", src: "/videos/your-project/clip-2.mp4", type: "video" }
    ]
}
```
4. Place your media files in `Public/videos/your-project/` or `Public/assets/`.
5. Run `npm run build` to verify.

---

## 9. How to Add or Modify a Page

1. **Create Page Component**: Add your new component in `src/pages/MyNewPage.jsx`.
2. **Register Route Constant**: Open `src/config/routes.js` and add `MY_PAGE: '/my-page'`.
3. **Connect in App.jsx**: Import `MyNewPage` and add the route check in `src/App.jsx`.
4. **Register in Prerender Script**: Add the route in `scripts/prerender.js` to enable static SSR pre-rendering.
5. **Add Vercel Rewrite**: In `vercel.json`, add `{ "source": "/my-page", "destination": "/index.html" }`.

---

## 10. How to Update Navigation

- **Navbar Links**: Open `src/config/navigation.js` and update `NAV_LINKS`. Each `to` matches an in-page section `id` (e.g. `showreel`, `projects`, `photography`, `contact`).
- **Footer Links**: Update `FOOTER_LINKS` in `src/config/navigation.js`.

---

## 11. How to Modify Global Styles and Design Tokens

All global colors, typography, and theme tokens are defined in `src/styles/index.css`:
```css
:root {
    --accent: #ffffff;
    --black: #080808;
    --white: #f5f5f5;
    --gray: #9a9a9a;
    --surface: #141414;
    --border: rgba(255, 255, 255, 0.08);

    --font-display: 'Plus Jakarta Sans', sans-serif;
    --font-sans: 'Inter', sans-serif;
    --font-mono: 'DM Mono', monospace;
}
```
Modify these variables to adjust spacing, font families, or color tokens site-wide.

---

## 12. How to Update Images and Assets

- Place new images in `Public/photography/photography/` or `Public/assets/`.
- To add a photograph to the Still Photography Gallery, add an entry to `photographyGallery` in `src/data/portfolioData.js`:
```javascript
{ 
    id: 15, 
    title: "New Editorial Shot", 
    category: "Portrait", 
    src: "/photography/photography/new-shot.jpg" 
}
```
*Note: Available filter categories: `Portrait`, `Product`, `Street`, `Nature`, `Urban`, `Event`.*

---

## 13. How to Modify Contact Form Functionality

- **Frontend Component**: `src/components/sections/Contact.jsx`
  - Validates name, email, phone, and project message.
  - Automatically prefills inquiry text when a visitor clicks a service tag.
  - Submits to `/api/contact` via POST and falls back seamlessly to direct WhatsApp messaging (`+91 8482872105`).
- **Backend Function**: `api/contact.js`
  - Validates payload length, executes bot honeypot filtering, and limits requests per IP.
  - Dispatches an email notification to the owner (`GMAIL_USER`) and an automated acknowledgment to the client via Nodemailer.

---

## 14. How to Modify Early Bird Signup Functionality

- **Frontend Component**: `src/pages/StoreComingSoonPage.jsx`
  - Minimalist Eclipse visual stage matching the reference mockup.
  - Collects `Name` and `Email` with explicit consent agreement.
  - Submits to `/api/waitlist`.
  - Displays instant VIP Spot confirmation without storing sensitive personal data in `localStorage`.
- **Backend Handler**: `api/waitlist.js`
  - Validates name and email length.
  - Checks for duplicate emails (returns existing spot gracefully without inflating numbers).
  - Rate-limited to 5 submissions per 10 minutes per IP.
  - Honeypot bot protection.
  - Optional Google Sheets webhook integration (`GOOGLE_SHEET_URL`).

---

## 15. How to Modify Email Templates

Email templates are decoupled from API logic:
- **Location**: `api/templates/earlyBirdEmail.js`
- **Functions**:
  - `generateEarlyBirdEmail({ name, email, spotNumber })`: Generates the confirmation email sent to VIP subscribers.
  - `generateOwnerNotification({ name, email, spotNumber, totalSubscribers, ip })`: Generates the owner alert email.
- Both functions return `{ subject, text, html }`. You can edit the HTML structure, colors, or copy directly.

---

## 16. Environment Variable Documentation

Copy `.env.example` to `.env` and fill in the values:

| Variable | Scope | Description |
|---|---|---|
| `VITE_SITE_URL` | Public (Client) | Canonical website URL (e.g. `https://creativelylensed.com`) |
| `VITE_STORE_URL` | Public (Client) | Internal store route (`/store`) |
| `VITE_MAINTENANCE` | Public (Client) | Set to `true` to activate full-screen maintenance mode |
| `GMAIL_USER` | Serverless (Private) | Gmail address used to dispatch confirmation emails (`creativelensesstore@gmail.com`) |
| `GMAIL_APP_PASSWORD` | Serverless (Private) | 16-character Google App Password (from Google Account ➔ Security ➔ App Passwords) |
| `RECIPIENT_EMAIL` | Serverless (Private) | Inbox where inquiry notifications are sent |
| `RESEND_API_KEY` | Serverless (Private) | (Optional) Resend API key for alternative email delivery |
| `ADMIN_SECRET_KEY` | Serverless (Private) | Secret key required to access waitlist export (`/api/waitlist?export=csv&key=YOUR_SECRET`) |
| `GOOGLE_SHEET_URL` | Serverless (Private) | (Optional) Google Apps Script Webhook URL for Google Sheets backup sync |

*Never commit `.env` to Git. Private credentials should be set in the Vercel Project Settings dashboard.*

---

## 17. Vercel Deployment Instructions

1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/):
   - Click **Add New Project** ➔ Select your repository.
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. In **Environment Variables**, add:
   - `GMAIL_USER`: `creativelensesstore@gmail.com`
   - `GMAIL_APP_PASSWORD`: `your-16-char-app-password`
   - `ADMIN_SECRET_KEY`: `your-chosen-admin-secret`
4. Click **Deploy**. Vercel will build the application, execute SSR static prerendering, and deploy serverless functions in `/api/`.

---

## 18. Troubleshooting Common Problems

### Problem: Confirmation emails are not sending
1. Verify `GMAIL_APP_PASSWORD` is set in Vercel Environment Variables.
2. Ensure 2-Step Verification is enabled on the Google Account.
3. Remove any spaces in the 16-character App Password.
4. Check `data/outbox.json` locally — if credentials are missing, submissions are queued there for inspection.

### Problem: 404 on page refresh in production
- `vercel.json` contains explicit rewrite rules directing all valid routes to `/index.html`. Unknown routes automatically fall through to `dist/404.html` with an HTTP 404 status.

### Problem: DevTools inspection shows security shield
- `src/utils/securityPatch.js` protects media assets. In local development (`import.meta.env.DEV`), security shields are disabled automatically so you can inspect and debug without restriction.

---

*Architected with precision for Akshat Dange • Creatively Lensed.*
