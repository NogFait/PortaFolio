import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const NAV_SECTIONS = [
  { id: 'projects', label: 'Proyectos' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'contact', label: 'Contacto' },
] as const

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('')
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleRoute = () => {
      const sections = NAV_SECTIONS.map(s => document.getElementById(s.id))
      const scrollPosition = window.scrollY + 120

      setScrolled(window.scrollY > 50)

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_SECTIONS[i].id)
          return
        }
      }
      setActiveSection('')
    }

    handleRoute()
    window.addEventListener('scroll', handleRoute, { passive: true })
    return () => window.removeEventListener('scroll', handleRoute)
  }, [])

  useEffect(() => {
    if (!isMobileOpen) return

    const overlay = overlayRef.current
    const focusable = overlay?.querySelectorAll<HTMLElement>('button, a[href]')
    focusable?.[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false)
        hamburgerRef.current?.focus()
        return
      }

      if (e.key !== 'Tab' || !focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isMobileOpen])

  const scrollTo = (id: string) => {
    const targetId = id === 'about' ? 'about-label' : id === 'projects' ? 'projects-label' : id
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileOpen(false)
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <button
            className="navbar__logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            FAUSTO CHIRINO
          </button>

          <ul className="navbar__links">
            {NAV_SECTIONS.map(s => (
              <li key={s.id} className="navbar__link-item">
                <button
                  className={`navbar__link ${activeSection === s.id ? 'navbar__link--active' : ''}`}
                  onClick={() => scrollTo(s.id)}
                >
                  {s.label}
                </button>
                {activeSection === s.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="navbar__indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <a className="navbar__cv-btn" href="/Fausto%20Chirino%20Calderon.pdf" download>
              <span className="material-symbols-outlined navbar__cv-icon">terminal</span>
              <span className="navbar__cv-text">CV</span>
            </a>

            <button
              ref={hamburgerRef}
              className={`navbar__hamburger ${isMobileOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={() => setIsMobileOpen(prev => !prev)}
              aria-label="Toggle menu"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              <span className="navbar__hamburger-line" />
              <span className="navbar__hamburger-line" />
              <span className="navbar__hamburger-line" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            ref={overlayRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="navbar__mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          >
            {NAV_SECTIONS.map(s => (
              <button
                key={s.id}
                className="navbar__mobile-link"
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
              </button>
            ))}
            <a className="navbar__mobile-cv-btn" href="/Fausto%20Chirino%20Calderon.pdf" download>
              <span className="material-symbols-outlined">terminal</span>
              CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
