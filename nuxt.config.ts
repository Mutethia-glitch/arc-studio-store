export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: { public: { siteUrl: '' } },
  compatibilityDate: '2025-07-01',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'ARC Studio — Considered electronics',
      meta: [{ name: 'theme-color', content: '#f5f3ee' }],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap' }
      ]
    }
  },
  nitro: { preset: 'vercel' },
  routeRules: {
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/api/products/**': { headers: { 'cache-control': 'public, max-age=60, s-maxage=300' } }
  }
})
