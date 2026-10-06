import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, animate, useDragControls, useMotionValue, useTransform } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { SiGithub } from 'react-icons/si'
import type { Project } from '../types/ProjectType'
import { getTagsForProject } from '../data/projectTags'
import { TagList, TechStack } from './ProjectParts'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { lockScroll, unlockScroll } from '../hooks/useLenis'
import { project as projectMomentum, springs } from '../motion/physics'

type Props = {
  project: Project
  onClose: () => void
}

const labelStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.625rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  color: 'var(--secondary)',
}

const bodyStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.9375rem',
  color: 'var(--on-surface-variant)',
  lineHeight: 1.6,
  margin: 0,
}

// The card turns into this panel (shared layoutId), so the user sees where it
// came from and where it returns to. On a phone it is a bottom sheet: grab the
// header and it follows the finger 1:1, scales away and dims the page as it goes,
// and on release the flick is projected to decide whether it flies back to its card.
const ProjectDetail = ({ project, onClose }: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const dragControls = useDragControls()
  const y = useMotionValue(0)
  const scale = useTransform(y, [0, 400], [1, 0.94], { clamp: true })
  const dim = useTransform(y, [0, 360], [1, 0.2], { clamp: true })

  const tags = getTagsForProject(project.titulo)
  const isGitHub = project.link?.includes('github.com')

  useEffect(() => {
    lockScroll()
    closeRef.current?.focus({ preventScroll: true })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href]')
      if (!focusable || focusable.length === 0) return
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
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      unlockScroll()
    }
  }, [onClose])

  const handleDragEnd = (_: PointerEvent, info: PanInfo) => {
    const height = dialogRef.current?.offsetHeight ?? 0
    const projected = info.offset.y + projectMomentum(info.velocity.y)
    // Whatever the verdict, the drag offset hands its velocity to a spring; on
    // close the layout morph carries the panel back into its card at the same time.
    if (projected > Math.max(140, height * 0.25)) {
      onClose()
      animate(y, 0, { ...springs.settle, velocity: info.velocity.y })
    } else {
      animate(y, 0, { ...springs.momentum, velocity: info.velocity.y })
    }
  }

  // The image is a preview, not the content: a fixed, modest share of the panel so the text
  // is readable without scrolling. (It used to size itself from the screenshot's natural
  // height and took ~65% of the panel, squeezing the text out of view.)
  const imageHeight = isMobile ? 'clamp(150px, 24dvh, 200px)' : 'clamp(150px, 24vh, 250px)'

  return createPortal(
    <>
      <motion.div
        aria-hidden="true"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={springs.settle}
        style={{ position: 'fixed', inset: 0, zIndex: 1100, touchAction: 'none' }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: dim,
            // No backdrop blur: a full-screen blur that fades in and out is recomputed every
            // frame (measured: it doubled the panel's frame times). The dim and the panel's own
            // shadow carry the depth.
            background: 'rgba(6, 14, 32, 0.8)',
          }}
        />
      </motion.div>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1101,
          display: 'flex',
          alignItems: isMobile ? 'flex-end' : 'center',
          justifyContent: 'center',
          padding: isMobile ? 0 : '1.5rem',
          pointerEvents: 'none',
        }}
      >
        <motion.div
          ref={dialogRef}
          layoutId={`project-${project.id}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`project-title-${project.id}`}
          transition={{ default: springs.settle, layout: springs.settle }}
          drag={isMobile ? 'y' : false}
          dragListener={false}
          dragControls={dragControls}
          dragMomentum={false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.12, bottom: 1 }}
          onDragEnd={handleDragEnd}
          style={{
            y,
            scale,
            transformOrigin: 'center bottom',
            willChange: 'transform', // promote the morphing panel to its own layer
            pointerEvents: 'auto',
            width: isMobile ? '100%' : 'min(880px, 100%)',
            maxHeight: isMobile ? '92dvh' : '88vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: 'var(--surface-container-high)',
            // radius lives in style (not a class) so layout animation doesn't distort it
            borderRadius: isMobile ? '1.5rem 1.5rem 0 0' : '1.5rem',
            boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.7)',
          }}
        >
          {/* Grab area: on a phone dragging here moves the whole sheet */}
          <div
            onPointerDown={isMobile ? (e) => dragControls.start(e) : undefined}
            style={{
              position: 'relative',
              flex: `0 0 ${imageHeight}`,
              minHeight: 0,
              overflow: 'hidden',
              background: project.bgColor ?? 'var(--surface-container-highest)',
              touchAction: isMobile ? 'none' : 'auto',
              cursor: isMobile ? 'grab' : 'default',
            }}
          >
            <img
              src={project.imagen}
              alt={`Captura de pantalla del proyecto ${project.titulo}`}
              draggable={false}
              style={{
                // out of flow: the screenshot can never size its box
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: project.objectFit ?? 'cover',
                objectPosition: project.objectPosition ?? 'center',
                userSelect: 'none',
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--surface-container-high) 0%, transparent 45%)' }} />
            {isMobile && (
              <span aria-hidden="true" style={{
                position: 'absolute', top: 8, left: '50%', width: 36, height: 4, marginLeft: -18,
                borderRadius: 2, background: 'rgba(30, 35, 55, 0.55)', boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.4)',
              }} />
            )}
            <button
              ref={closeRef}
              onClick={onClose}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Cerrar detalle del proyecto"
              style={{
                position: 'absolute', top: 12, right: 12, width: 44, height: 44, padding: 0,
                display: 'grid', placeItems: 'center', borderRadius: '50%',
                background: 'rgba(6, 14, 32, 0.75)', color: 'var(--on-surface)',
              }}
            >
              <span className="material-symbols-outlined" aria-hidden="true">close</span>
            </button>
          </div>

          {/* The new content arrives after the shape has mostly landed */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { ...springs.settle, delay: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.08 } }}
            style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
          >
          <div
            data-lenis-prevent
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              padding: isMobile ? '1.25rem 1.25rem 1rem' : '1.5rem 2rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div>
              <TagList tags={tags} marginBottom="0.75rem" />
              <h2
                id={`project-title-${project.id}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: 'var(--on-surface)',
                  margin: 0,
                }}
              >
                {project.titulo}
              </h2>
            </div>

            <p style={bodyStyle}>{project.descripcion}</p>

            {project.problema && project.solucion && (
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                <div>
                  <span style={labelStyle}>Problema</span>
                  <p style={{ ...bodyStyle, marginTop: '0.375rem', fontSize: '0.875rem' }}>{project.problema}</p>
                </div>
                <div>
                  <span style={labelStyle}>Solución</span>
                  <p style={{ ...bodyStyle, marginTop: '0.375rem', fontSize: '0.875rem' }}>{project.solucion}</p>
                </div>
              </div>
            )}

            <TechStack tecnologias={project.tecnologias} />
          </div>

          {project.link && (
            <div style={{
              flex: '0 0 auto',
              padding: isMobile ? '0.75rem 1.25rem calc(1rem + env(safe-area-inset-bottom))' : '0.875rem 2rem 1.5rem',
              borderTop: '1px solid rgba(70, 69, 84, 0.25)',
              background: 'var(--surface-container-high)',
              display: 'flex',
              }}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn"
                style={{
                  flex: isMobile ? 1 : '0 0 auto',
                  justifyContent: 'center',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.5rem',
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
                  color: '#1000a9',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                }}
              >
                {isGitHub ? 'Ver código' : 'Ver proyecto'}
                {isGitHub
                  ? <SiGithub size={16} />
                  : <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>north_east</span>}
              </a>
            </div>
          )}
          </motion.div>
        </motion.div>
      </div>
    </>,
    document.body,
  )
}

export default ProjectDetail
