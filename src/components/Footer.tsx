const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#171f33',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(192, 193, 255, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(40px)'
      }} />
      
      <div className="footer-grid" style={{
        maxWidth: '1100px',
        margin: '0 auto',
        marginBottom: '1rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div>
          <h3 style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: '1rem',
            lineHeight: '1.3',
            fontWeight: 600,
            color: '#dae2fd',
            marginBottom: '0.25rem',
            textShadow: '0 0 30px rgba(192, 193, 255, 0.2)'
          }}>Fausto Chirino</h3>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.8125rem',
            lineHeight: '1.5',
            color: '#c7c4d7',
            margin: 0
          }}>Desarrollador Full-Stack</p>
        </div>      
        
        <nav>
          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            color: '#4edea3',
            marginBottom: '0.5rem',
            fontWeight: 600,
            fontSize: '0.6875rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>Navegación</p>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem'
          }}>
            <li><a href="#projects" className="footer-nav-link">Proyectos →</a></li>
            <li><a href="#about" className="footer-nav-link">Sobre mí →</a></li>
            <li><a href="#contact" className="footer-nav-link">Contacto →</a></li>
          </ul>
        </nav>      
        
        <div>
          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            color: '#4edea3',
            marginBottom: '0.5rem',
            fontWeight: 600,
            fontSize: '0.6875rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>Contacto</p>
          <a 
            href="#contact"
            className="footer-contact-link"
            style={{
              fontFamily: '"Inter", sans-serif',
              color: '#c0c1ff',
              textDecoration: 'none',
              fontSize: '0.8125rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
          >
            Enviar mensaje →
          </a>
        </div>      
        
        <div>
          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            color: '#4edea3',
            marginBottom: '0.5rem',
            fontWeight: 600,
            fontSize: '0.6875rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>Redes</p>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            gap: '0.75rem'
          }}>
            <li><a href="https://github.com/NogFait" target="_blank" className="footer-social-link">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/fausto-chirino-76b7572b6" target="_blank" className="footer-social-link">LinkedIn</a></li>
          </ul>
        </div>
      </div>      
      
      <div style={{
        textAlign: 'center',
        paddingTop: '0.75rem',
        position: 'relative',
        zIndex: 1
      }}>
        <p style={{
          fontFamily: '"JetBrains Mono", monospace',
          color: '#c7c4d7',
          fontSize: '0.6875rem',
          letterSpacing: '0.02em',
          margin: 0
        }}>© {new Date().getFullYear()} Fausto Chirino. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer
