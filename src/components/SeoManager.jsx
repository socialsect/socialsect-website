import { useEffect } from 'react'
import { useLocation, matchPath } from 'react-router-dom'
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
    const fetchSeoConfig = async () => {
      let config = getSeoConfig(location.pathname)
      
      // For blog articles, try to fetch live article data
      const articleMatch = matchPath('/insights/blog/:slug', location.pathname)
      if (articleMatch) {
        try {
          const response = await fetch(`https://gosocialsect.com/api/articles/${articleMatch.params.slug}`)
          if (response.ok) {
            const article = await response.json()
            // Override with live article data
            config = {
              ...config,
              title: article.title || config.title,
              description: article.description || config.description,
              image: article.image || undefined,
            }
          }
        } catch {
          // Use default config if fetch fails
        }
      }

      const { title, description, canonicalUrl, image, robots, tags, schemas, ogType } = config
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
      
      // Only set image-related tags if image is defined
      if (image) {
        setManagedMeta(documentHead, { property: 'og:image' }, image)
        setManagedMeta(documentHead, { property: 'og:image:secure_url' }, image)
        setManagedMeta(documentHead, { property: 'og:image:width' }, '1200')
        setManagedMeta(documentHead, { property: 'og:image:height' }, '630')
        setManagedMeta(documentHead, { property: 'og:image:type' }, 'image/png')
        setManagedMeta(documentHead, { property: 'og:image:alt' }, title)
      }
      
      setManagedMeta(documentHead, { property: 'og:site_name' }, 'Socialsect')
      setManagedMeta(documentHead, { property: 'og:locale' }, 'en_US')
      
      // Twitter Card Tags
      setManagedMeta(documentHead, { name: 'twitter:card' }, 'summary_large_image')
      setManagedMeta(documentHead, { name: 'twitter:site' }, '@thesocialsect')
      setManagedMeta(documentHead, { name: 'twitter:creator' }, '@thesocialsect')
      setManagedMeta(documentHead, { name: 'twitter:title' }, title)
      setManagedMeta(documentHead, { name: 'twitter:description' }, description)
      
      if (image) {
        setManagedMeta(documentHead, { name: 'twitter:image' }, image)
        setManagedMeta(documentHead, { name: 'twitter:image:alt' }, title)
      }
      
      // LinkedIn Tags
      setManagedMeta(documentHead, { property: 'linkedin:url' }, canonicalUrl)
      setManagedMeta(documentHead, { property: 'linkedin:title' }, title)
      setManagedMeta(documentHead, { property: 'linkedin:description' }, description)
      
      // Pinterest Tags
      setManagedMeta(documentHead, { property: 'pinterest:url' }, canonicalUrl)
      if (image) {
        setManagedMeta(documentHead, { property: 'pinterest:media' }, image)
      }
      setManagedMeta(documentHead, { property: 'pinterest:description' }, description)

      if (tags.length > 0) {
        setManagedMeta(documentHead, { name: 'keywords' }, tags.join(', '))
      }

      setManagedLink(documentHead, { rel: 'canonical', href: canonicalUrl })
      setJsonLd(documentHead, schemas)

      return () => {
        documentHead.querySelectorAll('[data-seo-managed="true"]').forEach((node) => node.remove())
      }
    }

    fetchSeoConfig()
  }, [location.pathname])

  return null
}