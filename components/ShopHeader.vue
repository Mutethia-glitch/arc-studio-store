<script setup lang="ts">
const { count } = useCart()
</script>
<template>
    <div class="bg-ink py-2 text-center text-[11px] font-semibold tracking-[.1em] text-white">Thoughtful tech. Better everyday.</div>
    <header class="sticky top-0 z-50 border-b border-line/80 bg-paper/95 backdrop-blur-xl">
      <div class="shell flex h-20 items-center justify-between gap-6">
        <NuxtLink to="/" aria-label="ARC Studio home" class="font-display text-2xl font-extrabold tracking-[-.09em]">arc<span class="text-coral">.</span><span class="ml-2 align-middle text-[9px] font-bold uppercase tracking-[.24em] text-muted">studio</span></NuxtLink>
        <nav aria-label="Main navigation" class="flex items-center gap-5 sm:gap-9">
          <NuxtLink to="/products" class="text-sm font-semibold hover:text-moss">Shop all</NuxtLink>
          <NuxtLink to="/products?category=Audio" class="hidden text-sm font-semibold hover:text-moss sm:inline">Audio</NuxtLink>
          <NuxtLink to="/products?category=Workspace" class="hidden text-sm font-semibold hover:text-moss md:inline">Workspace</NuxtLink>
          <NuxtLink to="/cart" class="relative inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold hover:bg-white" aria-label="View shopping cart">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" class="h-5 w-5"><path d="M3 5h2l2.2 10.5h10.5l2-8H6M9 20h.01M18 20h.01" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Cart <span class="grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[11px] text-white">{{ count }}</span>
          </NuxtLink>
        </nav>
      </div>
    </header>
</template>
