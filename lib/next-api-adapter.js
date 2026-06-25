const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export function createMockResponse() {
  let statusCode = 200
  const headers = { ...CORS_HEADERS }
  let body = null

  const res = {
    statusCode,
    headers,
    setHeader(key, value) {
      headers[key] = value
      return res
    },
    status(code) {
      statusCode = code
      res.statusCode = code
      return res
    },
    json(data) {
      body = JSON.stringify(data)
      headers['Content-Type'] = 'application/json'
      return res
    },
    end(data) {
      if (data != null) body = data
      return res
    },
    getResponse() {
      return new Response(body, { status: statusCode, headers })
    },
  }

  return res
}

export async function adaptRunHandler(request, processor) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS })
  }

  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405, headers: CORS_HEADERS })
  }

  let body = {}
  try {
    body = await request.json()
  } catch {
    body = {}
  }

  const req = {
    method: 'POST',
    body,
    headers: Object.fromEntries(request.headers.entries()),
  }

  const res = createMockResponse()

  const originalEnd = res.end.bind(res)
  res.end = (data) => {
    if (data != null && res.headers['Content-Type'] !== 'application/json') {
      res.headers['Content-Type'] = 'application/json'
    }
    return originalEnd(data)
  }

  const { runHandler } = await import('./api-response.js')
  await runHandler(req, res, processor)
  return res.getResponse()
}

export async function adaptBookAuditHandler(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS })
  }

  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405, headers: CORS_HEADERS })
  }

  const body = await request.json()
  const req = {
    method: 'POST',
    body,
    headers: Object.fromEntries(request.headers.entries()),
  }

  const res = createMockResponse()
  const { handleBookAudit } = await import('./handlers/book-audit.js')
  await handleBookAudit(req, res)
  return res.getResponse()
}
