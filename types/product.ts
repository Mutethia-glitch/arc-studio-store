export interface Product {
  id: number
  slug: string
  name: string
  category: string
  price: number
  compareAt: number | null
  badge: string | null
  shortDescription: string
  description: string
  image: string
  specs: string[]
  inventory: number
  featured: boolean
}
export interface CartLine { product: Product; quantity: number }
