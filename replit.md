# Celma Construções Store

An e-commerce platform for construction materials, migrated from Vercel to Replit.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
app/
  layout.tsx          — Root layout (Header, Footer, Cart, Support)
  page.tsx            — Home page (delegates to HomePageContent)
  globals.css         — Global styles + keyframes

components/
  layout/
    header.tsx        — Sticky top nav with search and cart
    footer.tsx        — Full footer with links and payment info
    category-sidebar.tsx  — Left sidebar with department icons + filtering
  home/
    home-page-content.tsx  — Client wrapper managing category filter state
    offers-section.tsx     — Hero offer + secondary offers strip
    product-grid.tsx       — Product catalog grid with inline quantity controls
    product-image.tsx      — Category-specific gradient placeholder (DB-ready)
    mobile-category-bar.tsx — Horizontal scrollable category bar (mobile)
    brands-carousel.tsx    — Animated brand marquee
    served-cities.tsx      — Delivery coverage section
  cart/
    cart-drawer.tsx        — Slide-out cart drawer
  support/
    support-widget.tsx     — Floating chat widget
  ui/
    badge.tsx / button.tsx / input.tsx / sheet.tsx

store/
  cart-store.tsx      — Zustand cart state + CartProvider context
constants.ts          — Product, Category, Brand, City data + type definitions
lib/utils.ts          — Utility functions (formatCurrencyBRL, etc.)
```

## Key Features

- **Department sidebar** — Icon-based category nav on the left; filters the product grid live
- **Mobile category bar** — Horizontal scrollable pill bar on small screens
- **Product image placeholders** — Category-colored gradients with Lucide icons; ready to swap for DB images
- **Inline quantity controls** — Cart quantity +/- on the product card after first add
- **Stock badges** — "Últimas unidades" (low) / "Sem estoque" (out) indicators
- **Search** — Debounced client-side product search with dropdown results

## Running the App

```
npm run dev    # starts on port 5000 at 0.0.0.0
```

Managed by the "Start application" workflow.

## Integration Points (TODO)

All placeholder data in `constants.ts` is typed and ready for DB integration:
- `Product.imageUrl` — optional, falls back to `ProductImagePlaceholder` component
- `Product.categoryId` — links to `CATEGORIES` for filtering and styling
- `Product.unit` / `Product.stock` — ready fields for inventory system
- Cart "Finalizar compra" → checkout flow (not yet implemented)
- Support chat widget → real-time messaging integration

## Replit Configuration

- Port: `5000` (webview requirement)
- Host: `0.0.0.0` (required for proxied preview)
- Next.js upgraded to `^14.2.30` (security patch)
