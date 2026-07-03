import { adaptRunHandler } from '../../../../../lib/next-api-adapter.js'
import { processAuditChat } from '../../../../../lib/handlers/audit-chat.js'

export const maxDuration = 60

export async function POST(request) {
  return adaptRunHandler(request, processAuditChat)
}

export async function OPTIONS(request) {
  return adaptRunHandler(request, processAuditChat)
}
