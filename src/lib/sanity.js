import { createClient } from '@sanity/client'

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  process.env.VITE_SANITY_PROJECT_ID ??
  'nj6mz3im'
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  process.env.VITE_SANITY_DATASET ??
  'production'
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ??
  process.env.VITE_SANITY_API_VERSION ??
  '2025-05-30'

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})
