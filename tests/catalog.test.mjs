import test from 'node:test'
import assert from 'node:assert/strict'
import { openCatalog, allProducts, productBySlug } from '../server/utils/catalog.mjs'

test('seeded SQLite catalogue contains six unique products', () => {
  const db = openCatalog()
  const products = allProducts(db)
  assert.equal(products.length, 6)
  assert.equal(new Set(products.map(x => x.slug)).size, 6)
  assert.ok(products.every(p => p.price > 0 && p.price === Math.trunc(p.price)))
  db.close()
})

test('parameterized lookup returns product and rejects malicious / invalid slugs', () => {
  const db = openCatalog()
  const product = productBySlug('orbit-wireless-headphones', db)
  assert.equal(product.name, 'Orbit Wireless Headphones')
  assert.equal(product.price, 14900)
  assert.equal(productBySlug('not-a-real-product', db), null)
  assert.equal(productBySlug("' OR 1=1 --", db), null)
  db.close()
})

test('seeding the same catalogue twice does not duplicate records', () => {
  const db = openCatalog()
  assert.equal(allProducts(db).length, 6)
  db.close()
})
