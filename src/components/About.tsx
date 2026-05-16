import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SiReact, SiTypescript, SiTailwindcss, SiPython, SiFastapi, SiPostgresql } from 'react-icons/si'
import perfil from '../assets/perfil.png'

const TECH_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  React: SiReact,
  TypeScript: SiTypescript,
  Tailwind: SiTailwindcss,
  Python: SiPython,
  FastAPI: SiFastapi,
  SQL: SiPostgresql,
}

const About = () => {
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
    <section ref={sectionRef} id="about" style={{
      backgroundColor: '#0b1326',
      alignItems: 'center'
    }}>
      <motion.div
        style={{ maxWidth: '1100px', width: '100%', textAlign: 'center' }}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          color: '#4edea3',
          letterSpacing: '0.1em',
          display: 'block',
          marginBottom: '0.75rem',
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase'
        }}>PERFIL PROFESIONAL</span>

        <div style={{
          width: isDesktop ? '160px' : '200px',
          height: isDesktop ? '160px' : '200px',
          borderRadius: '50%',
          border: '3px solid rgba(192, 193, 255, 0.4)',
          boxShadow: '0 0 40px rgba(192, 193, 255, 0.3)',
          marginBottom: '1rem',
          overflow: 'hidden',
          display: 'inline-block',
          position: 'relative'
        }}>
          <img
            src={perfil}
            alt="Foto de perfil"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scale(1.3)',
              transformOrigin: '50% 0%'
            }}
          />
        </div>

        <h2 style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: isDesktop ? '2rem' : '1.75rem',
            lineHeight: '1.2',
            fontWeight: 600,
            color: '#dae2fd',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            textShadow: '0 0 50px rgba(192, 193, 255, 0.2)'
        }}>
            Sobre mi como desarrollador
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
          maxWidth: '1100px',
          width: '100%',
          textAlign: 'left'
        }}>
          <div>
             <p style={{
                 fontFamily: '"Inter", sans-serif',
                 fontSize: '0.875rem',
                 lineHeight: '1.6',
                 color: '#c7c4d7',
                 marginBottom: '0.75rem'
             }}>
               Soy estudiante de Programación en la UTN, enfocado en el desarrollo Full-stack. Me interesa construir aplicaciones que no solo funcionen, sino que
               estén bien estructuradas, sean mantenibles y puedan escalar.
             </p>
             <p style={{
                 fontFamily: '"Inter", sans-serif',
                 fontSize: '0.875rem',
                 lineHeight: '1.6',
                 color: '#c7c4d7',
                 marginBottom: '0.75rem'
             }}>Disfruto trabajar en la lógica detrás de los sistemas, el manejo de datos y la
               organización del código. Busco entender cómo funcionan las cosas en profundidad
               para poder diseñar soluciones más eficientes y sólidas.</p>
               <p style={{
                 fontFamily: '"Inter", sans-serif',
                 fontSize: '0.875rem',
                 lineHeight: '1.6',
                 color: '#c7c4d7',
                 marginBottom: '0.75rem'}}> 
               Mi enfoque está en escribir código claro, aplicar buenas prácticas y construir
               proyectos que simulen entornos reales, donde la escalabilidad y el rendimiento
               son importantes.
               </p>
          </div>

          <div className="about-info-card" style={{ padding: '1rem' }}>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.625rem'
            }}>
              <li style={{ fontSize: '0.8125rem' }}>
                <div style={{
                  color: '#c0c1ff',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>Stack</div>

                <div className="tech-category-label">Frontend</div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.375rem',
                  marginBottom: '0.625rem'
                }}>
                  {['React', 'TypeScript', 'Tailwind'].map((tech) => {
                    const Icon = TECH_ICONS[tech]
                    return (
                      <span key={tech} className="about-tech-chip">
                        {Icon && <Icon size={10} />}
                        {tech}
                      </span>
                    )
                  })}
                </div>

                <div className="tech-category-label">Backend</div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.375rem'
                }}>
                  {['Python', 'FastAPI', 'SQL'].map((tech) => {
                    const Icon = TECH_ICONS[tech]
                    return (
                      <span key={tech} className="about-tech-chip">
                        {Icon && <Icon size={10} />}
                        {tech}
                      </span>
                    )
                  })}
                </div>
              </li>

              <li style={{ fontSize: '0.8125rem' }}>
                <strong style={{ color: '#c0c1ff', fontWeight: 600, marginRight: '0.5rem', display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: '"JetBrains Mono", monospace' }}>Enfoque:</strong>
                <span style={{ color: '#dae2fd' }}>Fullstack</span>
              </li>

              <li style={{ fontSize: '0.8125rem' }}>
                <strong style={{ color: '#c0c1ff', fontWeight: 600, marginRight: '0.5rem', display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: '"JetBrains Mono", monospace' }}>Formación:</strong>
                <span style={{ color: '#dae2fd' }}>Tecnicatura Universitaria en Programación (UTN)</span>
              </li>

              <li style={{ fontSize: '0.8125rem' }}>
                <strong style={{ color: '#c0c1ff', fontWeight: 600, marginRight: '0.5rem', display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: '"JetBrains Mono", monospace' }}>Objetivo:</strong>
                <span style={{ color: '#dae2fd' }}>Crecer como desarrollador profesional</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
