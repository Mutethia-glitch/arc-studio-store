<script setup lang="ts">
import type { Product } from '~/types/product'
import { photoAt } from '~/utils/photo'
const { data: products, error } = await useFetch<Product[]>('/api/products')
const featured = computed(() => (products.value || []).filter(p => p.featured).slice(0, 4))
const heroPhoto = 'https://images.unsplash.com/photo-1599669454515-1b2e0173f302?auto=format&fit=crop&crop=entropy&w=1100&h=1100&q=78'
const categories = [
  { name: 'Audio', subtitle: 'Headphones, speakers & earbuds', icon: '♫' },
  { name: 'Computing', subtitle: 'Laptops, keyboards & mice', icon: '⌘' },
  { name: 'Mobile', subtitle: 'Smartphones & smart tech', icon: '▣' },
  { name: 'Accessories', subtitle: 'Connectivity & desk gear', icon: '⊞' }
]
useShopSeo('Electronics & tech accessories', 'Shop headphones, Bluetooth speakers, keyboards, smartphones, laptops and everyday electronic accessories at ARC Studio.', '/')
</script>
<template>
  <div>
    <section class="shell pt-8 sm:pt-12">
      <div class="grid overflow-hidden rounded-[26px] bg-[#e1e7dd] lg:min-h-[560px] lg:grid-cols-2">
        <div class="flex flex-col items-start justify-center px-8 py-14 sm:px-14 sm:py-20 lg:px-20">
          <p class="eyebrow">Your everyday electronics shop · Demo store</p>
          <h1 class="mt-7 max-w-xl font-display text-[clamp(3rem,6vw,5.7rem)] font-extrabold leading-[1.07] tracking-[-.075em]">Electronics<br />for <span class="italic text-moss">every day.</span></h1>
          <p class="mt-6 max-w-md text-base leading-8 text-[#506157]">Explore headphones, speakers, laptops, smartphones, and tech accessories, all in one place.</p>
          <NuxtLink to="/products" class="button-dark mt-9">Shop electronics <span aria-hidden="true">↗</span></NuxtLink>
          <p class="mt-8 text-xs font-semibold text-[#637366]">8 tech essentials · Mock checkout · No real payments</p>
        </div>
        <div class="relative min-h-[380px] overflow-hidden bg-[#d6e0d3] lg:min-h-[560px]">
          <img :src="photoAt(heroPhoto, 1000)" :srcset="`${photoAt(heroPhoto, 640)} 640w, ${photoAt(heroPhoto, 1100)} 1100w`" sizes="(min-width: 1024px) 50vw, 100vw" alt="Real photograph of over-ear headphones representing the ARC audio collection" width="1100" height="1100" fetchpriority="high" decoding="async" class="absolute inset-0 h-full w-full object-cover" />
          <div class="absolute bottom-7 left-8 z-20 rounded-full bg-white/90 px-4 py-2 text-xs font-bold backdrop-blur-sm">Featured · Wireless headphones</div>
        </div>
      </div>
    </section>
    <section class="shell pb-4 pt-16 sm:pt-20">
      <div class="flex flex-wrap items-end justify-between gap-5"><div><p class="eyebrow">Shop by category</p><h2 class="mt-2 font-display text-3xl font-extrabold tracking-[-.055em] sm:text-4xl">Find your kind of tech.</h2></div><NuxtLink to="/products" class="text-sm font-bold underline underline-offset-4 hover:text-moss">Browse all ↗</NuxtLink></div>
      <div class="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <NuxtLink v-for="item in categories" :key="item.name" :to="`/products?category=${encodeURIComponent(item.name)}`" class="group rounded-[20px] border border-line bg-white p-6 transition hover:border-moss hover:shadow-sm">
          <span aria-hidden="true" class="text-3xl text-moss">{{ item.icon }}</span>
          <h3 class="mt-5 font-display text-lg font-bold">{{ item.name }} <span class="inline-block transition group-hover:translate-x-1">↗</span></h3>
          <p class="mt-1 text-sm text-muted">{{ item.subtitle }}</p>
        </NuxtLink>
      </div>
    </section>
    <section class="shell py-16 sm:py-20">
      <div class="flex flex-wrap items-end justify-between gap-5"><div><p class="eyebrow">Trending tech</p><h2 class="mt-2 font-display text-3xl font-extrabold tracking-[-.055em] sm:text-5xl">Shop popular picks.</h2></div><NuxtLink to="/products" class="text-sm font-bold underline underline-offset-4 hover:text-moss">See all 8 products ↗</NuxtLink></div>
      <p v-if="error" role="alert" class="mt-8 text-coral">Products are unavailable. Please try again.</p>
      <div v-else class="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"><ProductCard v-for="product in (featured.length ? featured : (products || []).slice(0, 4))" :key="product.slug" :product="product" /></div>
    </section>
    <section class="bg-[#e7e6df] py-16 sm:py-20"><div class="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><p class="eyebrow">The ARC Studio demo</p><h2 class="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-[-.05em] sm:text-5xl">Great tech starts with finding the right fit.</h2><p class="mt-4 text-sm text-muted">Product names, specifications, availability, and prices are fictional. Photos show representative electronics.</p></div><NuxtLink to="/products" class="button-dark justify-self-start">Browse electronics ↗</NuxtLink></div></section>
  </div>
</template>
