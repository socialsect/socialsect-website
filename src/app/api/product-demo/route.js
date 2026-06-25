import { adaptRunHandler } from '../../../../lib/next-api-adapter.js'
import { processProductDemo } from '../../../../lib/handlers/product-demo.js'

export async function POST(request) {
  return adaptRunHandler(request, processProductDemo)
}

export async function OPTIONS(request) {
  return adaptRunHandler(request, processProductDemo)
}
