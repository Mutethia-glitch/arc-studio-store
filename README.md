# ARC Studio — Nuxt 3 electronics store

A small **original** electronics-store concept for a frontend take-home. **This is a demo, not a live merchant.** Six fictional products, custom original SVG product illustrations, a real SQLite-backed product API, reactive cart, simulated checkout, and server-rendered SEO pages.

## Stack and architecture

- **Nuxt 3** with Vue 3 and TypeScript for SSR, routes, API handlers and SEO.
- **Tailwind CSS 3** through `@nuxtjs/tailwindcss` for responsive styling.
- **Node.js 22+ built-in SQLite** (`node:sqlite`) for a tiny server-side relational catalogue. Nitro API handlers query the DB; products are never imported directly by frontend pages.
- **Cart** uses Nuxt shared state + browser localStorage; **checkout is intentionally mocked**.
- **Vercel** / Nitro deployment target.

The DB is created at `/tmp/arc-studio-catalog-v1.sqlite` and seeded deterministically on each cold start. `/tmp` is ephemeral on Vercel, so this is suitable for a **read-only assessment catalogue**, not production orders or shared inventory. SQLite is built into Node 22+ (experimental warning possible on Node 22), avoiding an external database account and any credentials. For a real store, replace this layer with managed PostgreSQL/Supabase.

## Run locally

```bash
node --version        # >= 22.5.0 required
npm install
npm run dev           # http://localhost:3000
```

Test database behavior:

```bash
npm test
npm run build
npm run preview
```

## Routes and data flow

| Route | Purpose |
| --- | --- |
| `/` | Home + featured products |
| `/products` | Full catalogue, category filters, search |
| `/products/:slug` | Individual product pages with schema markup |
| `/cart` | Persistent cart with quantity controls and mock checkout |
| `/api/products` | Server-only SQLite query, all products |
| `/api/products/:slug` | Validated slug lookup, 404 on missing product |
| `/sitemap.xml` | Dynamically generated XML including product URLs |
| `/robots.txt` | Crawl directives + sitemap URL |

The flow is **browser → SSR Nuxt page → Nitro API → SQLite**. Cart items are saved locally; nothing is charged or submitted to a payment processor.

## SEO / performance checklist

- Unique `<title>`, descriptions, canonical URLs and Open Graph / Twitter tags for home, catalogue, product and cart.
- JSON-LD [`Product`](https://schema.org/Product) with absolute image URL, brand and offer price / availability on each product page; **no fabricated review ratings**.
- `/sitemap.xml` includes canonical product routes; `/robots.txt` points at it and blocks `/cart`.
- Clean human-readable product slugs, SSR HTML, meaningful headings, alt text, width/height dimensions and lazy loading on listing images; prominent product art loads eagerly.
- **Original, local vector illustrations** avoid external image host dependencies and ship as compact cacheable SVGs. OG artwork is also original SVG (for maximum social crawler compatibility, a PNG/JPEG version would be a production improvement).

## Deployment on Vercel

1. Create a **new** GitHub repository for this folder and push its files.
2. Import that repository in Vercel; the framework should be detected as **Nuxt**. Use Node **22.x** or newer.
3. Deploy with `npm run build`. No secrets or database account are required.
4. Optionally set `NUXT_PUBLIC_SITE_URL=https://your-project.vercel.app` to make canonical and OG URLs independent of incoming Host headers; the default is the incoming origin.
5. Test `/`, `/products`, one `/products/:slug`, `/cart`, `/api/products`, `/sitemap.xml`, and `/robots.txt` on the production domain.

## Key decisions (interview notes)

1. **Small but complete**: six products, two categories, three essential shopping views, mock payment—no misleading real checkout.
2. **SEO-first SSR**: Nuxt renders indexable content and meta at request time, rather than depending on a JavaScript-only browser render.
3. **SQLite behind API**: separated frontend display from storage, demonstrated parameterized SQL lookups, and avoided database credentials for an assessment.
4. **Prices in cents**: all arithmetic uses integers to avoid floating-point rounding errors.
5. **Native local SVGs**: original art is small and responsive; dimensions and lazy loading reduce layout shifts and transferred bytes.

## What I'd improve with more time

- Managed Postgres/Supabase and migrations; central inventory management instead of a seeded ephemeral DB.
- Auth, real order persistence and secure Stripe / Paystack checkout with server-side amount validation and webhooks.
- Playwright end-to-end tests, axe accessibility audit, Lighthouse performance checks, and deployment CI gates.
- Image variants and social-preview PNG/JPEG, product filters/sorting and inventory-aware cart reconciliation.

## AI disclosure template (adjust it to what you actually did)

> I used AI to help scaffold the Nuxt 3 project, suggest component structure, and review the SEO implementation and test coverage. I personally chose the electronics-store scope, the minimalist brand direction, and which features to prioritize for the time limit. I reviewed and adapted the generated code, including the API-to-SQLite data flow, cart state, and mock checkout behavior. I can explain the main implementation decisions and the tradeoffs I would address before using this in production.

**Important:** Only submit this statement if it accurately reflects your involvement. Review and understand every part of the code before an interview.
