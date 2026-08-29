import { adaptRunHandler } from '../../../../lib/next-api-adapter.js'
import { processUaeKarak } from '../../../../lib/handlers/uae-karak.js'

export async function POST(request) {
  return adaptRunHandler(request, processUaeKarak)
}

export async function OPTIONS(request) {
  return adaptRunHandler(request, processUaeKarak)
}
