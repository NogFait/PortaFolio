const Footer = () => {
  return (
    <footer style={{
      padding: '2rem 2rem 1.5rem', /* REDUCIDO: menos espacio vertical */
      backgroundColor: '#171f33',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Efecto de glow decorativo */}
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px', /* REDUCIDO: más pequeño */
        height: '300px',
        background: 'radial-gradient(circle, rgba(192, 193, 255, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(40px)'
      }} />
      
      <div className="footer-grid" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '1.5rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div>
          <h3 style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: '1.125rem', /* REDUCIDO: más pequeño */
            lineHeight: '1.3',
            fontWeight: 600,
            color: '#dae2fd',
            marginBottom: '0.5rem', /* REDUCIDO */
            textShadow: '0 0 30px rgba(192, 193, 255, 0.2)'
          }}>Fausto Chirino</h3>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.875rem', /* REDUCIDO */
            lineHeight: '1.6',
            color: '#c7c4d7'
          }}>Desarrollador Full-stack</p>
        </div>      
        
        <nav>
          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            color: '#4edea3',
            marginBottom: '0.625rem', /* REDUCIDO */
            fontWeight: 600,
            fontSize: '0.75rem', /* REDUCIDO */
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>Navegación</p>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.375rem' /* REDUCIDO */
          }}>
            <li><a href="#projects" style={{
              fontFamily: '"Inter", sans-serif',
              color: '#c7c4d7',
              textDecoration: 'none',
              fontSize: '0.875rem', /* REDUCIDO */
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.color = '#c0c1ff'; 
              e.currentTarget.style.gap = '0.625rem';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.color = '#c7c4d7'; 
              e.currentTarget.style.gap = '0.375rem';
            }}
            >Proyectos →</a></li>
            <li><a href="#about" style={{
              fontFamily: '"Inter", sans-serif',
              color: '#c7c4d7',
              textDecoration: 'none',
              fontSize: '0.875rem', /* REDUCIDO */
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.color = '#c0c1ff'; 
              e.currentTarget.style.gap = '0.625rem';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.color = '#c7c4d7'; 
              e.currentTarget.style.gap = '0.375rem';
            }}
            >Sobre mí →</a></li>
            <li><a href="#contact" style={{
              fontFamily: '"Inter", sans-serif',
              color: '#c7c4d7',
              textDecoration: 'none',
              fontSize: '0.875rem', /* REDUCIDO */
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.color = '#c0c1ff'; 
              e.currentTarget.style.gap = '0.625rem';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.color = '#c7c4d7'; 
              e.currentTarget.style.gap = '0.375rem';
            }}
            >Contacto →</a></li>
          </ul>
        </nav>      
        
        <div>
          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            color: '#4edea3',
            marginBottom: '0.625rem', /* REDUCIDO */
            fontWeight: 600,
            fontSize: '0.75rem', /* REDUCIDO */
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>Contacto</p>
          <a 
            href="mailto:chirinocalderonfausto@gmail.com"
            style={{
              fontFamily: '"Inter", sans-serif',
              color: '#c0c1ff',
              textDecoration: 'none',
              fontSize: '0.875rem', /* REDUCIDO */
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.color = '#8083ff'; 
              e.currentTarget.style.gap = '0.625rem';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.color = '#c0c1ff'; 
              e.currentTarget.style.gap = '0.375rem';
            }}
          >
            chirinocalderonfausto@gmail.com
          </a>
        </div>      
        
        <div>
          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            color: '#4edea3',
            marginBottom: '0.625rem', /* REDUCIDO */
            fontWeight: 600,
            fontSize: '0.75rem', /* REDUCIDO */
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>Redes</p>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            gap: '0.875rem' /* REDUCIDO */
          }}>
            <li><a href="https://github.com/NogFait" target="_blank" style={{
              fontFamily: '"Inter", sans-serif',
              color: '#c7c4d7',
              textDecoration: 'none',
              fontSize: '0.875rem', /* REDUCIDO */
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#c0c1ff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#c7c4d7'; }}
            >GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/fausto-chirino-76b7572b6" target="_blank" style={{
              fontFamily: '"Inter", sans-serif',
              color: '#c7c4d7',
              textDecoration: 'none',
              fontSize: '0.875rem', /* REDUCIDO */
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#c0c1ff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#c7c4d7'; }}
            >LinkedIn</a></li>
          </ul>
        </div>
      </div>      
      
      <div style={{
        textAlign: 'center',
        paddingTop: '1.5rem', /* REDUCIDO */
        position: 'relative',
        zIndex: 1
      }}>
        <p style={{
          fontFamily: '"JetBrains Mono", monospace',
          color: '#c7c4d7',
          fontSize: '0.75rem',
          letterSpacing: '0.02em'
        }}>© {new Date().getFullYear()} Fausto Chirino. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;