import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillGroups = [
  {
    label: 'Languages',
    skills: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
      { name: 'JavaScript', level: 85 },
    ]
  },
  {
    label: 'Frameworks & Libraries',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 75 },
    ]
  },
  {
    label: 'UI & Styling',
    skills: [
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Bootstrap', level: 80 },
      { name: 'Framer Motion', level: 70 },
    ]
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'Figma', level: 78 },
      { name: 'VSCode', level: 95 },
    ]
  }
]

function SkillBar({ name, level, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} style={{ marginBottom: '1.25rem' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginBottom: '0.5rem'
      }}>
        <span style={{
          fontFamily: 'Syne, sans-serif', fontSize: '0.85rem',
          color: 'var(--text-secondary)'
        }}>{name}</span>
        <span style={{
          fontFamily: 'DM Mono, monospace', fontSize: '0.65rem',
          color: 'var(--accent)'
        }}>{level}%</span>
      </div>
      <div style={{
        height: '2px', background: 'rgba(200,169,110,0.1)',
        borderRadius: '1px', overflow: 'hidden'
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: delay, ease: [0.76, 0, 0.24, 1] }}
          style={{
            height: '100%', background: 'var(--accent)',
            boxShadow: '0 0 8px rgba(200,169,110,0.6)'
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={ref} style={{
      padding: 'clamp(5rem, 10vw, 10rem) 0',
      background: 'var(--bg-secondary)'
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}
        >
          <div className="section-label">Technical Expertise</div>
          <h2 className="section-title">
            My <em>Skill</em><br />Arsenal
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem'
        }}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: gi * 0.1 }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Corner accent */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '40px', height: '40px',
                background: 'var(--accent-dim)',
                clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
              }} />

              <div style={{
                fontFamily: 'DM Mono, monospace', fontSize: '0.62rem',
                letterSpacing: '0.2em', color: 'var(--accent)',
                textTransform: 'uppercase', marginBottom: '1.5rem'
              }}>{group.label}</div>

              {group.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={gi * 0.1 + si * 0.1 + 0.2}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            marginTop: '2.5rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            padding: '2rem',
            display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap'
          }}
        >
          <div style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.62rem',
            letterSpacing: '0.2em', color: 'var(--accent)',
            textTransform: 'uppercase'
          }}>Languages</div>
          {[
            { lang: 'English', level: 'Proficient' },
            { lang: 'Urdu', level: 'Native' }
          ].map(({ lang, level }) => (
            <div key={lang} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem',
                color: 'var(--text-primary)'
              }}>{lang}</span>
              <span style={{
                fontFamily: 'DM Mono, monospace', fontSize: '0.62rem',
                color: 'var(--text-muted)', letterSpacing: '0.15em',
                border: '1px solid var(--border)', padding: '0.2rem 0.6rem'
              }}>{level}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
