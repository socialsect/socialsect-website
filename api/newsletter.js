import { runHandler } from '../lib/api-response.js'
import { processNewsletter } from '../lib/handlers/newsletter.js'

export default function handler(req, res) {
  return runHandler(req, res, processNewsletter)
}
