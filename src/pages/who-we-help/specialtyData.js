import { allSpecialties } from '../../assets/specialty-content-matrix/content-matrix.js'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'

/** Map client matrix CTAs to live app routes until /contact/* pages exist. */
function withAppRoutes(slug, data) {
  return {
    slug,
    ...data,
    ctaHref: BOOK_A_CALL_FORM,
    proof: {
      ...data.proof,
      talkToHref: BOOK_A_CALL_FORM,
      referenceHref: BOOK_A_CALL_FORM,
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
