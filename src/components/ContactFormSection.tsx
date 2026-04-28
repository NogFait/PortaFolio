import ContactForm from './ContactForm'

const ContactFormSection = () => {
  return (
    <section id="contact" style={{
      padding: '4rem 2rem',
      backgroundColor: '#131b2e',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
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
        }}>TRABAJEMOS JUNTOS</span>
        
        <h2 style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: '2rem',
          lineHeight: '1.3',
          fontWeight: 600,
          color: '#dae2fd',
          marginBottom: '2.5rem',
          letterSpacing: '-0.02em',
          textShadow: '0 0 50px rgba(192, 193, 255, 0.2)'
        }}>
          Construyamos algo juntos.
        </h2>

        {/* Layout de 2 columnas: Texto izquierda + Formulario derecha */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Columna izquierda: Texto y datos de contacto */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.125rem',
              lineHeight: '1.7',
              color: '#c7c4d7',
              marginBottom: '1rem'
            }}>
              Abierto a oportunidades en desarrollo Full-stack. Me interesa trabajar
              en proyectos donde pueda aportar desde la lógica, la estructura y el diseño del sistema.
              Si tenés una idea o necesidad, podemos hablar.
            </p>

            {/* Datos de contacto */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              background: 'linear-gradient(145deg, #222a3d 0%, #2d3449 100%)',
              padding: '2rem',
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
              <div>
                <p style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  color: '#4edea3',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>Canal directo</p>
                <a href="mailto:chirinocalderonfausto@gmail.com" style={{
                  fontFamily: '"Inter", sans-serif',
                  color: '#c0c1ff',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.color = '#8083ff'; 
                  e.currentTarget.style.gap = '0.75rem';
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.color = '#c0c1ff'; 
                  e.currentTarget.style.gap = '0.5rem';
                }}
                >chirinocalderonfausto@gmail.com</a>
              </div>

              <div>
                <p style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  color: '#4edea3',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>Ubicación</p>
                <p style={{
                  fontFamily: '"Inter", sans-serif',
                  color: '#dae2fd',
                  fontSize: '1rem',
                  margin: 0
                }}>Argentina - Mendoza</p>
              </div>
            </div>
          </div>

          {/* Columna derecha: Formulario */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactFormSection;