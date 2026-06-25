import { adaptBookAuditHandler } from '../../../../lib/next-api-adapter.js'

export async function POST(request) {
  return adaptBookAuditHandler(request)
}

export async function OPTIONS(request) {
  return adaptBookAuditHandler(request)
}
