<script setup lang="ts">
import type { Product } from '~/types/product'
const route = useRoute()
const { data: products, error } = await useFetch<Product[]>('/api/products')
const search = ref('')
const categories = ['All', 'Audio', 'Computing', 'Mobile', 'Accessories']
const category = ref(typeof route.query.category === 'string' && categories.includes(route.query.category) ? route.query.category : 'All')
watch(() => route.query.category, value => { category.value = typeof value === 'string' && categories.includes(value) ? value : 'All' })
const filtered = computed(() => (products.value || []).filter(p =>
  (category.value === 'All' || p.category === category.value) &&
  `${p.name} ${p.category} ${p.shortDescription}`.toLowerCase().includes(search.value.toLowerCase().trim())
))
useShopSeo('Shop electronics', 'Shop headphones, speakers, wireless earbuds, laptops, smartphones, keyboards, mice and tech accessories at ARC Studio.', '/products')
</script>
<template>
  <div class="shell pb-24 pt-14 sm:pt-20">
    <p class="eyebrow">The electronics store</p>
    <div class="mt-2 flex flex-wrap items-end justify-between gap-5"><div><h1 class="font-display text-[clamp(2.8rem,5.5vw,5.3rem)] font-extrabold tracking-[-.075em]">Shop electronics<span class="text-coral">.</span></h1><p class="mt-3 max-w-2xl text-base text-muted">Audio, computers, smartphones, and accessories. Explore our photo-led demo catalogue.</p></div><p class="text-sm text-muted">{{ filtered.length }} products</p></div>
    <div class="mt-11 flex flex-col gap-5 border-y border-line py-5 lg:flex-row lg:items-center lg:justify-between">
      <div role="group" aria-label="Filter products by category" class="flex flex-wrap gap-2"><button v-for="item in categories" :key="item" type="button" @click="category = item; navigateTo(item === 'All' ? '/products' : `/products?category=${encodeURIComponent(item)}`)" :aria-pressed="category === item" :class="category === item ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-cream'" class="rounded-full px-5 py-2.5 text-xs font-bold transition">{{ item }}</button></div>
      <label class="flex items-center gap-3 rounded-full border border-line bg-white px-5 py-2.5 lg:w-72"><span aria-hidden="true">⌕</span><span class="sr-only">Search products</span><input v-model="search" type="search" placeholder="Search electronics..." class="w-full bg-transparent text-sm outline-none placeholder:text-muted" /></label>
    </div>
    <p v-if="error" role="alert" class="py-14 text-coral">Unable to load products. Please try again.</p>
    <div v-else-if="filtered.length" class="mt-9 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"><ProductCard v-for="item in filtered" :key="item.slug" :product="item" /></div>
    <div v-else class="py-24 text-center"><h2 class="font-display text-2xl font-bold">No electronics found.</h2><p class="mt-3 text-muted">Try another search or product category.</p><button @click="search = ''; category = 'All'; navigateTo('/products')" class="button-light mt-6">Clear filters</button></div>
    <p class="mt-14 border-t border-line pt-6 text-xs leading-6 text-muted">Demo catalogue: all product names, prices and specs are fictional. Photography is illustrative and may show other manufacturers' devices.</p>
  </div>
</template>
