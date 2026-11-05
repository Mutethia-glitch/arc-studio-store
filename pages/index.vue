<script setup lang="ts">
import type { Product } from '~/types/product'
const { data: products, error } = await useFetch<Product[]>('/api/products')
const featured = computed(() => (products.value || []).filter(p => p.featured))
useShopSeo('Thoughtful electronics for everyday', 'Discover original audio and desk essentials thoughtfully designed for everyday living. Explore the ARC Studio concept collection.', '/')
</script>
<template>
  <div>
    <section class="shell pt-8 sm:pt-12">
      <div class="grid overflow-hidden rounded-[26px] bg-[#e1e7dd] lg:min-h-[570px] lg:grid-cols-2">
        <div class="flex flex-col items-start justify-center px-8 py-14 sm:px-14 sm:py-20 lg:px-20">
          <p class="eyebrow">Meet your new essentials · Collection 01</p>
          <h1 class="mt-7 max-w-xl font-display text-[clamp(3.1rem,6vw,5.9rem)] font-extrabold leading-[1.08] tracking-[-.075em]">Less noise.<br />More <span class="italic text-moss">living.</span></h1>
          <p class="mt-6 max-w-md text-base leading-8 text-[#506157]">Considered electronics that feel at home in your life. Good design is the little things done well.</p>
          <NuxtLink to="/products" class="button-dark mt-9">Explore collection <span aria-hidden="true">↗</span></NuxtLink>
          <p class="mt-9 text-xs font-semibold text-[#637366]">01 / Audio & workspace essentials</p>
        </div>
        <div class="relative grid min-h-[340px] place-items-center bg-[#d6e0d3] lg:min-h-[570px]">
          <div class="absolute left-8 top-9 h-28 w-28 rounded-full border border-white/65 sm:left-14 sm:top-12"></div>
          <div class="absolute bottom-12 right-9 h-40 w-40 rounded-full border border-white/60"></div>
          <img src="/images/orbit.svg" alt="Illustration of ARC Orbit over-ear wireless headphones" width="640" height="640" fetchpriority="high" class="relative z-10 w-[80%] max-w-[510px] drop-shadow-[0_32px_30px_rgba(31,53,41,.13)]" />
          <div class="absolute bottom-7 left-8 z-20 rounded-full bg-white/75 px-4 py-2 text-xs font-bold backdrop-blur-sm">Featured: Orbit Headphones</div>
        </div>
      </div>
    </section>
    <section class="shell py-20 sm:py-24">
      <div class="flex flex-wrap items-end justify-between gap-5"><div><p class="eyebrow">The edit</p><h2 class="mt-2 font-display text-3xl font-extrabold tracking-[-.055em] sm:text-5xl">Designed to belong.</h2></div><NuxtLink to="/products" class="text-sm font-bold underline underline-offset-4 hover:text-moss">Shop all products ↗</NuxtLink></div>
      <p v-if="error" role="alert" class="mt-8 text-coral">Products are unavailable. Please try again.</p>
      <div v-else class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"><ProductCard v-for="product in (featured.length ? featured : (products || []).slice(0, 3))" :key="product.slug" :product="product" /></div>
    </section>
    <section class="bg-[#e7e6df] py-16 sm:py-20"><div class="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><p class="eyebrow">A better everyday</p><h2 class="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-[-.05em] sm:text-5xl">Technology should fit into your life, not take over it.</h2></div><NuxtLink to="/products" class="button-dark justify-self-start">Find your essential ↗</NuxtLink></div></section>
  </div>
</template>
