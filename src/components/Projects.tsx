import { useEffect, useRef, useState } from 'react'
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
      padding: '6rem 2rem',
      backgroundColor: '#131b2e',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center' /* CENTRADO VERTICAL Y HORIZONTAL */
    }}>
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          textAlign: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s ease-out',
        }}>
          <span className="font-mono" style={{
            color: '#4edea3',
            letterSpacing: '0.1em',
            display: 'block',
            marginBottom: '1rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'uppercase'
          }}>SELECCION DE PROYECTOS</span>
          
          <h2 style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: isDesktop ? '3rem' : '2rem',
              lineHeight: '1.2',
              fontWeight: 600,
              color: '#dae2fd',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
              textShadow: '0 0 50px rgba(192, 193, 255, 0.2)'
          }}>Proyectos</h2>
          
          <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.125rem',
              lineHeight: '1.7',
              color: '#c7c4d7',
              maxWidth: '700px',
              margin: '0 auto 3rem', /* CENTRADO */
              textAlign: 'center'
          }}>
          Estos son algunos de los proyectos en los que trabajé, enfocados en resolver problemas reales
          mediante desarrollo Full-stack. Cada uno refleja mi enfoque en la estructura,
          escalabilidad y buenas prácticas.
          </p>
        </div>
        
        <div style={{
          maxWidth: '1200px',
          width: '100%'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr)))',
            gap: '1.5rem',
            width: '100%'
          }}>
            <ProjectsSeccion/>
          </div>
        </div>
    </section>
  )
}

export default Projects;