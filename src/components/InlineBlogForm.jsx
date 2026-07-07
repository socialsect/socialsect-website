'use client'
import { useState } from 'react'
import { submitForm } from '../lib/submitForm'
import './InlineBlogForm.css'

export default function InlineBlogForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !name) return
    setLoading(true)
    setError('')
    try {
      await submitForm('/api/newsletter', {
        email,
        name,
        source: 'blog-inline',
      })
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="inline-blog-form inline-blog-form--success">
        <p className="inline-blog-form__thanks">Thanks for subscribing.</p>
        <p className="inline-blog-form__sub">We'll send you actionable articles for practice growth.</p>
      </div>
    )
  }

  return (
    <form className="inline-blog-form" onSubmit={handleSubmit}>
      <p className="inline-blog-form__heading">Get articles like this in your inbox</p>
      <p className="inline-blog-form__desc">
        No spam. Unsubscribe any time.
      </p>
      <div className="inline-blog-form__fields">
        <input
          className="inline-blog-form__input"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="inline-blog-form__input"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="inline-blog-form__btn" type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Subscribe'}
        </button>
      </div>
      {error && <p className="inline-blog-form__error">{error}</p>}
    </form>
  )
}
