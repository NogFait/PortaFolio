import { useState } from "react"
import type { CSSProperties, MouseEvent } from "react"
import type { Project, ProjectSize } from "../types/ProjectType"
import { motion } from "framer-motion"
import { useBreakpoint, useMediaQuery } from "../hooks/useMediaQuery"
import { useTilt } from "../hooks/useTilt"
import { springs } from "../motion/physics"
import { TagList } from "./ProjectParts"
import { getTagsForProject } from "../data/projectTags"

type Props = {
  project: Project
  size?: ProjectSize
  onOpen?: (id: string, trigger: HTMLElement) => void
}

// Lazy-loaded screenshots were popping in the instant they finished
// downloading. Fades opacity only (transform stays with the hover-zoom
// transition), so it also does the right thing under reduced motion.
const ProjectImage = ({
  project,
  alt,
  loading,
  decoding,
  fetchPriority,
  objectPosition,
  targetOpacity = 1,
}: {
  project: Project
  alt: string
  loading: 'lazy' | 'eager'
  decoding?: 'async'
  fetchPriority?: 'high'
  objectPosition?: string
  targetOpacity?: number
}) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={project.imagen}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      onLoad={() => setLoaded(true)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: project.objectFit ?? 'cover',
        objectPosition: objectPosition ?? 'center',
        opacity: loaded ? targetOpacity : 0,
        transition: 'transform var(--t-gentle) var(--spring), opacity 250ms var(--ease-out)',
      }}
      className="project-card-img"
    />
  )
}

// Names what clicking the card actually does: it opens the detail panel (the
// external link lives inside it, where GitHub vs live site is spelled out).
const ProjectLinkIndicator = ({ roomy = false }: { roomy?: boolean }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    fontFamily: 'var(--font-mono)',
    fontSize: roomy ? '0.75rem' : '0.625rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--primary)',
  }} className="project-card-link">
    Ver detalle
    <span className="material-symbols-outlined" style={{ fontSize: roomy ? '1rem' : '0.875rem' }}>open_in_full</span>
  </span>
)

// Cards only tease: two lines of context. Everything else (problem/solution, stack,
// full description, the external link) lives in the detail panel one tap away.
const Summary = ({ text, roomy = false }: { text: string; roomy?: boolean }) => (
  <p style={{
    fontFamily: 'var(--font-body)',
    fontSize: roomy ? '0.9375rem' : '0.8125rem',
    color: 'var(--on-surface-variant)',
    lineHeight: roomy ? '1.55' : '1.5',
    margin: roomy ? '0 0 1rem' : '0 0 0.875rem',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    lineClamp: 2,
    overflow: 'hidden',
  } as CSSProperties}>{text}</p>
)

// One card for every tile of the bento. What changes between sizes is the span
// and the aspect-ratio of the image box (both in App.css) plus the type scale
// here — never the markup, so a new project is a new entry in the data.
const ProjectCard = ({ project, size = 'half', onOpen }: Props) => {
  const { isMobile, isDesktop } = useBreakpoint()
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { rotateX, rotateY, glareBackground, handleMouseMove, handleMouseLeave } = useTilt({
    disabled: !isDesktop || prefersReducedMotion
  })

  const tags = getTagsForProject(project.titulo)
  // Desktop and tablet have the room: type steps up and the text reads as the
  // main content instead of a caption under a screenshot.
  const roomy = !isMobile
  const isFeature = size === 'feature'

  // The card is a link (so middle/cmd-click and keyboard still work) that, on a
  // plain click, becomes the detail panel instead of leaving the page.
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onOpen || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    handleMouseLeave() // flatten the tilt so the layout morph starts from a flat card
    onOpen(project.id, e.currentTarget)
  }

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-card project-card--${size}`}
      layoutId={`project-${project.id}`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Lifts toward the pointer, sinks under the press; the layout morph into
      // the detail panel gets its own, softer spring.
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      transition={{ default: springs.snappy, scale: springs.press, layout: springs.settle }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        borderRadius: '0.75rem',
        background: 'var(--surface-container-high)',
        textDecoration: 'none',
        cursor: 'pointer',
        position: 'relative',
        rotateX,
        rotateY,
        transformPerspective: 800
      }}
    >
      <div
        className="project-card__media"
        style={{ background: project.bgColor ?? 'var(--surface-container-highest)' }}
      >
        <ProjectImage
          project={project}
          alt={`Captura de pantalla del proyecto ${project.titulo}`}
          loading={isFeature ? 'eager' : 'lazy'}
          decoding={isFeature ? undefined : 'async'}
          fetchPriority={isFeature ? 'high' : undefined}
          objectPosition={project.objectPosition}
          targetOpacity={isFeature ? 1 : project.objectFit === 'contain' ? 0.8 : 0.7}
        />
        {!isFeature && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--surface-container-high) 0%, transparent 60%)'
          }} />
        )}
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: isMobile ? '1.25rem' : isFeature ? '1.75rem 2rem' : '1.5rem'
      }}>
        <TagList tags={tags} marginBottom="0.75rem" />
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: isFeature
            ? (isMobile ? 'clamp(1.375rem, 2.5vw, 1.75rem)' : 'clamp(1.75rem, 2.4vw, 2.25rem)')
            : (isMobile ? '1.25rem' : '1.5rem'),
          fontWeight: 700,
          color: 'var(--on-surface)',
          marginBottom: '0.5rem'
        }}>{project.titulo}</h3>
        <Summary text={project.descripcion} roomy={roomy} />
        <div style={{ marginTop: 'auto' }}>
          <ProjectLinkIndicator roomy={roomy} />
        </div>
      </div>

      <motion.div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: glareBackground, pointerEvents: 'none' }} />
      <div className="project-card-border" />
    </motion.a>
  )
}

export default ProjectCard
