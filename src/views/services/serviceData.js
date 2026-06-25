import { allServices } from '../../assets/service-content-matrix/allServices.js'
import { BOOK_A_CALL_FORM, BOOK_A_CALL_PATH } from '../../constants/routes.js'

function normalizeBookCallHref(href) {
  if (!href || href === BOOK_A_CALL_PATH) return BOOK_A_CALL_FORM
  if (href.startsWith(BOOK_A_CALL_PATH) && !href.includes('#')) return BOOK_A_CALL_FORM
  return href
}

/** Map client matrix CTAs to live app routes until /contact/* pages exist. */
function enrichService(pillar, slug, data) {
  return {
    pillar,
    slug,
    ...data,
    ctaHref: normalizeBookCallHref(data.ctaHref),
    relatedServices: data.relatedServices ?? [],
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
