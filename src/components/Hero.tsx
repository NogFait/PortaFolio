import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

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

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'var(--primary)'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseX = useMotionValue(50)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })

  const { scrollY } = useScroll()
  const glowY = useTransform(scrollY, [0, 400], [-50, -20])
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let animId: number

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
        p.draw(ctx)
      })
      animId = requestAnimationFrame(animate)
    }

    resize()
    init()

    if (prefersReducedMotion) {
      particles.forEach(p => p.draw(ctx))
    } else {
      animate()
    }

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
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

      <div style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
        <div className="fade-in-up" style={{ animationDelay: '0.1s', marginBottom: '2rem' }}>
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
        </div>

        <motion.h1
          className="fade-in-up"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: '1.1',
            fontWeight: 800,
            color: 'var(--on-surface)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em',
            animationDelay: '0.2s'
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
          className="fade-in-up"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: '1.6',
            color: 'var(--on-surface-variant)',
            maxWidth: '640px',
            margin: '0 auto 2.5rem',
            animationDelay: '0.3s'
          }}
        >
          Estudiante de Programación en UTN enfocado en Frontend y en el desarrollo Full-stack. Me especializo en construir aplicaciones funcionales, escalables y bien estructuradas.
        </motion.p>

        <div
          className="fade-in-up"
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            animationDelay: '0.4s'
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
            textDecoration: 'none',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease'
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
            border: '1px solid rgba(70, 69, 84, 0.2)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            Hablemos
          </a>
        </div>
      </div>

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