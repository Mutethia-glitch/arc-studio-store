<script setup lang="ts">
const { lines } = useCart()
onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem('arc-studio-cart') || '[]')
    if (Array.isArray(saved)) {
      const valid = saved.filter(line => line?.product?.slug && Number.isInteger(line.quantity) && line.quantity > 0).slice(0, 30)
      lines.value = valid.map(line => ({ product: line.product, quantity: Math.min(99, line.quantity) }))
      // Refresh product data when an existing visitor still has illustrated items in localStorage.
      $fetch<import('~/types/product').Product[]>('/api/products').then(products => {
        const bySlug = new Map(products.map(product => [product.slug, product]))
        lines.value = lines.value.filter(line => bySlug.has(line.product.slug)).map(line => ({
          product: bySlug.get(line.product.slug)!,
          quantity: Math.min(line.quantity, bySlug.get(line.product.slug)!.inventory)
        }))
      }).catch(() => { /* keep offline cart contents */ })
    }
  } catch { /* ignore malformed locally saved cart */ }
  watch(lines, next => localStorage.setItem('arc-studio-cart', JSON.stringify(next)), { deep: true })
})
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <ShopHeader />
    <main id="main-content" class="flex-1"><NuxtPage /></main>
    <ShopFooter />
  </div>
</template>
