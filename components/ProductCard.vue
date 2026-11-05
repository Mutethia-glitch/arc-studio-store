<script setup lang="ts">
import type { Product } from '~/types/product'
const props = defineProps<{ product: Product }>()
const { add } = useCart()
const money = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cents / 100)
</script>
<template>
  <article class="group min-w-0">
    <NuxtLink :to="`/products/${product.slug}`" :aria-label="`View ${product.name}`" class="block">
      <div class="card-image relative transition-all duration-500 group-hover:shadow-card">
        <span v-if="product.badge" class="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.09em]">{{ product.badge }}</span>
        <img :src="product.image" :alt="product.name" width="520" height="520" loading="lazy" decoding="async" class="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-[1.06]" />
      </div>
    </NuxtLink>
    <div class="pt-5">
      <p class="eyebrow">{{ product.category }}</p>
      <div class="mt-1 flex items-start justify-between gap-3">
        <NuxtLink :to="`/products/${product.slug}`" class="font-display text-base font-bold leading-6 tracking-tight hover:text-moss sm:text-lg">{{ product.name }}</NuxtLink>
        <div class="shrink-0 whitespace-nowrap text-right text-sm font-bold">{{ money(product.price) }} <span v-if="product.compareAt" class="block text-xs font-normal text-muted line-through">{{ money(product.compareAt) }}</span></div>
      </div>
      <p class="mt-2 text-sm leading-6 text-muted">{{ product.shortDescription }}</p>
      <button type="button" @click="add(product)" :disabled="!product.inventory" class="mt-4 text-xs font-bold uppercase tracking-[.13em] text-ink underline underline-offset-4 hover:text-moss disabled:opacity-40">+ Add to cart</button>
    </div>
  </article>
</template>
