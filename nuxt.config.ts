import { normalizeSiteUrl } from './shared/utils/seo'

const siteUrl = normalizeSiteUrl(process.env.NUXT_PUBLIC_SITE_URL)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: { siteUrl }
  },
  routeRules: {
    '/': { prerender: true }
  },
  nitro: {
    prerender: {
      routes: ['/robots.txt', ...(siteUrl ? ['/sitemap.xml'] : [])]
    }
  }
})
