import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, { scaleX: 0 }, {
        scaleX: 1, duration: 1.5, ease: 'power3.out',
        scrollTrigger: { trigger: lineRef.current, start: 'top 80%' }
      })
    })
    return () => ctx.revert()
  }, [])

  const fadeUp = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  }

  return (
    <section id="about" ref={sectionRef} style={{ padding: 'clamp(5rem, 10vw, 10rem) 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem, 6vw, 8rem)', alignItems: 'start' }}
          className="about-grid">
          {/* Left */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="section-label">About Me</div>
            <h2 className="section-title">
              Passionate about<br />
              <em>crafting digital</em><br />
              experiences
            </h2>
            {/* Horizontal line */}
            <div ref={lineRef} style={{
              height: '1px', background: 'var(--accent)',
              transformOrigin: 'left', marginTop: '2rem', marginBottom: '2rem',
              width: '80px'
            }} />
            <div style={{
              display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem'
            }}>
              {[
                { label: 'Location', val: 'Model Town Q, Lahore' },
                { label: 'Email', val: 'abuturabhassankhan@gmail.com' },
                { label: 'Phone', val: '+92 316-7354746' },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div style={{
                    fontFamily: 'DM Mono, monospace', fontSize: '0.62rem',
                    letterSpacing: '0.2em', color: 'var(--accent)',
                    textTransform: 'uppercase', marginBottom: '0.3rem'
                  }}>{label}</div>
                  <div style={{
                    fontFamily: 'Syne, sans-serif', fontSize: '0.85rem',
                    color: 'var(--text-secondary)'
                  }}>{val}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
              color: 'var(--text-secondary)', lineHeight: 1.75,
              fontWeight: 300, marginBottom: '2rem'
            }}>
              I'm a passionate Frontend Developer with over a year of experience building 
              modern, responsive, and high-performance web applications using 
              <span style={{ color: 'var(--accent)' }}> React.js, Next.js, and TypeScript</span>.
            </p>
            <p style={{
              fontFamily: 'Syne, sans-serif', fontSize: '0.95rem',
              color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem'
            }}>
              At Vordx Technologies, I craft intuitive user interfaces, scalable architectures, 
              and seamless user experiences. I've developed diverse projects — from AI dashboards 
              and e-commerce platforms to admin panels and data-driven apps — with a focus on 
              clean code, reusability, and performance.
            </p>
            <p style={{
              fontFamily: 'Syne, sans-serif', fontSize: '0.95rem',
              color: 'var(--text-muted)', lineHeight: 1.8
            }}>
              I'm also enthusiastic about UI/UX design, emerging frontend tools, and sharing 
              knowledge through tutorials and open-source contributions.
            </p>

            {/* Education timeline */}
            <div style={{ marginTop: '2.5rem' }}>
              <div style={{
                fontFamily: 'DM Mono, monospace', fontSize: '0.65rem',
                letterSpacing: '0.2em', color: 'var(--accent)',
                textTransform: 'uppercase', marginBottom: '1.5rem'
              }}>Education</div>
              {[
                {
                  degree: 'BS Computer Science',
                  school: 'Virtual University of Pakistan',
                  year: '2023 – Present', location: 'Lahore'
                },
                {
                  degree: 'Intermediate',
                  school: 'Rise Higher Secondary School',
                  year: '2022 – 2023', location: 'Muzaffargarh'
                }
              ].map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  style={{
                    display: 'flex', gap: '1rem', marginBottom: '1.25rem',
                    paddingBottom: '1.25rem',
                    borderBottom: i === 0 ? '1px solid var(--border)' : 'none'
                  }}
                >
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: 'var(--accent)', flexShrink: 0, marginTop: '0.35rem'
                  }} />
                  <div>
                    <div style={{
                      fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem',
                      color: 'var(--text-primary)', fontWeight: 500
                    }}>{edu.degree}</div>
                    <div style={{
                      fontFamily: 'Syne, sans-serif', fontSize: '0.82rem',
                      color: 'var(--text-secondary)', marginTop: '0.2rem'
                    }}>{edu.school}</div>
                    <div style={{
                      fontFamily: 'DM Mono, monospace', fontSize: '0.65rem',
                      color: 'var(--text-muted)', marginTop: '0.2rem'
                    }}>{edu.year} · {edu.location}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
