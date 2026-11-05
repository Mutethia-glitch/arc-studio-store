import { allProducts } from '../utils/catalog.mjs'
export default defineEventHandler((event) => {
  const origin = getRequestURL(event).origin
  const paths = ['/', '/products', ...allProducts().map(p => `/products/${p.slug}`)]
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, s-maxage=300')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path => `  <url><loc>${origin}${path}</loc></url>`).join('\n')}\n</urlset>`
})
