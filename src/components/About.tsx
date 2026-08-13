import { motion } from 'framer-motion'
import perfil from '../assets/perfil.png'
import { useBreakpoint } from '../hooks/useMediaQuery'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const About = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>()
  const { isMobile, isTablet } = useBreakpoint()

  return (
    <section ref={sectionRef} id="about" style={{
      backgroundColor: 'var(--surface)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="light-orb" style={{ bottom: 0, right: 0, opacity: 0.4 }} />

      <motion.div
        style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: isMobile ? '1.5rem' : isTablet ? '2.5rem' : '3rem',
          alignItems: 'center'
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="about-image-col" style={{
          gridColumn: 'span 4',
          position: 'relative'
        }}>
          <div style={{
            aspectRatio: '1',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 0 40px -10px rgba(var(--primary-rgb), 0.15)',
            position: 'relative',
            maxWidth: 'clamp(250px, 35vw, 400px)',
            margin: '0 auto'
          }}>
            <img
              src={perfil}
              alt="Fausto Chirino"
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: isMobile ? 'scale(1.1)' : 'scale(1.3)',
                transformOrigin: isMobile ? '50% 20%' : '50% 0%'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(var(--primary-rgb), 0.1)',
              mixBlendMode: 'overlay',
              pointerEvents: 'none'
            }} />
          </div>

          <div className="about-badge" style={{
            position: 'absolute',
            bottom: '-1.5rem',
            right: '-1.5rem',
            background: 'var(--surface-container-high)',
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid rgba(70, 69, 84, 0.2)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(12px)',
            maxWidth: '200px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem'
            }}>
              <div style={{ display: 'flex' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid var(--surface-container-high)',
                  background: 'rgba(var(--primary-rgb), 0.2)',
                  marginRight: '-0.75rem'
                }} />
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid var(--surface-container-high)',
                  background: 'rgba(var(--secondary-rgb), 0.2)',
                  marginRight: '-0.5rem'
                }} />
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid var(--surface-container-high)',
                  background: 'rgba(255, 183, 131, 0.2)'
                }} />
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--on-surface)'
              }}>
                Fullstack Stack
              </span>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--secondary)',
              lineHeight: '1.6'
            }}>
              REACT_CORE: <span style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}>ACTIVE</span><br />
              FASTAPI_API: LISTENING
            </div>
          </div>
        </div>

        <div className="about-text-col" style={{
          gridColumn: 'span 8'
        }}>
          <span id="about-label" style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--primary)',
            letterSpacing: '0.1em',
            display: 'block',
            marginBottom: '1rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            scrollMarginTop: '100px'
          }}>Sobre Fausto Chirino</span>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            lineHeight: '1.1',
            fontWeight: 700,
            color: 'var(--on-surface)',
            marginBottom: '1.25rem',
            letterSpacing: '-0.02em'
          }}>
            Creando soluciones que <span style={{ fontStyle: 'italic', fontWeight: 400 }}>impulsan</span> negocios.
          </h2>

          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            lineHeight: '1.6',
            color: 'var(--on-surface-variant)',
            marginBottom: '1.25rem'
          }}>
            <p style={{ marginBottom: '0.85rem' }}>
              Estudiante de Programación en UTN enfocado en el desarrollo Full-stack. Me especializo en construir aplicaciones funcionales, escalables y bien estructuradas, desde la lógica del backend hasta la experiencia del usuario.
            </p>
            <p style={{ marginBottom: '0.85rem' }}>
              Disfruto trabajar en la lógica detrás de los sistemas, el manejo de datos y la organización del código. Busco entender cómo funcionan las cosas en profundidad para poder diseñar soluciones más eficientes y sólidas.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              padding: '1rem',
              borderRadius: '0.75rem',
              background: 'rgba(19, 27, 46, 0.5)',
              border: '1px solid rgba(70, 69, 84, 0.1)',
              backdropFilter: 'blur(8px)'
            }}>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
fontSize: '0.9375rem',
                  color: 'var(--on-surface)',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>code</span>
                Especialidad
              </h4>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--secondary)',
                marginBottom: '0.25rem'
              }}>$ Frontend</p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--on-surface)',
                margin: '0 0 0.75rem'
              }}>React, TypeScript, Tailwind</p>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--primary)',
                marginBottom: '0.25rem'
              }}>$ Backend</p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--on-surface)',
                margin: 0
              }}>Python, FastAPI, SQL</p>
            </div>

            <div style={{
              padding: '1rem',
              borderRadius: '0.75rem',
              background: 'rgba(19, 27, 46, 0.5)',
              border: '1px solid rgba(70, 69, 84, 0.1)',
              backdropFilter: 'blur(8px)'
            }}>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.9375rem',
                color: 'var(--on-surface)',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--secondary)', fontSize: '1.25rem' }}>rocket_launch</span>
                Visión
              </h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--on-surface-variant)',
                lineHeight: '1.5',
                margin: 0
              }}>
                Escalar negocios locales mediante la implementación de tecnología de vanguardia y diseño centrado en el usuario.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default About