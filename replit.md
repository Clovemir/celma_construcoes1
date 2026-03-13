# Celma Construções Store

An e-commerce platform for construction materials, migrated from Vercel to Replit.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Replit built-in) via `pg`
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
app/
  layout.tsx              — Minimal root layout (html + body only)
  globals.css             — Global styles + keyframes
  (store)/
    layout.tsx            — Customer store layout (Header, Footer, Cart, Support)
    page.tsx              — Home page (delegates to HomePageContent)
  admin/
    layout.tsx            — Admin layout wrapper (no cart/sidebar)
    page.tsx              — Admin dashboard with inventory stats
    products/
      page.tsx            — Products management table
  api/
    products/
      route.ts            — GET all products, POST new product
      [id]/route.ts       — GET one, PUT update, DELETE product

components/
  layout/
    header.tsx            — Sticky top nav with search and cart
    footer.tsx            — Full footer with links and payment info
    category-sidebar.tsx  — Left sidebar with department icons + filtering
  admin/
    admin-header.tsx      — Admin-specific header with nav and "Ver loja" link
    product-form.tsx      — Modal form for creating/editing products
    products-table.tsx    — Full CRUD table with search, filter, stats
  home/
    home-page-content.tsx  — Client wrapper managing category filter state
    offers-section.tsx     — Hero offer + secondary offers strip
    product-grid.tsx       — Product catalog grid with inline quantity controls
    product-image.tsx      — Category-specific gradient placeholder
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
  cart-store.tsx          — Zustand cart state + CartProvider context
  category-store.tsx      — Zustand category filter state

lib/
  utils.ts                — Utility functions (formatCurrencyBRL, cn, etc.)
  db.ts                   — PostgreSQL pool singleton via pg

constants.ts              — Category, Brand, City data + type definitions
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Customer-facing store (Home) |
| `/admin` | Admin dashboard with inventory stats |
| `/admin/products` | Full product management (CRUD) |

## Key Features

### Customer Store
- **Department sidebar** — Icon-based category nav; filters the product grid live
- **Mobile category bar** — Horizontal scrollable pill bar on small screens
- **Product image placeholders** — Category-colored gradients with Lucide icons
- **Inline quantity controls** — Cart quantity +/- on the product card
- **Stock badges** — "Últimas unidades" (low) / "Sem estoque" (out)
- **Search** — Debounced client-side product search with dropdown results

### Admin Panel
- **Dashboard** — Overview cards (total, highlight, low stock, out of stock) + stock alerts
- **Products table** — Searchable, filterable table with category thumbnails
- **Product form** — Modal with all fields, stock toggle, highlight switch
- **CRUD** — Create, read, update, delete via REST API + PostgreSQL

## Database

- Products stored in PostgreSQL `products` table
- Seeded with all 16 original products from `constants.ts`
- API endpoints at `/api/products` and `/api/products/[id]`

## Running the App

```
npm run dev    # starts on port 5000 at 0.0.0.0
```

Managed by the "Start application" workflow.

## Replit Configuration

- Port: `5000` (webview requirement)
- Host: `0.0.0.0` (required for proxied preview)
- DATABASE_URL, PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE — set automatically
