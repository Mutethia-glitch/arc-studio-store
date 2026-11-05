import type { Ref } from 'vue'
export function useShopSeo(title: string | Ref<string>, description: string | Ref<string>, path: string | Ref<string>) {
  const requestUrl = useRequestURL()
  const configured = useRuntimeConfig().public.siteUrl as string | undefined
  const base = (configured || requestUrl.origin).replace(/\/$/, '')
  const fullTitle = computed(() => `${unref(title)} | ARC Studio`)
  const fullUrl = computed(() => `${base}${unref(path)}`)
  const image = `${base}/og-cover.png`
  useSeoMeta({
    title: fullTitle, description, ogTitle: fullTitle, ogDescription: description,
    ogType: 'website', ogUrl: fullUrl, ogImage: image,
    twitterCard: 'summary_large_image', twitterTitle: fullTitle,
    twitterDescription: description, twitterImage: image
  })
  useHead({ link: [{ rel: 'canonical', href: fullUrl }] })
  return { fullUrl, base }
}
