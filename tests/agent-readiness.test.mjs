import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { prefersMarkdown, htmlToMarkdown, notFoundMarkdown } from '../src/lib/markdown.js'
import { getSeoConfig } from '../src/lib/seo.js'

test('prefersMarkdown follows Accept ranking', () => {
  assert.equal(prefersMarkdown('text/markdown'), true)
  assert.equal(prefersMarkdown('text/markdown, text/html;q=0.5'), true)
  assert.equal(prefersMarkdown('text/html'), false)
  assert.equal(prefersMarkdown('text/html, text/markdown;q=0.5'), false)
  assert.equal(prefersMarkdown('*/*'), false)
  assert.equal(prefersMarkdown(''), false)
})

test('htmlToMarkdown converts main content and drops chrome', () => {
  const md = htmlToMarkdown(
    '<html><head><title>T &amp; Co</title><meta name="description" content="Desc"></head><body><nav>menu</nav><main><h1>Hi</h1><p>Text <a href="/x">link</a></p><ul><li>A</li></ul><script>bad()</script></main></body></html>',
  )
  assert.match(md, /^# T & Co/)
  assert.match(md, /> Desc/)
  assert.match(md, /# Hi/)
  assert.match(md, /\[link\]\(https:\/\/gosocialsect\.com\/x\)/)
  assert.match(md, /- A/)
  assert.doesNotMatch(md, /menu|bad\(\)/)
})

test('404 markdown has an explanation and links', () => {
  const md = notFoundMarkdown('/nope')
  assert.ok(md.length > 20)
  assert.match(md, /\/nope/)
  assert.match(md, /llms\.txt/)
  assert.match(md, /sitemap\.xml/)
})

test('organization schema is complete', () => {
  const org = getSeoConfig('/').schemas.find((s) => s['@id']?.endsWith('#organization'))
  assert.ok([].concat(org['@type']).includes('Organization'))
  assert.equal(org.address['@type'], 'PostalAddress')
  assert.ok(org.contactPoint[0].contactType && org.contactPoint[0].email)
})

test('contact page is registered, in sitemap and llms.txt', () => {
  assert.equal(getSeoConfig('/contact').canonicalUrl, 'https://gosocialsect.com/contact')
  assert.match(readFileSync('public/sitemap.xml', 'utf8'), /gosocialsect\.com\/contact</)
  assert.match(readFileSync('public/llms.txt', 'utf8'), /## When to use Socialsect/)
})
