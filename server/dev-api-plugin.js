import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import { processBookACall } from '../lib/handlers/book-a-call.js'
import { processNewsletter } from '../lib/handlers/newsletter.js'
import { processReferenceRequest } from '../lib/handlers/reference-request.js'
import { processResourceDownload } from '../lib/handlers/resource-download.js'
import { processChat } from '../lib/handlers/chat.js'
import { processAuditChat } from '../lib/handlers/audit-chat.js'
import { processVisibilitySnapshot } from '../lib/handlers/visibility-snapshot.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const repoRoot = path.resolve(projectRoot, '..')

const ROUTES = {
  '/api/book-a-call': processBookACall,
  '/api/newsletter': processNewsletter,
  '/api/reference-request': processReferenceRequest,
  '/api/resource-download': processResourceDownload,
  '/api/chat': processChat,
  '/api/chat/audit': processAuditChat,
  '/api/visibility-snapshot': processVisibilitySnapshot,
}

function loadProjectEnv(mode = 'development') {
  const env = {
    ...loadEnv(mode, repoRoot, ''),
    ...loadEnv(mode, projectRoot, ''),
  }
  Object.assign(process.env, env)
  return env
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks).toString()))
    req.on('error', reject)
  })
}

function errorMessage(err, isDev) {
  if (isDev) return err.message || 'Unknown error'
  if (err.statusCode && err.statusCode < 500) return err.message
  return 'Something went wrong. Please try again.'
}

export function devApiPlugin() {
  return {
    name: 'dev-api',
    configureServer(server) {
      loadProjectEnv(server.config.mode)

      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url?.split('?')[0]
        const processor = ROUTES[pathname]
        if (!processor) return next()

        const isDev = server.config.mode !== 'production'

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        try {
          if (!process.env.RESEND2) {
            loadProjectEnv(server.config.mode)
          }

          const raw = await readBody(req)
          let payload = {}
          if (raw) {
            try {
              payload = JSON.parse(raw)
            } catch {
              throw Object.assign(new Error('Invalid JSON body'), { statusCode: 400 })
            }
          }

          const requestMeta = {
            userAgent: req.headers['user-agent'] ?? '',
            ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.headers['x-real-ip'] || '',
          }
          const result = await processor(payload, requestMeta)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result))
        } catch (err) {
          console.error(`[dev-api] ${pathname}`, err)
          const statusCode = err.statusCode ?? 500
          res.statusCode = statusCode
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: errorMessage(err, isDev) }))
        }
      })
    },
  }
}
