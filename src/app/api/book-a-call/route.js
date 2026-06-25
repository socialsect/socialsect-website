import { adaptRunHandler } from '../../../../lib/next-api-adapter.js'
import { processBookACall } from '../../../../lib/handlers/book-a-call.js'

export async function POST(request) {
  return adaptRunHandler(request, processBookACall)
}

export async function OPTIONS(request) {
  return adaptRunHandler(request, processBookACall)
}
