import { adaptRunHandler } from '../../../../lib/next-api-adapter.js'
import { processVisibilitySnapshot } from '../../../../lib/handlers/visibility-snapshot.js'

export async function POST(request) {
  return adaptRunHandler(request, processVisibilitySnapshot)
}

export async function OPTIONS(request) {
  return adaptRunHandler(request, processVisibilitySnapshot)
}
