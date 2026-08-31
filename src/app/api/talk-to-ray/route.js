import { adaptRunHandler } from '../../../../lib/next-api-adapter.js'
import { processTalkToRay } from '../../../../lib/handlers/talk-to-ray.js'

export async function POST(request) {
  return adaptRunHandler(request, processTalkToRay)
}

export async function OPTIONS(request) {
  return adaptRunHandler(request, processTalkToRay)
}
