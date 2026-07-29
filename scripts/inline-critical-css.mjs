#!/usr/bin/env node
/**
 * Post-build script to inline CSS into server-rendered HTML.
 * Supports webpack (_next/static/css/) and turbopack (_next/static/chunks/) paths.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const NEXT_SERVER_DIR = join(__dirname, '..', '.next', 'server', 'app')
const STATIC_DIR = join(__dirname, '..', '.next', 'static')

function findAllCssFiles(dir) {
  const results = {}
  if (!existsSync(dir)) return results
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    if (statSync(fullPath).isDirectory()) {
      const sub = findAllCssFiles(fullPath)
      Object.assign(results, sub)
    } else if (entry.endsWith('.css')) {
      results[entry] = fullPath
    }
  }
  return results
}

function inlineCssInHtml(htmlPath, cssMap) {
  const original = readFileSync(htmlPath, 'utf-8')
  const cssLinkRegex = /<link rel="stylesheet" href="(\/_next\/static\/[^"]*?\/[^"]*\.css)"[^>]*\/>/g
  const matches = [...original.matchAll(cssLinkRegex)]
  if (matches.length === 0) return false

  let cssContent = ''
  let newHtml = original
  for (const match of matches) {
    const [fullTag, cssUrl] = match
    const filename = cssUrl.split('/').pop()
    const filepath = cssMap[filename]
    if (!filepath) {
      console.warn(`  ⚠ CSS file not found: ${filename}`)
      continue
    }
    cssContent += readFileSync(filepath, 'utf-8') + '\n'
    newHtml = newHtml.replace(fullTag, '')
  }

  if (!cssContent) return false
  newHtml = newHtml.replace('<head>', `<head><style data-inlined="1">${cssContent}</style>`)

  if (original === newHtml) {
    console.warn(`  ⚠ No changes for ${htmlPath.split('/').pop()}`)
    return false
  }

  const cssKb = (cssContent.length / 1024).toFixed(1)
  const origKb = (original.length / 1024).toFixed(0)
  const newKb = (newHtml.length / 1024).toFixed(0)
  console.log(`  ✅ ${htmlPath.split('/').pop().padEnd(30)} ${cssKb} KB inlined  (${origKb} KB → ${newKb} KB)`)
  writeFileSync(htmlPath, newHtml, 'utf-8')
  return true
}

function walkDir(dir) {
  const results = []
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    if (statSync(fullPath).isDirectory()) results.push(...walkDir(fullPath))
    else if (entry.endsWith('.html')) results.push(fullPath)
  }
  return results
}

console.log('\n🔧 Inlining referenced CSS into server-rendered HTML...')

if (!existsSync(NEXT_SERVER_DIR)) {
  console.error('  ❌ .next/server/app not found. Run `next build` first!')
  process.exit(1)
}

const cssMap = findAllCssFiles(STATIC_DIR)
console.log(`  Found ${Object.keys(cssMap).length} CSS files in .next/static/`)

const htmlFiles = walkDir(NEXT_SERVER_DIR)
console.log(`  Found ${htmlFiles.length} HTML files`)

let count = 0
for (const file of htmlFiles) {
  if (inlineCssInHtml(file, cssMap)) count++
}

console.log(`\n✅ Done — ${count} HTML files updated (render-blocking CSS eliminated)\n`)