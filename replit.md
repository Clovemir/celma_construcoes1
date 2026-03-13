# Celma Construções Store

A Next.js e-commerce storefront for Celma Construções, migrated from Vercel to Replit.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

- `app/` — Next.js App Router pages and layouts
- `components/` — Reusable UI components (cart, home, layout, support, ui)
- `lib/` — Utility functions
- `store/` — Zustand state stores
- `constants.ts` — Shared constants

## Running the App

The app runs via the "Start application" workflow using:

```
npm run dev
```

which starts Next.js on port 5000 at `0.0.0.0` (required for Replit).

## Replit Configuration

- Port: `5000` (Replit webview requirement)
- Host: `0.0.0.0` (required for proxied preview pane)
- Images: Remote patterns configured for `images.pexels.com`

## Security Notes

- Next.js upgraded to `^14.2.30` to address CVE security vulnerabilities
- Remaining audit findings are dev-only ESLint tooling dependencies and do not affect runtime
