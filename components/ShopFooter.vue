<template>
  <footer class="border-t border-line bg-[#efeee7]">
    <div class="shell grid gap-10 py-14 sm:grid-cols-3">
      <div><p class="font-display text-3xl font-extrabold tracking-[-.08em]">arc<span class="text-coral">.</span></p><p class="mt-3 max-w-xs text-sm leading-7 text-muted">Discover audio gear, computers, smartphones, and electronic accessories in this fictional technical demo store.</p></div>
      <div><p class="eyebrow mb-4">Explore</p><NuxtLink class="block py-1 text-sm hover:underline" to="/products">All products</NuxtLink><NuxtLink class="block py-1 text-sm hover:underline" to="/cart">Your cart</NuxtLink></div>
      <div><p class="eyebrow mb-4">Good to know</p><p class="text-sm leading-7 text-muted">Product photos are illustrative; specifications, stock and prices are fictional. Checkout is simulated with no payments or orders.</p></div>
    </div>
    <div class="shell flex flex-wrap justify-between gap-3 border-t border-line py-5 text-xs text-muted"><span>© {{ new Date().getFullYear() }} ARC Studio — Original concept</span><span>Electronics made easy · Demo only.</span></div>
  </footer>
</template>
