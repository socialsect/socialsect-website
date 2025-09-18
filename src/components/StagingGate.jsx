import { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const STORAGE_KEY = 'staging_session_until'
const HOURS_12_MS = 12 * 60 * 60 * 1000

export default function StagingGate({ children }) {
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    try {
      const untilStr = localStorage.getItem(STORAGE_KEY)
      if (untilStr) {
        const until = parseInt(untilStr, 10)
        if (!Number.isNaN(until) && Date.now() < until) {
          setAuthorized(true)
          setLoading(false)
          return
        }
      }
    } catch (_) {}
    setLoading(false)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/staging-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.error || 'Authentication failed')
        return
      }
      const until = Date.now() + HOURS_12_MS
      try { localStorage.setItem(STORAGE_KEY, String(until)) } catch (_) {}
      setAuthorized(true)
    } catch (err) {
      setError('Network error')
    }
  }

  function handleLogout() {
    try { localStorage.removeItem(STORAGE_KEY) } catch (_) {}
    setAuthorized(false)
    setPassword('')
    setShowPassword(false)
  }

  if (loading) return null
  if (authorized) return (
    <>
      {children}
    </>
  )

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0b0b0b',
      color: '#eaeaea',
      padding: '24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 420,
        background: '#121212',
        border: '1px solid #1f1f1f',
        borderRadius: 12,
        padding: 24,
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
      }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>Staging Access</h1>
        <p style={{ marginTop: 8, color: '#b5b5b5', fontSize: 14 }}>
          This environment is protected. Enter the staging password to continue.
        </p>
        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <label htmlFor="staging-password" style={{ display: 'block', fontSize: 13, color: '#c9c9c9', marginBottom: 6 }}>Password</label>
          <div style={{ position: 'relative' }}>
            <input
              id="staging-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{
                width: '100%',
                padding: '12px 45px 12px 14px',
                borderRadius: 8,
                border: '1px solid #2a2a2a',
                background: '#0d0d0d',
                color: '#eaeaea',
                outline: 'none'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#c9c9c9',
                cursor: 'pointer',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error ? (
            <div style={{ color: '#ff6b6b', fontSize: 13, marginTop: 8 }}>{error}</div>
          ) : null}
          <button type="submit" style={{
            marginTop: 14,
            width: '100%',
            padding: '12px 14px',
            borderRadius: 8,
            border: '1px solid #2a2a2a',
            background: '#1a1a1a',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer'
          }}>Unlock</button>
        </form>
        <button onClick={handleLogout} style={{
          marginTop: 8,
          width: '100%',
          padding: '10px 14px',
          borderRadius: 8,
          border: '1px solid #2a2a2a',
          background: '#101010',
          color: '#bdbdbd',
          cursor: 'pointer'
        }}>Clear Session</button>
        <p style={{ marginTop: 10, color: '#8e8e8e', fontSize: 12 }}>
          Access persists for 12 hours in this browser.
        </p>
      </div>
    </div>
  )
}


