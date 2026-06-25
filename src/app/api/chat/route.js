import { adaptRunHandler } from '../../../../lib/next-api-adapter.js'
import { processChat } from '../../../../lib/handlers/chat.js'

export async function POST(request) {
  return adaptRunHandler(request, processChat)
}

export async function OPTIONS(request) {
  return adaptRunHandler(request, processChat)
}
