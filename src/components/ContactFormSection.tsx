import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ContactForm from './ContactForm'

const ContactFormSection = () => {
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
    <section ref={sectionRef} id="contact" style={{
      backgroundColor: '#131b2e',
    }}>
      <motion.div
        style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
        }}>TRABAJEMOS JUNTOS</span>
        
        <h2 style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: isDesktop ? '2rem' : '1.75rem',
          lineHeight: '1.2',
          fontWeight: 600,
          color: '#dae2fd',
          marginBottom: '1.5rem',
          letterSpacing: '-0.02em',
          textShadow: '0 0 50px rgba(192, 193, 255, 0.2)'
        }}>
          Construyamos algo juntos.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              color: '#c7c4d7',
              marginBottom: 0
            }}>
              Abierto a oportunidades en desarrollo Full-stack. Me interesa trabajar
              en proyectos donde pueda aportar desde la lógica, la estructura y el diseño del sistema.
              Si tenés una idea o necesidad, podemos hablar.
            </p>

            <div className="contact-info-card" style={{
              padding: '1.25rem',
              background: 'linear-gradient(145deg, #222a3d 0%, #2d3449 100%)',
              borderRadius: '1rem',
              boxShadow: '0 10px 50px rgba(218, 226, 253, 0.08), 0 0 120px rgba(192, 193, 255, 0.05)',
              border: '1px solid rgba(192, 193, 255, 0.15)',
            }}>
              <div>
                <p style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  color: '#4edea3',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>Contacto directo</p>
                <p style={{
                  fontFamily: '"Inter", sans-serif',
                  color: '#dae2fd',
                  fontSize: '0.875rem',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  Usá el formulario de contacto para escribirme directamente.
                  Respondo en menos de 24 horas.
                </p>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <p style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  color: '#4edea3',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  marginBottom: '0.25rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>Ubicación</p>
                <p style={{
                  fontFamily: '"Inter", sans-serif',
                  color: '#dae2fd',
                  fontSize: '0.875rem',
                  margin: 0
                }}>Argentina - Mendoza</p>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default ContactFormSection
