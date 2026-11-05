<script setup lang="ts">
import type { Product } from '~/types/product'
import { photoAt } from '~/utils/photo'
defineProps<{ product: Product }>()
const { add } = useCart()
const money = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cents / 100)
</script>
<template>
  <article class="group min-w-0">
    <NuxtLink :to="`/products/${product.slug}`" :aria-label="`View ${product.name}`" class="block">
      <div class="card-image relative transition-all duration-500 group-hover:shadow-card">
        <span v-if="product.badge" class="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.09em] shadow-sm">{{ product.badge }}</span>
        <img
          :src="photoAt(product.image, 760)"
          :srcset="`${photoAt(product.image, 360)} 360w, ${photoAt(product.image, 760)} 760w, ${photoAt(product.image, 1060)} 1060w`"
          sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
          :alt="`Representative photograph of ${product.name}`"
          width="760" height="760" loading="lazy" decoding="async"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.045]"
        />
      </div>
    </NuxtLink>
    <div class="pt-5">
      <p class="eyebrow">{{ product.category }}</p>
      <div class="mt-2 flex items-start justify-between gap-3">
        <NuxtLink :to="`/products/${product.slug}`" class="font-display text-base font-bold leading-6 tracking-tight hover:text-moss sm:text-lg">{{ product.name }}</NuxtLink>
        <div class="shrink-0 whitespace-nowrap text-right text-sm font-bold">{{ money(product.price) }} <span v-if="product.compareAt" class="block text-xs font-normal text-muted line-through">{{ money(product.compareAt) }}</span></div>
      </div>
      <p class="mt-2 text-sm leading-6 text-muted">{{ product.shortDescription }}</p>
      <div class="mt-4 flex items-center justify-between gap-3">
        <span class="text-[11px] font-medium text-moss">{{ product.inventory ? 'In stock · Demo' : 'Unavailable' }}</span>
        <button type="button" @click="add(product)" :disabled="!product.inventory" class="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:bg-moss disabled:opacity-40">Add to cart +</button>
      </div>
    </div>
  </article>
</template>
