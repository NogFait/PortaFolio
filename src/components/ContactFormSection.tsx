import { motion } from 'framer-motion'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import ContactForm from './ContactForm'
import { useBreakpoint } from '../hooks/useMediaQuery'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const ContactFormSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>()
  const { isMobile } = useBreakpoint()

  return (
    <section ref={sectionRef} id="contact" style={{
      backgroundColor: 'var(--surface-container-lowest)',
    }}>
      <motion.div
        style={{ maxWidth: '1280px', width: '100%', margin: '0 auto' }}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{
          borderRadius: '1.5rem',
          overflow: 'hidden',
          background: 'rgba(19, 27, 46, 0.5)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)'
        }} className="contact-panel">
          <div className="contact-panel__info" style={{
            padding: isMobile ? '1.25rem' : '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid rgba(70, 69, 84, 0.1)'
          }}>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3vw, 3rem)',
                fontWeight: 700,
                color: 'var(--on-surface)',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em'
              }}>
                ¿Tienes un proyecto en <span style={{ color: 'var(--primary)' }}>mente</span>?
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--on-surface-variant)',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                Estoy abierto a nuevas colaboraciones y oportunidades. Ponte en contacto y hagamos algo increíble juntos.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="contact-panel__info-item">
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--surface-container-high)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease'
                  }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>location_on</span>
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      textTransform: 'uppercase',
                      color: 'var(--outline)',
                      marginBottom: '0.125rem',
                      letterSpacing: '0.05em'
                    }}>Ubicación</p>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: 'var(--on-surface)',
                      fontSize: '0.9375rem',
                      margin: 0
                    }}>Mendoza, Argentina</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <a
                href="https://github.com/NogFait"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '0.5rem',
                  background: 'var(--surface-container-high)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--on-surface-variant)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                className="contact-panel__social"
              >
                <SiGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/fausto-chirino-76b7572b6"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '0.5rem',
                  background: 'var(--surface-container-high)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--on-surface-variant)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                className="contact-panel__social"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          <div className="contact-panel__form" style={{
            padding: isMobile ? '1.25rem' : '1.75rem',
            background: 'rgba(34, 42, 61, 0.3)'
          }}>
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default ContactFormSection