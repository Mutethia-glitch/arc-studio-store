<script setup lang="ts">
defineProps<{ error: { statusCode?: number; statusMessage?: string } }>()
useShopSeo('Page not found', 'This page could not be found on ARC Studio.', '/404')
</script>
<template><div class="shell py-32 text-center"><p class="eyebrow">Something went off course</p><h1 class="mt-5 font-display text-6xl font-extrabold">{{ error.statusCode || 'Oops' }}</h1><p class="mt-5 text-muted">{{ error.statusCode === 404 ? 'We could not find that product or page.' : 'Something went wrong.' }}</p><NuxtLink class="button-dark mt-8" to="/">Return home ↗</NuxtLink></div></template>
