import { DatabaseSync } from 'node:sqlite'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { seedProducts } from '../data/products.mjs'

// SQLite is server-only. The catalog is deterministic and re-seeded on cold starts.
// The /tmp DB is ephemeral on serverless platforms; carts never depend on it.
export function openCatalog(filename = ':memory:') {
  const db = new DatabaseSync(filename)
  db.exec(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER NOT NULL CHECK(price >= 0),
    compare_at INTEGER,
    badge TEXT,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    specs_json TEXT NOT NULL,
    inventory INTEGER NOT NULL DEFAULT 0,
    featured INTEGER NOT NULL DEFAULT 0
  )`)
  const insert = db.prepare(`INSERT OR IGNORE INTO products
    (slug,name,category,price,compare_at,badge,short_description,description,image,specs_json,inventory,featured)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`)
  for (const p of seedProducts) {
    insert.run(p.slug,p.name,p.category,p.price,p.compareAt,p.badge,p.shortDescription,p.description,p.image,JSON.stringify(p.specs),p.inventory,Number(p.featured))
  }
  return db
}

let singleton
function connection() {
  if (!singleton) singleton = openCatalog(join(tmpdir(), 'arc-studio-catalog-v1.sqlite'))
  return singleton
}
function normalize(row) {
  if (!row) return null
  return {
    id: row.id, slug: row.slug, name: row.name, category: row.category,
    price: row.price, compareAt: row.compare_at, badge: row.badge,
    shortDescription: row.short_description, description: row.description,
    image: row.image, specs: JSON.parse(row.specs_json),
    inventory: row.inventory, featured: Boolean(row.featured)
  }
}
export function allProducts(db = connection()) {
  return db.prepare('SELECT * FROM products ORDER BY id ASC').all().map(normalize)
}
export function productBySlug(slug, db = connection()) {
  if (typeof slug !== 'string' || !/^[a-z0-9-]+$/.test(slug)) return null
  return normalize(db.prepare('SELECT * FROM products WHERE slug = ?').get(slug))
}
