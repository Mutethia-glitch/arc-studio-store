<script setup lang="ts">
const { lines } = useCart()
onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem('arc-studio-cart') || '[]')
    if (Array.isArray(saved)) {
      lines.value = saved.filter(line => line?.product?.slug && Number.isInteger(line.quantity) && line.quantity > 0)
        .slice(0, 30).map(line => ({ product: line.product, quantity: Math.min(99, line.quantity) }))
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
