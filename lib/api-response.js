export function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export function sendJson(res, statusCode, body) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

export async function runHandler(req, res, processor) {
  setCorsHeaders(res)

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' })
    return
  }

  try {
    let body = req.body
    if (body == null || body === '') {
      body = {}
    } else if (typeof body === 'string') {
      body = JSON.parse(body)
    }
    const result = await processor(body)
    sendJson(res, 200, result)
  } catch (err) {
    const statusCode = err.statusCode ?? 500
    const message =
      statusCode === 500 && !err.statusCode
        ? 'Something went wrong. Please try again.'
        : err.message
    sendJson(res, statusCode, { error: message })
  }
}
