import { runHandler } from '../lib/api-response.js'
import { processProductDemo } from '../lib/handlers/product-demo.js'

export default function handler(req, res) {
  return runHandler(req, res, processProductDemo)
}
