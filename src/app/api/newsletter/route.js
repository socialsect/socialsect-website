import { adaptRunHandler } from '../../../../lib/next-api-adapter.js'
import { processNewsletter } from '../../../../lib/handlers/newsletter.js'

export async function POST(request) {
  return adaptRunHandler(request, processNewsletter)
}

export async function OPTIONS(request) {
  return adaptRunHandler(request, processNewsletter)
}
