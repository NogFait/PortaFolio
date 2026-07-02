import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import perfil from '../assets/perfil.png'

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const imageSize = Math.min(Math.max(250, windowWidth * 0.35), 400)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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
    <section ref={sectionRef} id="about" style={{
      backgroundColor: '#0b1326',
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
          gap: windowWidth <= 768 ? '1.5rem' : windowWidth <= 1024 ? '2.5rem' : '3rem',
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
            boxShadow: '0 0 40px -10px rgba(192, 193, 255, 0.15)',
            position: 'relative',
            maxWidth: imageSize + 'px',
            margin: '0 auto'
          }}>
            <img
              src={perfil}
              alt="Fausto Chirino"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: windowWidth <= 768 ? 'scale(1.1)' : 'scale(1.3)',
                transformOrigin: windowWidth <= 768 ? '50% 20%' : '50% 0%'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(192, 193, 255, 0.1)',
              mixBlendMode: 'overlay',
              pointerEvents: 'none'
            }} />
          </div>

          <div className="about-badge" style={{
            position: 'absolute',
            bottom: '-1.5rem',
            right: '-1.5rem',
            background: '#222a3d',
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
                  border: '2px solid #222a3d',
                  background: 'rgba(192, 193, 255, 0.2)',
                  marginRight: '-0.75rem'
                }} />
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid #222a3d',
                  background: 'rgba(78, 222, 163, 0.2)',
                  marginRight: '-0.5rem'
                }} />
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid #222a3d',
                  background: 'rgba(255, 183, 131, 0.2)'
                }} />
              </div>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#dae2fd'
              }}>
                Fullstack Stack
              </span>
            </div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.75rem',
              color: '#4edea3',
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
            fontFamily: '"JetBrains Mono", monospace',
            color: '#c0c1ff',
            letterSpacing: '0.1em',
            display: 'block',
            marginBottom: '1rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            scrollMarginTop: '100px'
          }}>Sobre Fausto Chirino</span>

          <h2 style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            lineHeight: '1.1',
            fontWeight: 700,
            color: '#dae2fd',
            marginBottom: '1.25rem',
            letterSpacing: '-0.02em'
          }}>
            Creando soluciones que <span style={{ fontStyle: 'italic', fontWeight: 400 }}>impulsan</span> negocios.
          </h2>

          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.9375rem',
            lineHeight: '1.6',
            color: '#c7c4d7',
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
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 700,
fontSize: '0.9375rem',
                  color: '#dae2fd',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span className="material-symbols-outlined" style={{ color: '#c0c1ff', fontSize: '1.25rem' }}>code</span>
                Especialidad
              </h4>
              <p style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.75rem',
                color: '#4edea3',
                marginBottom: '0.25rem'
              }}>$ Frontend</p>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.8125rem',
                color: '#dae2fd',
                margin: '0 0 0.75rem'
              }}>React, TypeScript, Tailwind</p>
              <p style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.75rem',
                color: '#c0c1ff',
                marginBottom: '0.25rem'
              }}>$ Backend</p>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.8125rem',
                color: '#dae2fd',
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
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 700,
                fontSize: '0.9375rem',
                color: '#dae2fd',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span className="material-symbols-outlined" style={{ color: '#4edea3', fontSize: '1.25rem' }}>rocket_launch</span>
                Visión
              </h4>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.8125rem',
                color: '#c7c4d7',
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