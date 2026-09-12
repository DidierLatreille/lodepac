import { createSitemap, normalizeSiteUrl } from '../../shared/utils/seo'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = normalizeSiteUrl(config.public.siteUrl)
  if (!siteUrl) {
    throw createError({ statusCode: 404, statusMessage: 'Sitemap not configured' })
  }
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return createSitemap(siteUrl)
})
