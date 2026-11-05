# Five-minute walkthrough

1. Open `/products` and show that content is fetched from `/api/products`, not hard-coded in Vue.
2. Open `server/utils/catalog.mjs`; `node:sqlite` creates a real products table, inserts eight products, and SQL returns rows. `/tmp` is short-lived; it is a demo catalogue.
3. Show `pages/products/[slug].vue`: dynamic clean URL, unique metadata, canonical link, `Product` JSON-LD, 404s.
4. Add a product; show `composables/useCart.ts`, how `app.vue` persists to localStorage, and why price uses cents.
5. Open `/sitemap.xml` and `/robots.txt`; explain SVG assets, image lazy loading, Nuxt SSR and why real checkout is deliberately out of scope.

## Typical questions

- **Why Nuxt over plain Vue?** File-based routing, SSR, API handlers and built-in SEO meta functions.
- **Why not Supabase?** This assessment's catalog is read-only. Local seeded SQLite makes the demo reproducible; Supabase is the upgrade for data shared between instances and real orders.
- **Does the demo accept payments?** No. The cart works; checkout is mocked and explicitly labelled.
- **What would you secure before production?** Database access and migrations, auth, server-side prices, payment webhooks, stock consistency, rate limiting and customer privacy.
- **Why not store cart server-side?** Guest-only demo, no auth or order accounts. localStorage is a simple trade-off with no personal data stored.


## Photo and catalogue update

The electronics store now includes 8 fictional items across Audio, Computing, Mobile and Accessories. Representative real photos were sourced from Unsplash, with photographer/source links in README. Photos are optimized by Unsplash CDN at different requested sizes with `srcset` and `sizes`; no real manufacturer endorsement is implied. The SQLite API, cart, checkout mock and SEO remain in place. Product structured data uses the external image URL directly, and product OG images use the corresponding photo.
