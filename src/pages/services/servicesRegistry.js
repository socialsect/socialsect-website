/** Single source of truth for service pillars, slugs, and nav labels. */
export const SERVICE_PILLARS = [
  {
    id: 'build',
    label: 'Build',
    services: [
      { slug: 'websites', label: 'Practice websites' },
      { slug: 'apps', label: 'Mobile apps' },
      { slug: 'web-apps', label: 'Web applications' },
      { slug: 'systems', label: 'Booking + management systems' },
    ],
  },
  {
    id: 'grow',
    label: 'Grow',
    services: [
      { slug: 'meta-ads', label: 'Meta ads' },
      { slug: 'google-ads', label: 'Google ads' },
      { slug: 'seo', label: 'SEO' },
    ],
  },
  {
    id: 'brand',
    label: 'Brand',
    services: [
      { slug: 'identity', label: 'Brand identity' },
      { slug: 'design', label: 'Design' },
      { slug: 'video', label: 'Video + motion' },
    ],
  },
]

export function getServicePath(pillar, slug) {
  return `/services/${pillar}/${slug}`
}

export function getPillar(pillarId) {
  return SERVICE_PILLARS.find((p) => p.id === pillarId) ?? null
}

export function getSiblingServices(pillarId, currentSlug) {
  const pillar = getPillar(pillarId)
  if (!pillar) return []
  return pillar.services.filter((s) => s.slug !== currentSlug)
}

export function getAllServiceKeys() {
  return SERVICE_PILLARS.flatMap((pillar) =>
    pillar.services.map((service) => ({
      pillar: pillar.id,
      pillarLabel: pillar.label,
      slug: service.slug,
      label: service.label,
      path: getServicePath(pillar.id, service.slug),
    })),
  )
}

/** Flat list for navbar mega-menu (href → path). */
export function getNavServiceLinks(pillarId) {
  const pillar = getPillar(pillarId)
  if (!pillar) return []
  return pillar.services.map((service) => ({
    to: getServicePath(pillarId, service.slug),
    label: service.label,
  }))
}
