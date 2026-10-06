import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { springs } from '../motion/physics'
import { focusIn, stagger } from '../motion/variants'

class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  canvasW: number
  canvasH: number

  constructor(w: number, h: number) {
    this.canvasW = w
    this.canvasH = h
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.size = Math.random() * 2 + 1
    this.speedX = Math.random() * 0.5 - 0.25
    this.speedY = Math.random() * 0.5 - 0.25
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.x > this.canvasW) this.x = 0
    if (this.x < 0) this.x = this.canvasW
    if (this.y > this.canvasH) this.y = 0
    if (this.y < 0) this.y = this.canvasH
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseX = useMotionValue(50)
  // Ambient glow: heavier and slower than anything the user touches
  const springX = useSpring(mouseX, springs.ambient)

  const { scrollY } = useScroll()
  const glowY = useTransform(scrollY, [0, 400], [-50, -20])
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Canvas fillStyle can't resolve CSS custom properties - read the real
    // computed color once instead of handing it an invalid 'var(--primary)'
    // string (which silently falls back to black).
    const particleColor = getComputedStyle(canvas).getPropertyValue('--primary').trim() || '#c0c1ff'

    let particles: Particle[] = []
    let animId = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles.forEach(p => {
        p.canvasW = canvas.width
        p.canvasH = canvas.height
      })
    }

    const init = () => {
      particles = []
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(canvas.width, canvas.height))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.update()
        p.draw(ctx, particleColor)
      })
      animId = requestAnimationFrame(animate)
    }

    const stop = () => {
      if (animId) cancelAnimationFrame(animId)
    }

    resize()
    init()

    if (prefersReducedMotion) {
      particles.forEach(p => p.draw(ctx, particleColor))
    } else {
      animate()
    }

    window.addEventListener('resize', resize)

    // Scrolling past the hero shouldn't keep 50 particles animating for nothing.
    const observer = new IntersectionObserver(([entry]) => {
      if (prefersReducedMotion) return
      if (entry.isIntersecting) {
        if (!animId) animate()
      } else {
        stop()
        animId = 0
      }
    })
    observer.observe(canvas)

    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [prefersReducedMotion])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    mouseX.set(x)
  }

  return (
    <section id="hero" onMouseMove={handleMouseMove} style={{
      background: 'linear-gradient(45deg, var(--surface) 0%, var(--surface-container-low) 50%, var(--surface) 100%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100lvh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '6rem 1.5rem 4rem'
    }}>
      <canvas ref={canvasRef} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.4
      }} />

      <motion.div
        style={{
          position: 'absolute',
          left: springX,
          top: glowY,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          zIndex: 0
        }}
      />

      <motion.div
        style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}
        variants={stagger(0.09, 0.1)}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={focusIn} style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 0.75rem',
            borderRadius: '9999px',
            background: 'rgba(19, 27, 46, 0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(70, 69, 84, 0.2)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--secondary)',
              display: 'inline-block',
              animation: 'glow-pulse 2s ease-in-out infinite'
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              letterSpacing: '0.1em',
              color: 'var(--on-surface-variant)',
              textTransform: 'uppercase'
            }}>
              Disponible para nuevos proyectos
            </span>
          </div>
        </motion.div>

        <motion.h1
          variants={focusIn}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: '1.1',
            fontWeight: 800,
            color: 'var(--on-surface)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em'
          }}
        >
          Construyendo sistemas reales,{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            no solo interfaces
          </span>.
        </motion.h1>

        <motion.p
          variants={focusIn}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: '1.6',
            color: 'var(--on-surface-variant)',
            maxWidth: '640px',
            margin: '0 auto 2.5rem'
          }}
        >
          Técnico Universitario en Programación (UTN) enfocado en el desarrollo Full-stack. Me especializo en construir aplicaciones funcionales, escalables y bien estructuradas.
        </motion.p>

        <motion.div
          variants={focusIn}
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <a href="#projects" className="hero-btn" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
            color: '#1000a9',
            fontWeight: 700,
            fontSize: '0.9375rem',
            borderRadius: '0.75rem',
            textDecoration: 'none'
          }}>
            Ver Proyectos
            <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>arrow_downward</span>
          </a>

          <a href="#contact" className="hero-btn" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 2rem',
            background: 'rgba(34, 42, 61, 0.8)',
            backdropFilter: 'blur(12px)',
            color: 'var(--on-surface)',
            fontWeight: 600,
            fontSize: '0.9375rem',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            border: '1px solid rgba(70, 69, 84, 0.2)'
          }}>
            Hablemos
          </a>
        </motion.div>
      </motion.div>

      <div className="animate-float" style={{
        position: 'absolute',
        bottom: '1rem',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--on-surface-variant)',
            opacity: 0.5
          }}>Scroll</span>
          <div style={{
            width: '1px',
            height: '3rem',
            background: 'linear-gradient(to bottom, var(--primary), transparent)'
          }} />
        </div>
      </div>
    </section>
  )
}

export default Hero