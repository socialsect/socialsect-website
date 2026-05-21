import { runHandler } from '../lib/api-response.js'
import { processReferenceRequest } from '../lib/handlers/reference-request.js'

export default function handler(req, res) {
  return runHandler(req, res, processReferenceRequest)
}
