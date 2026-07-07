'use client'
import { useEffect, useState, useCallback } from 'react'
import { submitForm } from '../lib/submitForm'
import './DelayPopup.css'

const POPUP_SEEN_KEY = 'delayPopupSeen'
const POPUP_TIME_KEY = 'delayPopupLastShown'

export default function DelayPopup() {
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const show = useCallback(() => {
    setVisible(true)
    try {
      sessionStorage.setItem(POPUP_TIME_KEY, Date.now().toString())
    } catch {}
  }, [])

  const hide = useCallback(() => {
    setVisible(false)
    try {
      localStorage.setItem(POPUP_SEEN_KEY, '1')
    } catch {}
  }, [])

  useEffect(() => {
    let timer

    const check = () => {
      try {
        const seen = localStorage.getItem(POPUP_SEEN_KEY)
        const lastShown = parseInt(sessionStorage.getItem(POPUP_TIME_KEY) || '0', 10)
        const now = Date.now()
        const elapsed = now - lastShown

        if (seen === '1') return

        if (lastShown && elapsed < 30000) {
          const remaining = 30000 - elapsed
          timer = setTimeout(show, remaining)
        } else {
          timer = setTimeout(show, 4000 + Math.random() * 1000)
        }
      } catch {
        timer = setTimeout(show, 4000)
      }
    }

    check()

    return () => clearTimeout(timer)
  }, [show])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !name) return
    setLoading(true)
    setError('')
    try {
      await submitForm('/api/newsletter', {
        email,
        name,
        source: 'popup',
      })
      setSubmitted(true)
      setTimeout(hide, 2000)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <div className="delay-popup-overlay" onClick={hide}>
      <div className="delay-popup" onClick={(e) => e.stopPropagation()}>
        <button className="delay-popup__close" onClick={hide} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="delay-popup__success">
            <p className="delay-popup__thanks">You're on the list.</p>
            <p className="delay-popup__sub">We'll send you actionable insights for your practice.</p>
          </div>
        ) : (
          <>
            <p className="delay-popup__eyebrow">Free practice growth insights</p>
            <h2 className="delay-popup__title">
              Get articles on patient acquisition, SEO, and paid ads — written for private practices.
            </h2>
            <p className="delay-popup__desc">
              No spam. Unsubscribe any time.
            </p>
            <form className="delay-popup__form" onSubmit={handleSubmit}>
              <input
                className="delay-popup__input"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="delay-popup__input"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="delay-popup__btn" type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Subscribe'}
              </button>
            </form>
            {error && <p className="delay-popup__error">{error}</p>}
            <p className="delay-popup__dismiss">
              <button type="button" onClick={hide} className="delay-popup__dismiss-link">
                No thanks, I'll read the article
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
