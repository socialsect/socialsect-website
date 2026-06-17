import { runHandler } from '../lib/api-response.js'
import { processChat } from '../lib/handlers/chat.js'

export default function handler(req, res) {
  return runHandler(req, res, processChat)
}
