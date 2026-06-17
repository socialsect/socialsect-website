import { runHandler } from '../../lib/api-response.js'
import { processAuditChat } from '../../lib/handlers/audit-chat.js'

export default function handler(req, res) {
  return runHandler(req, res, processAuditChat)
}
