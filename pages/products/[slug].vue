<script setup lang="ts">
import type { Product } from '~/types/product'
const route = useRoute()
const slug = String(route.params.slug || '')
const { data: product, error } = await useFetch<Product>(`/api/products/${encodeURIComponent(slug)}`)
if (error.value || !product.value) throw createError({ statusCode: 404, statusMessage: 'Product not found' })
const { add } = useCart()
const justAdded = ref(false)
function addToCart() { if (!product.value) return; add(product.value); justAdded.value = true }
const money = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cents / 100)
const title = computed(() => product.value?.name || 'Product')
const description = computed(() => product.value?.description || '')
const { fullUrl, base } = useShopSeo(title, description, `/products/${slug}`)
useSeoMeta({ ogType: 'product', ogImage: `${base}/og-cover.png` })
useHead({ script: [{ type: 'application/ld+json', innerHTML: computed(() => JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Product',
  name: product.value?.name, description: product.value?.description,
  image: [`${base}${product.value?.image}`], sku: product.value?.slug,
  brand: { '@type': 'Brand', name: 'ARC Studio' },
  offers: { '@type': 'Offer', url: fullUrl.value, priceCurrency: 'USD',
    price: ((product.value?.price || 0) / 100).toFixed(2),
    availability: (product.value?.inventory || 0) > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    itemCondition: 'https://schema.org/NewCondition' }
})) }] })
</script>
<template>
  <div v-if="product" class="shell pb-24 pt-8 sm:pt-12">
    <nav aria-label="Breadcrumb" class="mb-8 text-xs text-muted"><NuxtLink to="/" class="hover:underline">Home</NuxtLink> <span aria-hidden="true"> / </span> <NuxtLink to="/products" class="hover:underline">Collection</NuxtLink> <span aria-hidden="true"> / </span> <span class="text-ink">{{ product.name }}</span></nav>
    <div class="grid gap-9 lg:grid-cols-2 lg:gap-16">
      <div class="relative grid aspect-square place-items-center overflow-hidden rounded-[28px] bg-[#e5e5de]"><span v-if="product.badge" class="absolute left-6 top-6 rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase">{{ product.badge }}</span><img :src="product.image" :alt="`${product.name} product illustration`" width="700" height="700" fetchpriority="high" class="h-full w-full object-contain p-10 sm:p-14" /></div>
      <div class="flex flex-col justify-center py-4 lg:pr-12">
        <p class="eyebrow">{{ product.category }} / ARC essentials</p>
        <h1 class="mt-5 max-w-xl font-display text-[clamp(2.6rem,4.5vw,4.8rem)] font-extrabold leading-[1.12] tracking-[-.07em]">{{ product.name }}</h1>
        <p class="mt-6 text-xl font-bold">{{ money(product.price) }} <span v-if="product.compareAt" class="ml-2 text-base font-normal text-muted line-through">{{ money(product.compareAt) }}</span></p>
        <p class="mt-7 max-w-lg text-base leading-8 text-muted">{{ product.description }}</p>
        <div class="my-9 h-px w-full bg-line" />
        <div class="flex flex-wrap items-center gap-3"><button class="button-dark min-w-[230px]" :disabled="!product.inventory" @click="addToCart">{{ justAdded ? 'Add another +' : 'Add to cart +' }}</button><NuxtLink to="/cart" class="button-light">View cart ↗</NuxtLink></div>
        <p class="mt-4 text-xs text-moss">{{ product.inventory ? 'In stock · Demo inventory' : 'Currently unavailable' }} · Mock checkout only</p>
        <div class="mt-12"><p class="eyebrow mb-5">The details</p><ul class="grid gap-x-8 gap-y-3 sm:grid-cols-2"><li v-for="spec in product.specs" :key="spec" class="flex items-start gap-3 text-sm text-muted"><span class="text-moss">✓</span>{{ spec }}</li></ul></div>
      </div>
    </div>
    <div class="mt-20 border-t border-line pt-10"><NuxtLink to="/products" class="text-sm font-bold underline underline-offset-4">← Back to the collection</NuxtLink></div>
  </div>
</template>
