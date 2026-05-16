import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ProjectsSeccion from "./ProjectsSeccion"

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

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
    
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', checkDesktop)
    }
  }, [])

  return (
    <section ref={sectionRef} id="projects" style={{
      backgroundColor: '#131b2e',
    }}>
      <motion.div
        style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', textAlign: 'center' }}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          color: '#4edea3',
          letterSpacing: '0.1em',
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase'
        }}>SELECCION DE PROYECTOS</span>
        
        <h2 style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: isDesktop ? '2rem' : '1.75rem',
            lineHeight: '1.2',
            fontWeight: 600,
            color: '#dae2fd',
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em',
            textShadow: '0 0 50px rgba(192, 193, 255, 0.2)'
        }}>Proyectos</h2>
        
        <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            color: '#c7c4d7',
            maxWidth: '600px',
            margin: '0 auto 1.5rem',
            textAlign: 'center'
        }}>
        Proyectos Full-stack con enfoque en estructura, escalabilidad y buenas prácticas.
        </p>
      </motion.div>
      
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        <ProjectsSeccion />
      </div>
    </section>
  )
}

export default Projects
