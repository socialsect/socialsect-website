import { adaptRunHandler } from '../../../../lib/next-api-adapter.js'
import { processReferenceRequest } from '../../../../lib/handlers/reference-request.js'

export async function POST(request) {
  return adaptRunHandler(request, processReferenceRequest)
}

export async function OPTIONS(request) {
  return adaptRunHandler(request, processReferenceRequest)
}
