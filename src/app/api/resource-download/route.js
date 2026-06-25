import { adaptRunHandler } from '../../../../lib/next-api-adapter.js'
import { processResourceDownload } from '../../../../lib/handlers/resource-download.js'

export async function POST(request) {
  return adaptRunHandler(request, processResourceDownload)
}

export async function OPTIONS(request) {
  return adaptRunHandler(request, processResourceDownload)
}
