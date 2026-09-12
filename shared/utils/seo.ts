export const siteInfo = {
  name: 'Lo de Pac',
  title: 'Burritos en Vicente López y Martínez | Lo de Pac',
  description: 'Pedí burritos de birria, Korean BBQ Chicken y Philly Cheesesteak en Lo de Pac. Delivery en Vicente López y Martínez, jueves a sábados de 20 a 23 h.',
  language: 'es-AR',
  instagram: 'https://www.instagram.com/lodepac/',
} as const

/** Only an explicitly configured production origin can become canonical. */
export function normalizeSiteUrl(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) return ''

  const url = new URL(value.trim())
  if (
    url.protocol !== 'https:' || url.username || url.password ||
    url.pathname !== '/' || url.search || url.hash || url.port ||
    url.hostname === 'localhost' || url.hostname.endsWith('.localhost') ||
    url.hostname.endsWith('.local') || !url.hostname.includes('.') ||
    /^[\d.]+$/.test(url.hostname)
  ) {
    throw new Error('NUXT_PUBLIC_SITE_URL debe ser el dominio público HTTPS, sin rutas, puertos ni parámetros.')
  }
  return `${url.origin}/`
}

export function createRobotsTxt(siteUrl: string): string {
  // Crawling stays allowed so bots can read the preview's HTML noindex tag.
  return `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}sitemap.xml\n` : ''}`
}

export function createSitemap(siteUrl: string): string {
  const escapedUrl = siteUrl.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${escapedUrl}</loc></url>\n</urlset>\n`
}

export type MenuItem = { name: string; description: string }

export function createStructuredData(siteUrl: string, items: MenuItem[], price: number) {
  const id = (fragment: string) => `${siteUrl}#${fragment}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': id('organization'),
        name: siteInfo.name,
        description: 'Burritos con delivery en Vicente López y Martínez, Zona Norte.',
        ...(siteUrl ? { url: siteUrl } : {}),
        sameAs: [siteInfo.instagram],
        areaServed: [
          { '@type': 'City', name: 'Vicente López', containedInPlace: { '@type': 'AdministrativeArea', name: 'Buenos Aires, Argentina' } },
          { '@type': 'City', name: 'Martínez', containedInPlace: { '@type': 'AdministrativeArea', name: 'Buenos Aires, Argentina' } },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': id('website'),
        name: siteInfo.name,
        ...(siteUrl ? { url: siteUrl } : {}),
        inLanguage: siteInfo.language,
        publisher: { '@id': id('organization') },
      },
      {
        '@type': 'WebPage',
        '@id': id('webpage'),
        name: siteInfo.title,
        description: siteInfo.description,
        ...(siteUrl ? { url: siteUrl } : {}),
        inLanguage: siteInfo.language,
        isPartOf: { '@id': id('website') },
        about: { '@id': id('organization') },
        mainEntity: { '@id': id('menu') },
      },
      {
        '@type': 'Menu',
        '@id': id('menu'),
        name: 'Menú de burritos de Lo de Pac',
        ...(siteUrl ? { url: `${siteUrl}#burritos` } : {}),
        inLanguage: siteInfo.language,
        creator: { '@id': id('organization') },
        hasMenuSection: {
          '@type': 'MenuSection',
          name: 'Burritos',
          hasMenuItem: items.map(item => ({
            '@type': 'MenuItem',
            name: item.name,
            description: item.description,
            offers: { '@type': 'Offer', price, priceCurrency: 'ARS', url: siteInfo.instagram },
          })),
        },
      },
    ],
  }
}
