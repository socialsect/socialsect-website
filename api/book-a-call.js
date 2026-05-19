import { runHandler } from '../lib/api-response.js'
import { processBookACall } from '../lib/handlers/book-a-call.js'

export default function handler(req, res) {
  return runHandler(req, res, processBookACall)
}
