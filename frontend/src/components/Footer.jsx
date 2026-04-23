export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '2.5rem clamp(1.5rem, 4vw, 4rem)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '1rem',
      background: 'var(--bg-secondary)'
    }}>
      <div style={{
        fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem',
        color: 'var(--text-muted)'
      }}>
        © {year} <span style={{ color: 'var(--accent)' }}>Abu Turab Hassan</span>. All rights reserved.
      </div>
      <div style={{
        fontFamily: 'DM Mono, monospace', fontSize: '0.62rem',
        letterSpacing: '0.15em', color: 'var(--text-muted)',
        textTransform: 'uppercase'
      }}>
        Built with React · Next.js · Three.js · GSAP
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {[
          { label: 'LinkedIn', href: 'https://linkedin.com/in/abu-turab-hassan-339840329' },
          { label: 'GitHub', href: 'https://github.com' },
          { label: 'Email', href: 'mailto:abuturabhassankhan@gmail.com' },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.62rem',
            letterSpacing: '0.15em', color: 'var(--text-muted)',
            textTransform: 'uppercase',
            transition: 'color 0.3s'
          }}
          onMouseEnter={e => e.target.style.color = 'var(--accent)'}
          onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >{label}</a>
        ))}
      </div>
    </footer>
  )
}
