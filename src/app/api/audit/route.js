import { adaptRunHandler } from '../../../../lib/next-api-adapter.js'
import { processAudit } from '../../../../lib/handlers/audit.js'

export async function POST(request) {
  return adaptRunHandler(request, processAudit)
}

export async function OPTIONS(request) {
  return adaptRunHandler(request, processAudit)
}
