import { productBySlug } from '../../utils/catalog.mjs'
export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug') || ''
  const product = productBySlug(slug)
  if (!product) throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  return product
})
