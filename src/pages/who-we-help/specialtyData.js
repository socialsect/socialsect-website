import { allSpecialties } from '../../assets/specialty-content-matrix/content-matrix.js'

const BOOK_A_CALL = '/book-a-call'

/** Map client matrix CTAs to live app routes until /contact/* pages exist. */
function withAppRoutes(slug, data) {
  return {
    slug,
    ...data,
    ctaHref: BOOK_A_CALL,
    proof: {
      ...data.proof,
      talkToHref: BOOK_A_CALL,
      referenceHref: BOOK_A_CALL,
    },
  }
}

export const specialtyData = Object.fromEntries(
  allSpecialties.map(({ slug, data }) => [slug, withAppRoutes(slug, data)]),
)

export function getSpecialtyData(slug) {
  return specialtyData[slug] ?? null
}

export function getAllSpecialtySlugs() {
  return allSpecialties.map(({ slug }) => slug)
}
