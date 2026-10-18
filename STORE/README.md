# Creatively Lensed Store — Digital Wallpaper Storefront

Frontend-only digital wallpaper store for **Creatively Lensed** (Akshat Dange, Pune, Maharashtra).
Built with Vite, React, React Router, and clean Vanilla CSS design system.

## IMPORTANT ASSET PROTECTION & SECURITY NOTICE
> [!IMPORTANT]
> **PAID ASSET ISOLATION ARCHITECTURE:**
> Full-resolution, unwatermarked digital wallpaper assets (5K, 6K, and mobile retina files) **MUST NEVER** be stored in the public repository or exposed under the `/public` directory.
> 
> - All assets inside `public/previews/` are strictly **watermarked, compressed, low-resolution preview files** (max 1200px width/height, WebP, optimized).
> - Full-resolution paid downloads are stored in **secure private cloud storage** (e.g., AWS S3 / Cloudflare R2 with signed expiring URLs), which will be connected in Phase 2 via the secure backend checkout webhook flow.

## Architecture
- `src/data/products.json`: Canonical product catalog data (pricing in USD and INR, device support, includes lists, preview paths).
- `src/lib/api.js`: Unified API boundary layer. All component UI consumes data exclusively through this module (`getProducts()`, `getProduct(slug)`, `startCheckout(productId)`, `getMyDownloads()`).
- `src/context/`: Theme, cart/checkout state, currency selector (USD / INR).
- `src/pages/`: Modular page routes (`Home`, `Shop`, `ProductDetail`, `Success`, `Cancelled`, `Downloads`, `FAQ`, `License`, `RefundPolicy`, `Privacy`, `Terms`, `Contact`, `NotFound`).

## Environment Configuration
See `.env.example`:
- `VITE_SITE_URL`: Base domain URL for absolute canonical and OG links.
- `VITE_PORTFOLIO_URL`: External URL pointing back to Akshat Dange's portfolio.
- `VITE_CONTACT_EMAIL`: Customer support contact address.
