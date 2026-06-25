import fs from 'node:fs'
import path from 'node:path'

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath)
    } else if (entry.name === 'page.jsx' || entry.name === 'not-found.jsx') {
      const content = fs.readFileSync(fullPath, 'utf8')
      if (!content.startsWith("'use client'")) {
        fs.writeFileSync(fullPath, `'use client'\n\n${content}`)
      }
    }
  }
}

walk('app')
