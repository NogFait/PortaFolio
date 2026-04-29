import { useEffect, useState } from 'react'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  return (
    <section style={{
      background: 'linear-gradient(45deg, #0b1326 0%, #131b2e 50%, #0b1326 100%)',
      padding: '6rem 2rem',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center', /* CENTRADO HORIZONTAL */
      textAlign: 'center', /* TEXTO CENTRADO */
      position: 'relative',
      overflow: 'hidden'
    }}>
       {/* Efecto de gradiente glow */}
       <div style={{
         position: 'absolute',
         top: '-50%',
         right: '-20%',
         width: '600px',
         height: '600px',
         background: 'radial-gradient(circle, rgba(192, 193, 255, 0.15) 0%, transparent 70%)',
         filter: 'blur(60px)',
         pointerEvents: 'none'
       }} />

       <div style={{
         position: 'relative',
         zIndex: 1,
         maxWidth: '800px',
         opacity: isVisible ? 1 : 0,
         transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
         transition: 'all 1s ease-out',
       }}>
        <span className="font-mono" style={{
          color: '#4edea3',
          letterSpacing: '0.1em',
          marginBottom: '1.5rem',
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'uppercase'
        }}>DISPONIBLE PARA NUEVOS PROYECTOS</span>
        
        <h1 style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: isDesktop ? '4.5rem' : '3.5rem',
          lineHeight: '1.1',
          fontWeight: 700,
          color: '#dae2fd',
          marginBottom: '1.5rem',
          letterSpacing: '-0.02em',
          textShadow: '0 0 40px rgba(192, 193, 255, 0.3)'
        }}>Construyendo sistemas reales, no solo interfaces.</h1>
        
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '1.125rem',
          lineHeight: '1.7',
          color: '#c7c4d7',
          maxWidth: '600px',
          margin: '0 auto 2.5rem', /* CENTRADO */
          textAlign: 'center'
        }}>Estudiante de Programación en UTN enfocado en Frontend y en el desarrollo Full-stack. Me especializo en construir aplicaciones funcionales, escalables y bien estructuradas.</p>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          flexWrap: 'wrap',
          justifyContent: 'center' /* BOTONES CENTRADOS */
        }}>
          <a href="#projects" style={{
            background: 'linear-gradient(45deg, #c0c1ff, #8083ff)',
            color: '#1000a9',
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 30px rgba(192, 193, 255, 0.4)',
            transform: 'scale(1)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 0 50px rgba(192, 193, 255, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(192, 193, 255, 0.4)';
          }}
          >Ver Proyectos →</a>
          
          <a href="#contact" style={{
            background: 'rgba(34, 42, 61, 0.8)',
            backdropFilter: 'blur(12px)',
            color: '#dae2fd',
            padding: '1rem 2rem',
            border: '1px solid rgba(70, 69, 84, 0.2)',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.backdropFilter = 'blur(20px)';
            e.currentTarget.style.background = 'rgba(45, 52, 73, 0.9)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backdropFilter = 'blur(12px)';
            e.currentTarget.style.background = 'rgba(34, 42, 61, 0.8)';
          }}
          >Contacto</a>
        </div>
      </div>
    </section>
  )
}

export default Hero;