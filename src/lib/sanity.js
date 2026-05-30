import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? 'nj6mz3im'
const dataset = import.meta.env.VITE_SANITY_DATASET ?? 'production'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? '2025-05-30'

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})