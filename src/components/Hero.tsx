import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'

const Hero = () => {
  const [isDesktop, setIsDesktop] = useState(false)
  const mouseX = useMotionValue(50)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })

  const { scrollY } = useScroll()
  const glowY = useTransform(scrollY, [0, 400], [-50, -20])

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    mouseX.set(x)
  }, [])

  return (
    <section id="hero" onMouseMove={handleMouseMove} style={{
      background: 'linear-gradient(45deg, #0b1326 0%, #131b2e 50%, #0b1326 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
       <motion.div className="hero-glow" style={{
         position: 'absolute',
         left: springX,
         top: glowY,
         width: '600px',
         height: '600px',
         background: 'radial-gradient(circle, rgba(192, 193, 255, 0.15) 0%, transparent 70%)',
         filter: 'blur(60px)',
         pointerEvents: 'none',
         transform: 'translate(-50%, -50%)',
         willChange: 'transform'
       }} />

       <motion.div
         style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
       >
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          color: '#4edea3',
          letterSpacing: '0.1em',
          marginBottom: '1rem',
          display: 'block',
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase'
        }}>DISPONIBLE PARA NUEVOS PROYECTOS</span>
        
        <h1 style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: isDesktop ? '3.5rem' : '2.5rem',
          lineHeight: '1.1',
          fontWeight: 700,
          color: '#dae2fd',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
          textShadow: '0 0 40px rgba(192, 193, 255, 0.3)'
        }}>Construyendo sistemas reales, no solo interfaces.</h1>
        
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#c7c4d7',
          maxWidth: '560px',
          margin: '0 auto 2rem',
          textAlign: 'center'
        }}>Estudiante de Programación en UTN enfocado en Frontend y en el desarrollo Full-stack. Me especializo en construir aplicaciones funcionales, escalables y bien estructuradas.</p>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <a href="#projects" className="hero-cta-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}>
            Ver Proyectos →
          </a>
          
          <a href="#contact" className="hero-cta-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}>
            Contacto
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
