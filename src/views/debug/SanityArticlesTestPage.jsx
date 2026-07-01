'use client'

import { useEffect, useState } from 'react'
import { getArticles } from '../../lib/articles'

export default function SanityArticlesTestPage() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadArticles() {
      try {
        const data = await getArticles()
        console.log('Sanity articles:', data)
        if (isMounted) {
          setArticles(data)
        }
      } catch (err) {
        console.error('Failed to load Sanity articles:', err)
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load Sanity articles')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadArticles()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Sanity Articles Test</h1>
      <p>This page logs the current Sanity posts to the console and renders a quick preview.</p>

      {loading && <p>Loading articles...</p>}
      {error && <p role="alert">{error}</p>}

      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <strong>{article.title}</strong> {article.slug ? `(${article.slug})` : null}
          </li>
        ))}
      </ul>
    </main>
  )
}