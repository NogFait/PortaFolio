import { motion } from 'framer-motion'
import ProjectsSeccion from "./ProjectsSeccion"
import { useBreakpoint } from '../hooks/useMediaQuery'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Projects = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>()
  const { isTablet } = useBreakpoint()

  return (
    <section ref={sectionRef} id="projects" style={{
      backgroundColor: 'var(--surface-container-low)',
      position: 'relative',
      overflow: 'hidden'
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
              fontFamily: 'var(--font-mono)',
              color: 'var(--secondary)',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '1rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              scrollMarginTop: '100px'
            }}>Portafolio</span>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: '1.1',
              fontWeight: 700,
              color: 'var(--on-surface)',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              Proyectos Seleccionados
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              lineHeight: '1.6',
              color: 'var(--on-surface-variant)',
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