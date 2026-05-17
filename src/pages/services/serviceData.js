import { allServices } from '../../assets/service-content-matrix/allServices.js'

const BOOK_A_CALL = '/book-a-call'

/** Map client matrix CTAs to live app routes until /contact/* pages exist. */
function enrichService(pillar, slug, data) {
  return {
    pillar,
    slug,
    ...data,
    ctaHref: BOOK_A_CALL,
    relatedServices: (data.relatedServices ?? []).map((related) => ({
      ...related,
      path: related.path ?? BOOK_A_CALL,
    })),
  }
}

export const serviceData = Object.fromEntries(
  allServices.map(({ pillar, path, data }) => {
    const slug = path.split('/').pop()
    return [`${pillar}/${slug}`, enrichService(pillar, slug, data)]
  }),
)

export function getServiceData(pillar, slug) {
  return serviceData[`${pillar}/${slug}`] ?? null
}
