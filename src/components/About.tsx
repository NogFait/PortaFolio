import { useEffect, useRef, useState } from 'react'

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
      padding: '6rem 2rem',
      backgroundColor: '#0b1326',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          textAlign: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s ease-out',
        }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            color: '#4edea3',
            letterSpacing: '0.1em',
            display: 'block',
            marginBottom: '1rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'uppercase'
          }}>PERFIL PROFESIONAL</span>
        
          <h2 style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: isDesktop ? '3rem' : '2rem',
              lineHeight: '1.2',
              fontWeight: 600,
              color: '#dae2fd',
              marginBottom: '2.5rem',
              letterSpacing: '-0.02em',
              textShadow: '0 0 50px rgba(192, 193, 255, 0.2)'
          }}>
              Sobre mi como desarrollador
          </h2>
        
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            width: '100%',
            textAlign: 'left'
          }}>
            {/* Columna izquierda: Texto descriptivo */}
            <div>
              <p style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.125rem',
                  lineHeight: '1.8',
                  color: '#c7c4d7',
                  marginBottom: '1.5rem'
              }}>
                Soy estudiante de Programación en la UTN, enfocado en el desarrollo Full-stack. Me interesa construir aplicaciones que no solo funcionen, sino que
                estén bien estructuradas, sean mantenibles y puedan escalar.
                Disfruto trabajar en la lógica detrás de los sistemas, el manejo de datos y la
                organización del código. Busco entender cómo funcionan las cosas en profundidad
                para poder diseñar soluciones más eficientes y sólidas.
                Mi enfoque está en escribir código claro, aplicar buenas prácticas y construir
                proyectos que simulen entornos reales, donde la escalabilidad y el rendimiento
                son importantes.
              </p>
            </div>
          
            {/* Columna derecha: Tarjeta con información clave - VISUALMENTE MEJORADA */}
            <div style={{
              background: 'linear-gradient(145deg, #222a3d 0%, #2d3449 100%)',
              padding: '2.5rem',
              borderRadius: '1rem',
              boxShadow: '0 10px 50px rgba(218, 226, 253, 0.08), 0 0 120px rgba(192, 193, 255, 0.05)',
              border: '1px solid rgba(192, 193, 255, 0.15)',
              transition: 'all 0.4s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 70px rgba(218, 226, 253, 0.12), 0 0 150px rgba(192, 193, 255, 0.08)';
              e.currentTarget.style.border = '1px solid rgba(192, 193, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 50px rgba(218, 226, 253, 0.08), 0 0 120px rgba(192, 193, 255, 0.05)';
              e.currentTarget.style.border = '1px solid rgba(192, 193, 255, 0.15)';
            }}
            >
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                {/* Stack con Tech Chips VISUALES */}
                <li style={{ color: '#dae2fd', fontFamily: '"Inter", sans-serif', fontSize: '0.9375rem' }}>
                  <div style={{
                    color: '#c0c1ff',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    fontFamily: '"JetBrains Mono", monospace'
                  }}>Stack</div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {['React', 'TypeScript', 'Tailwind', 'Python', 'FastAPI'].map((tech, index) => (
                      <span key={index} style={{
                        display: 'inline-block',
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '0.75rem',
                        backgroundColor: '#00a572',
                        color: '#003824',
                        padding: '0.375rem 0.75rem',
                        borderRadius: '9999px',
                        border: 'none',
                        margin: 0,
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                        cursor: 'default'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 165, 114, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </li>

                {/* Enfoque */}
                <li style={{ color: '#dae2fd', fontFamily: '"Inter", sans-serif', fontSize: '0.9375rem' }}>
                  <strong style={{ color: '#c0c1ff', fontWeight: 600, marginRight: '0.5rem', display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: '"JetBrains Mono", monospace' }}>Enfoque:</strong>
                  <span style={{ color: '#dae2fd' }}>Fullstack</span>
                </li>

                {/* Formación */}
                <li style={{ color: '#dae2fd', fontFamily: '"Inter", sans-serif', fontSize: '0.9375rem' }}>
                  <strong style={{ color: '#c0c1ff', fontWeight: 600, marginRight: '0.5rem', display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: '"JetBrains Mono", monospace' }}>Formación:</strong>
                  <span style={{ color: '#dae2fd' }}>Tecnicatura Universitaria en Programación (UTN)</span>
                </li>

                {/* Objetivo */}
                <li style={{ color: '#dae2fd', fontFamily: '"Inter", sans-serif', fontSize: '0.9375rem' }}>
                  <strong style={{ color: '#c0c1ff', fontWeight: 600, marginRight: '0.5rem', display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: '"JetBrains Mono", monospace' }}>Objetivo:</strong>
                  <span style={{ color: '#dae2fd' }}>Crecer como desarrollador profesional</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </section>
  )
}

export default About;