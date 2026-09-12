import { createRobotsTxt, normalizeSiteUrl } from '../../shared/utils/seo'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return createRobotsTxt(normalizeSiteUrl(config.public.siteUrl))
})
