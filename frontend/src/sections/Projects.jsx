import { useRef, useEffect, useState } from 'react'

const projects = [
  {
    title: 'Tribute Chapters',
    url: 'https://tribute-chapter.vercel.app',
    category: 'Memorial Platform',
    year: '2024',
    stack: ['Next.js', 'React', 'Tailwind CSS'],
    color: '#6e9ec8',
    description: 'A fully responsive Memorial Website System enabling users to create and manage personalized tribute pages for loved ones, with unique public sharing links, contribution system, and role-based access control.',
    points: [
      'Fully responsive memorial management system',
      'Unique public links for memorial sharing',
      'Role-based access control for secure management',
      'Contribution system with owner approval workflow'
    ]
  },
  {
    title: 'Rental Host',
    url: 'https://staysafeverified.com',
    category: 'Certification Platform',
    year: '2024',
    stack: ['Next.js', 'Tailwind CSS', 'REST API'],
    color: '#c8a96e',
    description: 'A digital certification platform for issuing and managing property safety certificates with role-based dashboards for users, admins, and super admins, plus hierarchical approval workflows.',
    points: [
      'Digital property safety certification platform',
      'Role-based dashboards: User, Admin, Super Admin',
      'Application approval workflow system',
      'Hierarchical certificate validation pipeline'
    ]
  },
  {
    title: 'AppointMe',
    url: 'https://appoint-me.cloud/',
    category: 'Lead Management',
    year: '2024',
    stack: ['Next.js', 'Apollo', 'HubSpot', 'React'],
    color: '#9ec86e',
    description: 'A Next.js platform for fetching leads and managing marketing campaigns with real-time data updates and multi-platform integrations including Apollo and HubSpot.',
    points: [
      'Lead fetching from Apollo & HubSpot integrations',
      'Real-time data updates & dynamic tracking',
      'Role-based dashboards for users and admins',
      'Optimized for speed and scalability across devices'
    ]
  },
  {
    title: 'Edu AI',
    url: 'https://eduai.vordx.com',
    category: 'EdTech Platform',
    year: '2024',
    stack: ['React', 'Next.js', 'AI Integration'],
    color: '#c86e9e',
    description: 'An AI-powered educational platform enhancing learning experiences for children with separate parent & student dashboards, interactive exercises, and adaptive learning.',
    points: [
      'AI-powered adaptive learning for children',
      'Separate parent & student dashboards',
      'Spelling, reading, and homework exercises',
      'Full device responsiveness & optimized performance'
    ]
  }
]

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

function ProjectCard({ proj, i, visible }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${expanded ? proj.color + '60' : 'var(--border)'}`,
        padding: '2rem', cursor: 'pointer', position: 'relative', overflow: 'hidden',
        transition: 'all 0.4s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${i * 0.12}s`,
        transitionProperty: 'opacity, transform, border-color'
      }}
    >
      {/* Top color bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: proj.color, opacity: expanded ? 1 : 0.4, transition: 'opacity 0.3s'
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.2em', color: proj.color, textTransform: 'uppercase' }}>{proj.category}</div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', color: 'var(--text-muted)' }}>{proj.year}</div>
      </div>

      <h3 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
        fontWeight: 400, color: 'var(--text-primary)', marginBottom: '0.75rem'
      }}>{proj.title}</h3>

      <p style={{
        fontFamily: 'Syne, sans-serif', fontSize: '0.85rem',
        color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.25rem'
      }}>{proj.description}</p>

      {/* Expandable points */}
      <div style={{
        maxHeight: expanded ? '300px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease'
      }}>
        <ul style={{ listStyle: 'none', marginBottom: '1.25rem' }}>
          {proj.points.map((pt, j) => (
            <li key={j} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: proj.color, fontSize: '0.7rem', marginTop: '0.3rem' }}>▸</span>
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stack tags */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {proj.stack.map(s => (
          <span key={s} style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.6rem',
            color: 'var(--text-muted)', border: '1px solid var(--border)',
            padding: '0.2rem 0.6rem', letterSpacing: '0.05em'
          }}>{s}</span>
        ))}
      </div>

      <a
        href={proj.url} target="_blank" rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        style={{
          fontFamily: 'DM Mono, monospace', fontSize: '0.65rem',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: proj.color, display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          borderBottom: `1px solid ${proj.color}40`, paddingBottom: '0.15rem'
        }}
      >
        Live Site ↗
      </a>

      {/* Click hint */}
      <div style={{
        position: 'absolute', bottom: '1.25rem', right: '1.25rem',
        fontFamily: 'DM Mono, monospace', fontSize: '0.55rem',
        color: 'var(--text-muted)', letterSpacing: '0.1em'
      }}>
        {expanded ? 'COLLAPSE ↑' : 'DETAILS ↓'}
      </div>
    </div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const visible = useVisible(ref)

  return (
    <section id="projects" ref={ref} style={{
      padding: 'clamp(5rem, 10vw, 10rem) 0',
      background: 'var(--bg-secondary)'
    }}>
      <div className="container">
        <div style={{
          marginBottom: 'clamp(3rem, 5vw, 5rem)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}>
          <div className="section-label">Featured Work</div>
          <h2 className="section-title">Selected <em>Projects</em></h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {projects.map((proj, i) => (
            <ProjectCard key={proj.title} proj={proj} i={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}