const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--surface)',
      position: 'relative'
    }}>
      <div style={{
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(144, 143, 160, 0.2), transparent)'
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '3rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }} className="footer__inner">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.125rem',
            fontWeight: 800,
            color: 'var(--primary)',
            letterSpacing: '-0.02em'
          }}>
            FAUSTO CHIRINO
          </span>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--on-surface-variant)',
            margin: 0
          }}>
            &copy; {new Date().getFullYear()} Fausto Chirino. Hecho con pasión y código.
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          <a
            href="https://github.com/NogFait"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/fausto-chirino-76b7572b6"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
          >
            LinkedIn
          </a>
        </div>

        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          letterSpacing: '0.1em',
          color: 'var(--secondary)',
          border: '1px solid rgba(var(--secondary-rgb), 0.3)',
          padding: '0.375rem 0.75rem',
          borderRadius: '0.25rem',
          textTransform: 'uppercase'
        }}>
          v1.2.0-PRODUCTION
        </span>
      </div>
    </footer>
  )
}

export default Footer