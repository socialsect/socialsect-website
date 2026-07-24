#!/usr/bin/env node
/**
 * Post-build script to inline CSS into server-rendered HTML.
 * Replaces <link rel="stylesheet" href="/_next/static/css/xxx.css"> with
 * <style> containing the actual CSS content.
 * 
 * Only inlines CSS files that are actually referenced in the HTML.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const NEXT_SERVER_DIR = join(__dirname, '..', '.next', 'server', 'app')
const CSS_DIR = join(__dirname, '..', '.next', 'static', 'css')

/**
 * Load CSS content for a specific CSS file path (relative URL like "/_next/static/css/xxx.css").
 */
function loadCssFile(cssUrl) {
  // Extract filename from URL like /_next/static/css/xxx.css
  const filename = cssUrl.split('/').pop()
  const filepath = join(CSS_DIR, filename)
  if (!existsSync(filepath)) {
    console.warn(`  ⚠ CSS file not found: ${filename}`)
    return null
  }
  return readFileSync(filepath, 'utf-8')
}

/**
 * Inline only the linked CSS files into an HTML file.
 */
function inlineCssInHtml(htmlPath) {
  const original = readFileSync(htmlPath, 'utf-8')
  
  // Find all Next.js CSS <link> tags
  const cssLinkRegex = /<link rel="stylesheet" href="(\/_next\/static\/css\/[^"]*\.css)"[^>]*\/>/g
  const matches = [...original.matchAll(cssLinkRegex)]
  
  if (matches.length === 0) return false
  
  let cssContent = ''
  let newHtml = original
  
  for (const match of matches) {
    const [fullTag, cssUrl] = match
    const content = loadCssFile(cssUrl)
    if (content === null) continue
    
    cssContent += content + '\n'
    // Remove the link tag
    newHtml = newHtml.replace(fullTag, '')
  }
  
  if (!cssContent) return false
  
  // Insert the combined <style> tag right after <head>
  // Use a single <style> with all CSS to minimize tags
  newHtml = newHtml.replace('<head>', `<head><style data-inlined="1">${cssContent}</style>`)
  
  if (original === newHtml) {
    console.warn(`  ⚠ No changes for ${htmlPath.split('/').pop()}`)
    return false
  }
  
  const cssKb = (cssContent.length / 1024).toFixed(1)
  const originalKb = (original.length / 1024).toFixed(0)
  const newKb = (newHtml.length / 1024).toFixed(0)
  console.log(`  ✅ ${htmlPath.split('/').pop().padEnd(30)} ${cssKb} KB inlined  (${originalKb} KB → ${newKb} KB)`)
  
  writeFileSync(htmlPath, newHtml, 'utf-8')
  return true
}

function walkDir(dir) {
  const results = []
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      results.push(...walkDir(fullPath))
    } else if (entry.endsWith('.html')) {
      results.push(fullPath)
    }
  }
  return results
}

console.log('\n🔧 Inlining referenced CSS into server-rendered HTML...')

if (!existsSync(CSS_DIR)) {
  console.error('  ❌ CSS directory not found:', CSS_DIR)
  console.error('     Run `next build` first!')
  process.exit(1)
}

const htmlFiles = walkDir(NEXT_SERVER_DIR)
console.log(`  Found ${htmlFiles.length} HTML files`)

let count = 0
for (const file of htmlFiles) {
  if (inlineCssInHtml(file)) count++
}

console.log(`\n✅ Done — ${count} HTML files updated (render-blocking CSS eliminated)\n`)
