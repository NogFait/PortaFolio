import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ProjectsSeccion from "./ProjectsSeccion"

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const check = () => setIsTablet(window.innerWidth <= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="projects" style={{
      backgroundColor: '#131b2e',
      position: 'relative'
    }}>
      <div className="light-orb" style={{ top: '-6rem', left: '-6rem' }} />

      <motion.div
        style={{ maxWidth: '1280px', width: '100%', margin: '0 auto' }}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <div style={{
          display: 'flex',
          flexDirection: isTablet ? 'column' : 'row',
          flexWrap: 'wrap',
          alignItems: isTablet ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          gap: '2rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ maxWidth: '600px' }}>
            <span id="projects-label" style={{
              fontFamily: '"JetBrains Mono", monospace',
              color: '#4edea3',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '1rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              scrollMarginTop: '100px'
            }}>Portafolio</span>

            <h2 style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: '1.1',
              fontWeight: 700,
              color: '#dae2fd',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              Proyectos Seleccionados
            </h2>

            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.9375rem',
              lineHeight: '1.6',
              color: '#c7c4d7',
              margin: 0
            }}>
              Proyectos Full-stack con enfoque en estructura, escalabilidad y buenas prácticas.
            </p>
          </div>


        </div>

        <ProjectsSeccion />
      </motion.div>
    </section>
  )
}

export default Projects