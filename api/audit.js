/**
 * Website Audit API Endpoint
 * 
 * POST /api/audit
 * Processes website audits with PageSpeed analysis
 */

import { runHandler } from '../lib/api-response.js'
import { processAudit } from '../lib/handlers/audit.js'

export default function handler(req, res) {
  return runHandler(req, res, processAudit)
}
