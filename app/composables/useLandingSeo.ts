import { createStructuredData, normalizeSiteUrl, siteInfo, type MenuItem } from '#shared/utils/seo'

export function useLandingSeo(items: MenuItem[], price: number) {
  const config = useRuntimeConfig()
  const siteUrl = normalizeSiteUrl(config.public.siteUrl)
  const isIndexable = Boolean(siteUrl) && !import.meta.dev

  useSeoMeta({
    title: siteInfo.title,
    description: siteInfo.description,
    robots: isIndexable ? 'index, follow, max-image-preview:large' : 'noindex, follow',
    themeColor: '#1f4075',
    ogType: 'website',
    ogSiteName: siteInfo.name,
    ogLocale: 'es_AR',
    ogTitle: siteInfo.title,
    ogDescription: siteInfo.description,
    ...(siteUrl ? { ogUrl: siteUrl } : {}),
    twitterCard: 'summary',
    twitterTitle: siteInfo.title,
    twitterDescription: siteInfo.description,
  })

  useHead({
    htmlAttrs: { lang: siteInfo.language },
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ...(siteUrl ? [{ rel: 'canonical', href: siteUrl }] : []),
    ],
    script: [{
      key: 'lodepac-structured-data',
      type: 'application/ld+json',
      textContent: JSON.stringify(createStructuredData(siteUrl, items, price)).replace(/</g, '\\u003c'),
    }],
  })
}
