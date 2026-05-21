import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeoConfig } from '../lib/seo'

function setManagedMeta(documentHead, attrs, content) {
  const selector = Object.entries(attrs)
    .map(([key, value]) => `[${key}="${CSS.escape(value)}"]`)
    .join('')
  let tag = documentHead.querySelector(`meta${selector}`)

  if (!tag) {
    tag = document.createElement('meta')
    Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value))
    tag.setAttribute('data-seo-managed', 'true')
    documentHead.appendChild(tag)
  }

  tag.setAttribute('content', content)
  tag.setAttribute('data-seo-managed', 'true')
}

function setManagedLink(documentHead, attrs) {
  const selector = Object.entries(attrs)
    .map(([key, value]) => `[${key}="${CSS.escape(value)}"]`)
    .join('')
  let tag = documentHead.querySelector(`link${selector}`)

  if (!tag) {
    tag = document.createElement('link')
    Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value))
    tag.setAttribute('data-seo-managed', 'true')
    documentHead.appendChild(tag)
  }

  Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value))
  tag.setAttribute('data-seo-managed', 'true')
}

function setJsonLd(documentHead, schemas) {
  schemas.forEach((schema, index) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo-managed', 'true')
    script.setAttribute('data-seo-schema-index', String(index))
    script.textContent = JSON.stringify(schema)
    documentHead.appendChild(script)
  })
}

export default function SeoManager() {
  const location = useLocation()

  useEffect(() => {
    const { title, description, canonicalUrl, image, robots, tags, schemas, ogType } =
      getSeoConfig(location.pathname)
    const documentHead = document.head
    const managedNodes = documentHead.querySelectorAll('[data-seo-managed="true"]')
    managedNodes.forEach((node) => node.remove())

    document.title = title

    setManagedMeta(documentHead, { name: 'description' }, description)
    setManagedMeta(documentHead, { name: 'robots' }, robots)
    setManagedMeta(documentHead, { property: 'og:title' }, title)
    setManagedMeta(documentHead, { property: 'og:description' }, description)
    setManagedMeta(documentHead, { property: 'og:type' }, ogType)
    setManagedMeta(documentHead, { property: 'og:url' }, canonicalUrl)
    setManagedMeta(documentHead, { property: 'og:image' }, image)
    setManagedMeta(documentHead, { property: 'og:image:alt' }, title)
    setManagedMeta(documentHead, { property: 'og:site_name' }, 'Socialsect')
    setManagedMeta(documentHead, { property: 'og:locale' }, 'en_US')
    setManagedMeta(documentHead, { name: 'twitter:card' }, 'summary_large_image')
    setManagedMeta(documentHead, { name: 'twitter:title' }, title)
    setManagedMeta(documentHead, { name: 'twitter:description' }, description)
    setManagedMeta(documentHead, { name: 'twitter:image' }, image)
    setManagedMeta(documentHead, { name: 'twitter:image:alt' }, title)

    if (tags.length > 0) {
      setManagedMeta(documentHead, { name: 'keywords' }, tags.join(', '))
    }

    setManagedLink(documentHead, { rel: 'canonical', href: canonicalUrl })
    setJsonLd(documentHead, schemas)

    return () => {
      documentHead.querySelectorAll('[data-seo-managed="true"]').forEach((node) => node.remove())
    }
  }, [location.pathname])

  return null
}