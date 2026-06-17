import React, { useState, useRef, useEffect } from 'react'
import './GrowthAuditorWidget.css'

export default function GrowthAuditorWidget({ onClose }) {
  const [mode, setMode] = useState('menu') // menu | info | audit | question | result
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm Socialsect's AI growth assistant. I can help you learn about our services, audit your website, or answer questions about healthcare marketing. What would you like to do?"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [auditData, setAuditData] = useState({ name: '', email: '', website: '' })
  const [auditStep, setAuditStep] = useState('name') // name | email | website | analyzing | complete
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (text, type = 'user') => {
    setMessages(prev => [...prev, { type, text }])
  }

  const handleModeSelect = (selectedMode) => {
    if (selectedMode === 'info') {
      setMode('info')
      addMessage('Tell me about Socialsect', 'user')
      handleInfoQuery('Tell me about Socialsect')
    } else if (selectedMode === 'audit') {
      setMode('audit')
      addMessage("Let's audit my website", 'user')
      setAuditStep('name')
      addMessage("Great! Let's start with your name. What should I call you?", 'bot')
    } else if (selectedMode === 'question') {
      setMode('question')
      setInput('')
    }
  }

  const handleInfoQuery = async (query) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, mode: 'info' })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const text = await response.text()
      
      if (!text) {
        throw new Error('Empty response from server')
      }

      let data
      try {
        data = JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse JSON:', text)
        throw new Error('Invalid response format')
      }

      if (data.success) {
        addMessage(data.response, 'bot')
        if (data.nextSteps) {
          addMessage('Would you like to audit your website or ask another question?', 'bot')
        }
      } else {
        setError(data.error || 'Failed to get response')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAuditInput = (value) => {
    if (auditStep === 'name') {
      if (value.trim().length > 0) {
        setAuditData(prev => ({ ...prev, name: value }))
        addMessage(value, 'user')
        setAuditStep('email')
        addMessage("Thanks! Now, what's your email address?", 'bot')
        setInput('')
      }
    } else if (auditStep === 'email') {
      if (value.includes('@')) {
        setAuditData(prev => ({ ...prev, email: value }))
        addMessage(value, 'user')
        setAuditStep('website')
        addMessage("Perfect! What's your website URL? (e.g., mymedicalclinic.com)", 'bot')
        setInput('')
      }
    } else if (auditStep === 'website') {
      if (value.trim().length > 0) {
        setAuditData(prev => ({ ...prev, website: value }))
        addMessage(value, 'user')
        setAuditStep('analyzing')
        addMessage('Analyzing your website...', 'bot')
        runWebsiteAudit(auditData.name, auditData.email, value)
        setInput('')
      }
    }
  }

  const runWebsiteAudit = async (name, email, website) => {
    setLoading(true)
    setError(null)

    try {
      // Build transcript
      const transcript = messages.map(m => `${m.type === 'user' ? 'You' : 'Assistant'}: ${m.text}`).join('\n')

      const response = await fetch('/api/chat/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          website,
          conversationTranscript: transcript
        })
      })

      const data = await response.json()

      if (data.success) {
        addMessage(data.analysis, 'bot')
        addMessage("We've sent your full audit analysis to your email. Our team will reach out to schedule a 10-15 minute strategy call to discuss these findings and next steps.", 'bot')
        setAuditStep('complete')
        setMode('result')
      } else {
        setError(data.error || 'Audit failed. Please try again.')
        setAuditStep('website')
      }
    } catch (err) {
      setError('Network error during audit. Please try again.')
      setAuditStep('website')
    } finally {
      setLoading(false)
    }
  }

  const handleQuestionSubmit = async (e) => {
    e.preventDefault()

    if (!input.trim()) return

    const question = input
    addMessage(question, 'user')
    setInput('')
    setLoading(true)
    setError(null)

    try {
      // Just send to backend - it will handle the AI response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, mode: 'question' })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const text = await response.text()
      
      if (!text) {
        throw new Error('Empty response from server')
      }

      let data
      try {
        data = JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse JSON:', text)
        throw new Error('Invalid response format')
      }

      if (data.success) {
        addMessage(data.response || 'Got it!', 'bot')
      } else {
        addMessage('Sorry, I had trouble answering that. Please try again.', 'bot')
      }
    } catch (err) {
      console.error('Error:', err)
      addMessage('Network error. Please try again.', 'bot')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="chat-backdrop" onClick={onClose} />
      
      <div className="chat-widget">
        {/* Header */}
        <div className="chat-widget__header">
          <h2 className="chat-widget__title">Socialsect AI Assistant</h2>
          <button 
            className="chat-widget__close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="chat-widget__messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message chat-message--${msg.type}`}>
              <div className="chat-message__content">{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-message chat-message--bot">
              <div className="chat-message__content">
                <span className="chat-loading">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Menu */}
        {mode === 'menu' && (
          <div className="chat-widget__menu">
            <button 
              className="chat-menu__button"
              onClick={() => handleModeSelect('info')}
            >
              <svg className="chat-menu__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
              Learn About Socialsect
            </button>
            <div className="chat-menu__button-wrapper">
              <button 
                className="chat-menu__button chat-menu__button--disabled"
                disabled
              >
                <svg className="chat-menu__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 100 16 8 8 0 000-16m1 4h-2v6h2V8m-1 8a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
                Audit My Website
              </button>
              <span className="chat-menu__badge">Coming Soon</span>
            </div>
            <button 
              className="chat-menu__button"
              onClick={() => handleModeSelect('question')}
            >
              <svg className="chat-menu__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 18c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8m.5-13H11v6h1.5V7m0 8h-1.5v1.5H12V15z"/>
              </svg>
              Ask a Question
            </button>
            <form onSubmit={handleQuestionSubmit} className="chat-widget__form">
              <div className="chat-widget__input-group">
                <input
                  type="text"
                  placeholder="Or type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                  className="chat-widget__input"
                />
                <button 
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="chat-widget__send"
                >
                  →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Input */}
        {(mode === 'info' || mode === 'question' || (mode === 'audit' && auditStep !== 'complete' && auditStep !== 'analyzing')) && mode !== 'menu' && (
          <form onSubmit={handleQuestionSubmit} className="chat-widget__form">
            {error && <p className="chat-widget__error">{error}</p>}
            <div className="chat-widget__input-group">
              <input
                type={auditStep === 'email' ? 'email' : 'text'}
                placeholder={
                  auditStep === 'name' ? 'Type your name...' :
                  auditStep === 'email' ? 'Type your email...' :
                  auditStep === 'website' ? 'Type your website URL...' :
                  'Type your message...'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="chat-widget__input"
              />
              {mode === 'audit' ? (
                <button 
                  type="button"
                  onClick={() => handleAuditInput(input)}
                  disabled={loading || !input.trim()}
                  className="chat-widget__send"
                >
                  →
                </button>
              ) : (
                <button 
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="chat-widget__send"
                >
                  →
                </button>
              )}
            </div>
          </form>
        )}

        {/* Result */}
        {mode === 'result' && (
          <div className="chat-widget__footer">
            <button 
              className="chat-widget__button"
              onClick={onClose}
            >
              Close Chat
            </button>
          </div>
        )}
      </div>
    </>
  )
}

