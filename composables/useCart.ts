import type { Product, CartLine } from '~/types/product'

export function useCart() {
  const lines = useState<CartLine[]>('arc-cart', () => [])
  const count = computed(() => lines.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() => lines.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0))
  function add(product: Product) {
    if (product.inventory < 1) return
    const existing = lines.value.find(line => line.product.slug === product.slug)
    if (existing) existing.quantity = Math.min(existing.quantity + 1, product.inventory)
    else lines.value.push({ product, quantity: 1 })
  }
  function setQuantity(slug: string, quantity: number) {
    const line = lines.value.find(item => item.product.slug === slug)
    if (!line) return
    const safe = Number.isFinite(quantity) ? Math.trunc(quantity) : 1
    if (safe <= 0) remove(slug)
    else line.quantity = Math.min(safe, line.product.inventory)
  }
  function remove(slug: string) {
    lines.value = lines.value.filter(item => item.product.slug !== slug)
  }
  function clear() { lines.value = [] }
  return { lines, count, subtotal, add, setQuantity, remove, clear }
}
