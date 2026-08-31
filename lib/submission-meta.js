/** Labels for team notification emails (form + page URL). */
export const FORM_TYPE_LABELS = {
  '/api/book-a-call': 'Book a call',
  '/api/reference-request': 'Reference request',
  '/api/resource-download': 'Resource download',
  '/api/newsletter': 'Newsletter',
  '/api/product-demo': 'Product demo request',
  '/api/uae-karak': 'UAE Karak',
  '/api/talk-to-ray': 'Talk to Ray',
}

export function resolveFormType(payload = {}, endpoint = '') {
  const explicit = String(payload.formType ?? '').trim()
  if (explicit) return explicit
  return FORM_TYPE_LABELS[endpoint] ?? ''
}

export function resolveSourcePageUrl(payload = {}) {
  const url = String(payload.sourcePageUrl ?? '').trim()
  if (!url) return ''
  if (!/^https?:\/\//i.test(url)) return ''
  if (url.length > 2048) return url.slice(0, 2048)
  return url
}

/** Rows for linesToHtml  Form name and full page URL where the user submitted. */
export function submissionMetaRows(payload = {}, endpoint = '') {
  const rows = []
  const formType = resolveFormType(payload, endpoint)
  const sourcePageUrl = resolveSourcePageUrl(payload)

  if (formType) rows.push(['Form', formType])
  if (sourcePageUrl) rows.push(['Page URL', sourcePageUrl])

  return rows
}
