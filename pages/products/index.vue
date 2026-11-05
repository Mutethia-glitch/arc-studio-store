<script setup lang="ts">
import type { Product } from '~/types/product'
const route = useRoute()
const { data: products, error } = await useFetch<Product[]>('/api/products')
const search = ref('')
const category = ref(typeof route.query.category === 'string' ? route.query.category : 'All')
watch(() => route.query.category, value => { category.value = typeof value === 'string' ? value : 'All' })
const categories = ['All', 'Audio', 'Workspace']
const filtered = computed(() => (products.value || []).filter(p =>
  (category.value === 'All' || p.category === category.value) &&
  `${p.name} ${p.shortDescription}`.toLowerCase().includes(search.value.toLowerCase().trim())
))
useShopSeo('Shop the collection', 'Shop the ARC Studio collection of audio gear, desk accessories, and considered everyday electronics.', '/products')
</script>
<template>
  <div class="shell pb-24 pt-14 sm:pt-20">
    <p class="eyebrow">Thoughtfully selected</p>
    <div class="mt-2 flex flex-wrap items-end justify-between gap-5"><div><h1 class="font-display text-[clamp(2.8rem,5.5vw,5.3rem)] font-extrabold tracking-[-.075em]">The collection<span class="text-coral">.</span></h1><p class="mt-3 text-base text-muted">Small details. Big difference. Find something useful, and beautifully simple.</p></div><p class="text-sm text-muted">{{ filtered.length }} products</p></div>
    <div class="mt-11 flex flex-col gap-5 border-y border-line py-5 sm:flex-row sm:items-center sm:justify-between">
      <div role="group" aria-label="Filter products" class="flex flex-wrap gap-2"><button v-for="item in categories" :key="item" type="button" @click="category = item; navigateTo(item === 'All' ? '/products' : `/products?category=${item}`)" :aria-pressed="category === item" :class="category === item ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-cream'" class="rounded-full px-5 py-2.5 text-xs font-bold transition">{{ item }}</button></div>
      <label class="flex items-center gap-3 rounded-full border border-line bg-white px-5 py-2.5 sm:w-72"><span aria-hidden="true">⌕</span><span class="sr-only">Search products</span><input v-model="search" type="search" placeholder="Search products..." class="w-full bg-transparent text-sm outline-none placeholder:text-muted" /></label>
    </div>
    <p v-if="error" role="alert" class="py-14 text-coral">Unable to load products. Please try again.</p>
    <div v-else-if="filtered.length" class="mt-9 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"><ProductCard v-for="p in filtered" :key="p.slug" :product="p" /></div>
    <div v-else class="py-24 text-center"><h2 class="font-display text-2xl font-bold">Nothing quite like that.</h2><p class="mt-3 text-muted">Try another search or product category.</p><button @click="search = ''; category = 'All'; navigateTo('/products')" class="button-light mt-6">Clear filters</button></div>
  </div>
</template>
