import { useRef, useEffect, useState } from 'react'

const experiences = [
  {
  role: 'Front End Developer',
  company: 'Kod X System',
  period: 'April 2026 – Present',
  location: 'DHA Phase 1, Lahore',
  type: 'Full-Time',
  points: [
    'Architected and shipped new feature modules in React.js, collaborating closely with designers to refine UX flows before implementation.',
    'Improved page load performance by identifying and eliminating unnecessary re-renders through memoization and lazy loading.',
    'Owned the component library for an internal dashboard, ensuring consistency across multiple product views.',
    'Debugged cross-browser layout issues and enforced code quality standards through peer code reviews.'
  ]
},
  {
    role: 'Front End Developer',
    company: 'Vordx Technologies',
    period: 'Sep 2025 – April 2026',
    location: 'DHA Phase 1, Lahore',
    type: 'Full-Time',
    points: [
      'Developed and maintained responsive UI components using React.js and Next.js for large-scale SaaS products.',
      'Integrated REST APIs and implemented efficient global state management.',
      'Translated Figma designs into pixel-perfect, responsive interfaces optimized for performance and accessibility.',
      'Built reusable form components and dynamic table systems for data-intensive views.'
    ]
  },
  {
    role: 'Front End Intern',
    company: 'Vordx Technologies',
    period: 'Jun 2025 – Sep 2025',
    location: 'DHA Phase 1, Lahore',
    type: 'Internship',
    points: [
      'Assisted senior developers in developing responsive frontend modules using React.js and modern JavaScript.',
      'Learned the fundamentals of version control (Git) and collaborative workflows.',
      'Converted Figma prototypes into interactive components ensuring UI accuracy and performance.',
      'Explored state management, routing, and component-based architecture in React.js.'
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

export default function Experience() {
  const ref = useRef(null)
  const visible = useVisible(ref)

  return (
    <section id="experience" ref={ref} style={{ padding: 'clamp(5rem, 10vw, 10rem) 0' }}>
      <div className="container">
        <div style={{
          marginBottom: 'clamp(3rem, 5vw, 5rem)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}>
          <div className="section-label">Work History</div>
          <h2 className="section-title">Professional<br /><em>Experience</em></h2>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px',
            background: 'linear-gradient(to bottom, var(--accent), transparent)'
          }} />

          {experiences.map((exp, i) => (
            <div key={i} style={{
              paddingLeft: '3rem', paddingBottom: '4rem', position: 'relative',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: `opacity 0.8s ease ${i * 0.2 + 0.2}s, transform 0.8s ease ${i * 0.2 + 0.2}s`
            }}>
              <div style={{
                position: 'absolute', left: '-5px', top: '0.35rem',
                width: '11px', height: '11px', borderRadius: '50%',
                background: 'var(--bg)', border: '2px solid var(--accent)',
                boxShadow: '0 0 12px rgba(200,169,110,0.5)'
              }} />
              <div style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                padding: '2rem 2.5rem'
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem'
                }}>
                  <div>
                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                      fontWeight: 500, color: 'var(--text-primary)'
                    }}>{exp.role}</h3>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.9rem', color: 'var(--accent)', marginTop: '0.2rem' }}>{exp.company}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{exp.period}</div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{exp.location}</div>
                    <span style={{
                      display: 'inline-block', marginTop: '0.5rem',
                      fontFamily: 'DM Mono, monospace', fontSize: '0.6rem',
                      color: 'var(--accent)', border: '1px solid var(--accent)',
                      padding: '0.15rem 0.5rem', letterSpacing: '0.1em'
                    }}>{exp.type}</span>
                  </div>
                </div>
                <div style={{ height: '1px', background: 'var(--border)', margin: '1.25rem 0' }} />
                <ul style={{ listStyle: 'none' }}>
                  {exp.points.map((pt, j) => (
                    <li key={j} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--accent)', fontSize: '0.7rem', marginTop: '0.35rem', flexShrink: 0 }}>▸</span>
                      <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}