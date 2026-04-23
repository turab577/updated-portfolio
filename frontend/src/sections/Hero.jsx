import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import * as THREE from 'three'

export default function Hero() {
  const canvasRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    // Three.js particle sphere
    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100)
    camera.position.z = 3

    // Particle sphere
    const count = 2800
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 1.4 + (Math.random() - 0.5) * 0.4
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      const t = Math.random()
      colors[i * 3] = 0.78 + t * 0.1
      colors[i * 3 + 1] = 0.66 + t * 0.05
      colors[i * 3 + 2] = 0.43
      sizes[i] = Math.random() * 2 + 0.5
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        void main() {
          vColor = color;
          vec3 pos = position;
          float wave = sin(pos.x * 2.0 + time) * 0.05 + cos(pos.y * 2.0 + time * 0.7) * 0.05;
          pos += normalize(pos) * wave;
          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.3, 0.5, d);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      vertexColors: true
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Mouse rotation
    const mouse = { x: 0, y: 0 }
    const handleMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouse)

    let animId
    const clock = new THREE.Clock()
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      material.uniforms.time.value = t
      particles.rotation.y += (mouse.x * 0.3 - particles.rotation.y) * 0.03
      particles.rotation.x += (mouse.y * 0.2 - particles.rotation.x) * 0.03
      particles.rotation.z = t * 0.05
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    // GSAP text animation
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-line', {
        y: 120, opacity: 0, skewY: 4
      }, {
        y: 0, opacity: 1, skewY: 0,
        duration: 1.2, stagger: 0.12,
        ease: 'power4.out',
        delay: 0.3
      })

      gsap.fromTo('.hero-sub', {
        y: 30, opacity: 0
      }, {
        y: 0, opacity: 1, duration: 1,
        delay: 0.9, ease: 'power3.out'
      })

      gsap.fromTo('.hero-ctas', {
        y: 20, opacity: 0
      }, {
        y: 0, opacity: 1, duration: 0.8,
        delay: 1.2, ease: 'power3.out'
      })
    }, textRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Three.js canvas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', right: 0, top: 0,
        width: '55%', height: '100%',
        opacity: 0.9
      }} />

      {/* Gradient fade left */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, var(--bg) 40%, transparent 75%)',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, transparent 70%, var(--bg) 100%)',
        zIndex: 1
      }} />

      {/* Content */}
      <div ref={textRef} className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '6rem' }}>
        <div style={{ overflow: 'hidden', marginBottom: '0.5rem' }}>
          <div className="hero-line" style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.72rem',
            letterSpacing: '0.3em', color: 'var(--accent)',
            textTransform: 'uppercase'
          }}>
            ✦ Frontend Developer
          </div>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <h1 className="hero-line" style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: 300, lineHeight: 0.95,
            color: 'var(--text-primary)', letterSpacing: '-0.02em'
          }}>
            Abu Turab
          </h1>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <h1 className="hero-line" style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: 300, lineHeight: 0.95,
            color: 'var(--accent)', fontStyle: 'italic',
            letterSpacing: '-0.02em', marginBottom: '2rem'
          }}>
            Hassan
          </h1>
        </div>

        <p className="hero-sub" style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
          color: 'var(--text-secondary)', maxWidth: '480px',
          lineHeight: 1.7, marginBottom: '2.5rem'
        }}>
          Crafting modern, responsive web experiences with React & Next.js. 
          Turning pixel-perfect designs into scalable, high-performance applications.
        </p>

        <div className="hero-ctas" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontFamily: 'DM Mono, monospace', fontSize: '0.72rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              background: 'var(--accent)', color: 'var(--bg)',
              border: 'none', padding: '0.85rem 2rem',
              fontWeight: 500, transition: 'all 0.3s'
            }}
            onMouseEnter={e => e.target.style.background = 'var(--accent-light)'}
            onMouseLeave={e => e.target.style.background = 'var(--accent)'}
          >
            View Work
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontFamily: 'DM Mono, monospace', fontSize: '0.72rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              background: 'transparent', color: 'var(--accent)',
              border: '1px solid var(--accent)', padding: '0.85rem 2rem',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => { e.target.style.background = 'var(--accent-dim)' }}
            onMouseLeave={e => { e.target.style.background = 'transparent' }}
          >
            Get in Touch
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '3rem', marginTop: '4rem',
          flexWrap: 'wrap'
        }}>
          {[
            { num: '1+', label: 'Years Experience' },
            { num: '4+', label: 'Projects Built' },
            { num: '∞', label: 'Lines of Code' }
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem',
                fontWeight: 300, color: 'var(--accent)'
              }}>{num}</div>
              <div style={{
                fontFamily: 'DM Mono, monospace', fontSize: '0.65rem',
                letterSpacing: '0.15em', color: 'var(--text-muted)',
                textTransform: 'uppercase', marginTop: '0.2rem'
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'
        }}
      >
        <div style={{
          fontFamily: 'DM Mono, monospace', fontSize: '0.6rem',
          letterSpacing: '0.2em', color: 'var(--text-muted)',
          textTransform: 'uppercase'
        }}>Scroll</div>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </motion.div>
    </section>
  )
}
