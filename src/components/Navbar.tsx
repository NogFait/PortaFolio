import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, animate, useMotionValue } from 'framer-motion'
import type { PanInfo, Variants } from 'framer-motion'
import { project, springs } from '../motion/physics'
import { scrollToTarget } from '../hooks/useLenis'
import './Navbar.css'

const NAV_SECTIONS = [
  { id: 'projects', label: 'Proyectos' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'contact', label: 'Contacto' },
] as const

type Dismiss = { velocity: number; distance: number } | null

// The menu is a material that comes down out of the navbar: it arrives slightly
// small and above its resting place, and leaves along the exact same path.
// Opened by tap and closed by tap/Esc it mirrors itself; closed by an upward
// swipe it keeps going in the direction (and at the speed) of the finger.
// (`hidden` holds the starting pose; `hidden` and `exit` share the same values.)
const mobileOverlayVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -24,
    scale: 0.98,
    backdropFilter: 'blur(0px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    backdropFilter: 'blur(24px)',
    transition: { ...springs.settle, staggerChildren: 0.04, delayChildren: 0.04 },
  },
  // Resolved through AnimatePresence's `custom`: a leaving child keeps the props
  // of its last render, so the exit has to decide for itself how to leave.
  exit: (d: Dismiss) =>
    d
      ? {
          opacity: 0,
          y: -d.distance - 40,
          backdropFilter: 'blur(0px)',
          transition: { ...springs.settle, y: { ...springs.settle, velocity: d.velocity } },
        }
      : {
          opacity: 0,
          y: -24,
          scale: 0.98,
          backdropFilter: 'blur(0px)',
          transition: springs.snappy,
        },
}

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springs.snappy },
}

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('')
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dismiss, setDismiss] = useState<Dismiss>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const overlayY = useMotionValue(0)

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
    if (el) scrollToTarget(el)
    setDismiss(null)
    setIsMobileOpen(false)
  }

  // Release of the swipe: project where the flick would land and commit to the
  // side it is heading for. Only the upward path exists (the menu came from the
  // top), so downward drags are rubber-banded and always return.
  const handleOverlayDragEnd = (_: PointerEvent, info: PanInfo) => {
    const height = overlayRef.current?.offsetHeight ?? 0
    const projected = info.offset.y + project(info.velocity.y)
    if (projected < -Math.max(120, height * 0.2)) {
      setDismiss({ velocity: info.velocity.y, distance: height })
      setIsMobileOpen(false)
    } else {
      animate(overlayY, 0, { ...springs.momentum, velocity: info.velocity.y })
    }
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <button
            className="navbar__logo"
            onClick={() => scrollToTarget(0)}
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
                    transition={springs.snappy}
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
              onClick={() => {
                setDismiss(null)
                setIsMobileOpen(prev => !prev)
              }}
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

      <AnimatePresence custom={dismiss}>
        {isMobileOpen && (
          <motion.div
            ref={overlayRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="navbar__mobile-overlay"
            variants={mobileOverlayVariants}
            custom={dismiss}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ y: overlayY, transformOrigin: 'top center' }}
            drag="y"
            dragDirectionLock
            dragMomentum={false}
            dragConstraints={{ top: -1200, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.15 }}
            onDragEnd={handleOverlayDragEnd}
          >
            {NAV_SECTIONS.map(s => (
              <motion.button
                key={s.id}
                className="navbar__mobile-link"
                variants={mobileItemVariants}
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
              </motion.button>
            ))}
            <motion.a
              className="navbar__mobile-cv-btn"
              variants={mobileItemVariants}
              href="/Fausto%20Chirino%20Calderon.pdf"
              download
            >
              <span className="material-symbols-outlined">terminal</span>
              CV
            </motion.a>
            <span className="navbar__grabber" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
