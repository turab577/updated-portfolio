import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['About', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1.25rem clamp(1.5rem, 4vw, 4rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'all 0.4s ease'
      }}
    >
      {/* Logo */}
      <button onClick={() => scrollTo('hero')} style={{
        fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem',
        fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '0.02em',
        background: 'none', border: 'none'
      }}>
        ATH<span style={{ color: 'var(--accent)' }}>.</span>
      </button>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
        {links.map((link, i) => (
          <motion.button
            key={link}
            onClick={() => scrollTo(link)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.4 }}
            style={{
              background: 'none', border: 'none',
              fontFamily: 'DM Mono, monospace', fontSize: '0.72rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              position: 'relative', padding: '0.25rem 0'
            }}
            whileHover={{ color: 'var(--accent)' }}
          >
            {link}
          </motion.button>
        ))}
        <a
          href="mailto:abuturabhassankhan@gmail.com"
           onClick={(e) => {
    // fallback: if mailto fails silently, open Gmail
    setTimeout(() => {
      if (document.hasFocus()) {
        window.open('https://mail.google.com/mail/?view=cm&to=abuturabhassankhan@gmail.com', '_blank')
      }
    }, 500)
  }}
          style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.7rem',
            letterSpacing: '0.1em', color: 'var(--bg)',
            background: 'var(--accent)', padding: '0.5rem 1.25rem',
            textTransform: 'uppercase'
          }}
        >
          Hire Me
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="hamburger"
        style={{
          display: 'none', background: 'none', border: 'none',
          flexDirection: 'column', gap: '5px', padding: '4px'
        }}
        aria-label="Menu"
      >
        {[0,1,2].map(i => (
          <motion.span key={i} animate={{
            rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
            y: menuOpen && i === 0 ? 8 : menuOpen && i === 2 ? -8 : 0,
            opacity: menuOpen && i === 1 ? 0 : 1
          }} style={{ display: 'block', width: '24px', height: '1px', background: 'var(--accent)' }} />
        ))}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: 'rgba(10,10,15,0.98)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', padding: '2rem',
              gap: '1.5rem'
            }}
          >
            {links.map(link => (
              <button key={link} onClick={() => scrollTo(link)} style={{
                background: 'none', border: 'none',
                fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem',
                color: 'var(--text-primary)', textAlign: 'left', fontWeight: 300
              }}>
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  )
}
