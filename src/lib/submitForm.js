import { FORM_TYPE_LABELS } from '../../lib/submission-meta.js'

export async function submitForm(endpoint, payload = {}) {
  const enriched = {
    ...payload,
    formType: payload.formType ?? FORM_TYPE_LABELS[endpoint] ?? '',
    sourcePageUrl:
      payload.sourcePageUrl ??
      (typeof window !== 'undefined' ? window.location.href : ''),
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enriched),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Unable to submit. Please try again.')
  }
  return data
}
