import { useRef, useEffect, useState } from 'react'
import axios from 'axios'

function useVisible(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return visible
}

export default function Contact() {
  const ref = useRef(null)
  const visible = useVisible(ref)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setErrMsg('Please fill in all required fields.')
      return
    }
    setStatus('loading')
    setErrMsg('')
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrMsg(err.response?.data?.message || 'Something went wrong. Please try again.')
    }
  }

  const inputStyle = {
    width: '100%', background: 'var(--bg)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    fontFamily: 'Syne, sans-serif', fontSize: '0.9rem',
    padding: '0.9rem 1rem', outline: 'none',
    transition: 'border-color 0.3s', boxSizing: 'border-box'
  }

  const labelStyle = {
    fontFamily: 'DM Mono, monospace', fontSize: '0.62rem',
    letterSpacing: '0.2em', color: 'var(--text-muted)',
    textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem'
  }

  const contactInfo = [
    { label: 'Email', val: 'abuturabhassankhan@gmail.com', href: 'mailto:abuturabhassankhan@gmail.com'  },
    { label: 'Phone', val: '+92 316-7354746', href: 'tel:+923096806855' },
    { label: 'Location', val: 'Model Town Q Block, Lahore', href: null },
    { label: 'LinkedIn', val: 'linkedin.com/in/abu-turab-hassan', href: 'https://linkedin.com/in/abu-turab-hassan-339840329' },
    // { label: 'Portfolio', val: 'portfolio.vercel.app', href: 'https://portfolio.vercel.app' },
  ]

  return (
    <section id="contact" ref={ref} style={{ padding: 'clamp(5rem, 10vw, 10rem) 0' }}>
      <div className="container">

        {/* Header */}
        <div style={{
          marginBottom: 'clamp(3rem, 5vw, 5rem)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}>
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">Let's <em>Work</em><br />Together</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: 'clamp(3rem, 6vw, 8rem)',
          alignItems: 'start'
        }} className="contact-grid">

          {/* Left — contact info */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
          }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              color: 'var(--text-secondary)', lineHeight: 1.75,
              fontWeight: 300, marginBottom: '2.5rem'
            }}>
              Whether you have a project in mind, want to collaborate, or just want to say hello —
              my inbox is always open. I'll get back to you as soon as possible.
            </p>

            {contactInfo.map(({ label, val, href }) => (
              <div key={label} style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '0.6rem',
                  letterSpacing: '0.2em', color: 'var(--accent)',
                  textTransform: 'uppercase', marginBottom: '0.3rem'
                }}>{label}</div>
                {href ? (
                  <a href={href} onClick = {label === 'Email' ? (e) => {
    e.preventDefault();
    window.open('https://mail.google.com/mail/?view=cm&to=abuturabhassankhan@gmail.com', '_blank');
  } : undefined} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"
                    style={{
                      fontFamily: 'Syne, sans-serif', fontSize: '0.88rem',
                      color: 'var(--text-secondary)', borderBottom: '1px solid transparent',
                      transition: 'color 0.3s, border-color 0.3s', display: 'inline-block'
                    }}
                    onMouseEnter={e => { e.target.style.color = 'var(--accent)'; e.target.style.borderBottomColor = 'var(--accent)' }}
                    onMouseLeave={e => { e.target.style.color = 'var(--text-secondary)'; e.target.style.borderBottomColor = 'transparent' }}
                  >{val}</a>
                ) : (
                  <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{val}</span>
                )}
              </div>
            ))}
          </div>

          {/* Right — form */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input name="name" value={form.name} onChange={handleChange}
                    placeholder="Your name" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="you@example.com" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange}
                  placeholder="Project Inquiry" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <div>
                <label style={labelStyle}>Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder="Tell me about your project..." rows={6}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {errMsg && (
                <div style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '0.72rem',
                  color: '#e88080', padding: '0.75rem 1rem',
                  border: '1px solid rgba(232,128,128,0.3)', background: 'rgba(232,128,128,0.05)'
                }}>{errMsg}</div>
              )}

              {status === 'success' && (
                <div style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '0.72rem',
                  color: 'var(--accent)', padding: '0.75rem 1rem',
                  border: '1px solid var(--border)', background: 'var(--accent-dim)'
                }}>
                  ✓ Message sent! I'll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '0.72rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  background: status === 'loading' ? 'var(--text-muted)' : 'var(--accent)',
                  color: 'var(--bg)', border: 'none',
                  padding: '1rem 2.5rem', alignSelf: 'flex-start',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'background 0.3s, transform 0.2s'
                }}
                onMouseEnter={e => { if (status !== 'loading') e.target.style.background = 'var(--accent-light)' }}
                onMouseLeave={e => { if (status !== 'loading') e.target.style.background = 'var(--accent)' }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}