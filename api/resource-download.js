import { runHandler } from '../lib/api-response.js'
import { processResourceDownload } from '../lib/handlers/resource-download.js'

export default function handler(req, res) {
  return runHandler(req, res, processResourceDownload)
}
