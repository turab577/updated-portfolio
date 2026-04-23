import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ loaded }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100 }
        return prev + Math.random() * 12
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, background: '#0a0a0f',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, gap: '2rem'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              color: '#f0ede8',
              letterSpacing: '0.02em'
            }}>
              Abu Turab Hassan
            </div>
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              color: '#c8a96e',
              textTransform: 'uppercase',
              marginTop: '0.5rem'
            }}>
              Frontend Developer
            </div>
          </motion.div>

          <div style={{ width: '200px', position: 'relative' }}>
            <div style={{
              height: '1px', background: 'rgba(200,169,110,0.15)',
              width: '100%'
            }} />
            <motion.div
              style={{
                height: '1px', background: '#c8a96e',
                position: 'absolute', top: 0, left: 0,
                width: `${Math.min(progress, 100)}%`,
                boxShadow: '0 0 8px rgba(200,169,110,0.8)'
              }}
            />
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.65rem',
              color: '#5a5650',
              marginTop: '0.75rem',
              textAlign: 'right'
            }}>
              {Math.round(Math.min(progress, 100))}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
