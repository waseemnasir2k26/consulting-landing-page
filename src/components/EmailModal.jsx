import { useState } from 'react'

export default function EmailModal({ isOpen, onClose, onSuccess }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) { setError('Please enter your name'); return }
    if (!validateEmail(email)) { setError('Please enter a valid email'); return }
    setError('')
    setSubmitted(true)
    setTimeout(() => {
      onSuccess({ name, email })
    }, 2000)
  }

  const handleClose = () => {
    setSubmitted(false)
    setEmail('')
    setName('')
    setError('')
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
          style={{ background: 'none', border: 'none', fontSize: '1.5rem' }}
        >
          &#x2715;
        </button>

        {!submitted ? (
          <>
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(212, 168, 83, 0.15)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              Get Your Free Assessment
            </h3>
            <p className="text-slate-400 text-center mb-6 text-sm">
              Enter your details below to download our strategic assessment questionnaire — the same tool we use with our $50K+ engagements.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError('') }}
                  className="input-gold"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your business email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  className="input-gold"
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button type="submit" className="btn-gold w-full mt-2">
                Download Free Questionnaire
              </button>
              <p className="text-slate-500 text-xs text-center">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'rgba(34, 197, 94, 0.15)' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              Thank You, {name}!
            </h3>
            <p className="text-slate-400 mb-2">
              Your questionnaire is downloading now.
            </p>
            <p className="text-slate-500 text-sm">
              Check your email for next steps.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
