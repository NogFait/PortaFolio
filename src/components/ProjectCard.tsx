import { useState } from "react"
import type { CSSProperties, MouseEvent } from "react"
import type { Project } from "../types/ProjectType"
import { motion } from "framer-motion"
import { useBreakpoint, useMediaQuery } from "../hooks/useMediaQuery"
import { useTilt } from "../hooks/useTilt"
import { springs } from "../motion/physics"
import { TagList } from "./ProjectParts"
import { getTagsForProject } from "../data/projectTags"

type Layout = 'hero' | 'vertical' | 'compact' | 'split'

type Props = {
  project: Project
  layout?: Layout
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
const ProjectLinkIndicator = () => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.625rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--primary)',
  }} className="project-card-link">
    Ver detalle
    <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>open_in_full</span>
  </span>
)

// Cards only tease: two lines of context. Everything else (problem/solution, stack,
// full description, the external link) lives in the detail panel one tap away.
const Summary = ({ text, flex = false }: { text: string; flex?: boolean }) => (
  <p style={{
    fontFamily: 'var(--font-body)',
    fontSize: '0.8125rem',
    color: 'var(--on-surface-variant)',
    lineHeight: '1.5',
    margin: '0 0 0.875rem',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    lineClamp: 2,
    overflow: 'hidden',
    flex: flex ? 1 : undefined,
  } as CSSProperties}>{text}</p>
)

const ProjectCard = ({ project, layout = 'compact', onOpen }: Props) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint()
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { rotateX, rotateY, glareBackground, handleMouseMove, handleMouseLeave } = useTilt({
    disabled: !isDesktop || prefersReducedMotion
  })

  const tags = getTagsForProject(project.titulo)

  // The card is a link (so middle/cmd-click and keyboard still work) that, on a
  // plain click, becomes the detail panel instead of leaving the page.
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onOpen || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    handleMouseLeave() // flatten the tilt so the layout morph starts from a flat card
    onOpen(project.id, e.currentTarget)
  }

  const interactive = {
    href: project.link,
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'project-card',
    layoutId: `project-${project.id}`,
    onClick: handleClick,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    // Lifts toward the pointer, sinks under the press; the layout morph into the
    // detail panel gets its own, softer spring.
    whileHover: { y: -4 },
    whileTap: { scale: 0.985 },
    transition: { default: springs.snappy, scale: springs.press, layout: springs.settle },
  }

  if (layout === 'hero') {
    return (
      <motion.a
        {...interactive}
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          background: 'var(--surface-container-high)',
          height: isMobile ? 'auto' : '400px',
          textDecoration: 'none',
          cursor: 'pointer',
          rotateX,
          rotateY,
          transformPerspective: 800
        }}
      >
        <div style={{
          flex: `0 0 ${isMobile ? '190px' : '220px'}`,
          position: 'relative',
          overflow: 'hidden',
          background: project.bgColor ?? 'var(--surface-container-highest)'
        }}>
          <ProjectImage
            project={project}
            alt={`Captura de pantalla del proyecto ${project.titulo}`}
            loading="eager"
            fetchPriority="high"
            objectPosition={project.objectFit === 'contain' ? 'center' : 'center 30%'}
          />
        </div>
        <div style={{ flex: 1, padding: isMobile ? '1.25rem' : '1.75rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <TagList tags={tags} marginBottom="0.75rem" />
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
            fontWeight: 700,
            color: 'var(--on-surface)',
            marginBottom: '0.75rem'
          }}>{project.titulo}</h3>
          <Summary text={project.descripcion} />
          <ProjectLinkIndicator />
        </div>
        <motion.div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: glareBackground, pointerEvents: 'none' }} />
        <div className="project-card-border" />
      </motion.a>
    )
  }

  if (layout === 'vertical') {
    return (
      <motion.a
        {...interactive}
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          background: 'var(--surface-container-high)',
          height: isMobile ? 'auto' : '400px',
          textDecoration: 'none',
          cursor: 'pointer',
          position: 'relative',
          rotateX,
          rotateY,
          transformPerspective: 800
        }}
      >
        <div style={{
          flex: isMobile ? '0 0 170px' : 1,
          position: 'relative',
          overflow: 'hidden',
          background: project.bgColor ?? 'var(--surface-container-highest)'
        }}>
          <ProjectImage
            project={project}
            alt={`Captura de pantalla del proyecto ${project.titulo}`}
            loading="lazy"
            decoding="async"
            objectPosition={project.objectPosition}
            targetOpacity={project.objectFit === 'contain' ? 0.8 : 0.7}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--surface-container-high) 0%, transparent 60%)'
          }} />
        </div>
        <div style={{ padding: isMobile ? '1.25rem' : '1.5rem', flex: '0 0 auto', display: 'flex', flexDirection: 'column' }}>
          <TagList tags={tags} marginBottom="0.75rem" />
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.375rem',
            fontWeight: 700,
            color: 'var(--on-surface)',
            marginBottom: '0.375rem'
          }}>{project.titulo}</h3>
          <Summary text={project.descripcion} />
          <ProjectLinkIndicator />
        </div>
        <motion.div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: glareBackground, pointerEvents: 'none' }} />
        <div className="project-card-border" style={{ borderColor: 'rgba(var(--secondary-rgb), 0)' }} />
      </motion.a>
    )
  }

  if (layout === 'split') {
    return (
      <motion.a
        {...interactive}
        style={{
          display: 'flex',
          flexDirection: isTablet ? 'column' : 'row',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          background: 'var(--surface-container-high)',
          height: isMobile || isTablet ? 'auto' : '340px',
          textDecoration: 'none',
          cursor: 'pointer',
          position: 'relative',
          rotateX,
          rotateY,
          transformPerspective: 800
        }}
      >
        <div style={{
          flex: 1,
          padding: isMobile ? '1.25rem' : '1.75rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <TagList tags={tags} marginBottom="0.75rem" />
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.375rem',
            fontWeight: 700,
            color: 'var(--on-surface)',
            marginBottom: '0.75rem'
          }}>{project.titulo}</h3>
          <Summary text={project.descripcion} />
          <ProjectLinkIndicator />
        </div>
        <div style={{
          width: isTablet ? '100%' : '50%',
          height: isMobile ? '160px' : isTablet ? '200px' : '100%',
          position: 'relative',
          overflow: 'hidden',
          background: project.bgColor ?? 'var(--surface-container-highest)',
          order: isTablet ? -1 : 1
        }}>
          <ProjectImage
            project={project}
            alt={`Captura de pantalla del proyecto ${project.titulo}`}
            loading="lazy"
            decoding="async"
            objectPosition={project.objectPosition}
            targetOpacity={0.7}
          />
        </div>
        <motion.div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: glareBackground, pointerEvents: 'none' }} />
        <div className="project-card-border" />
      </motion.a>
    )
  }

  return (
      <motion.a
      {...interactive}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: '0.75rem',
        background: 'var(--surface-container-high)',
        height: isMobile ? 'auto' : '340px',
        textDecoration: 'none',
        cursor: 'pointer',
        position: 'relative',
        rotateX,
        rotateY,
        transformPerspective: 800
      }}
    >
      <div style={{
        height: isMobile ? '170px' : '50%',
        position: 'relative',
        overflow: 'hidden',
        background: project.bgColor ?? 'var(--surface-container-highest)'
      }}>
        <ProjectImage
          project={project}
          alt={`Captura de pantalla del proyecto ${project.titulo}`}
          loading="lazy"
          decoding="async"
          objectPosition={project.objectPosition}
          targetOpacity={0.8}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, var(--surface-container-high) 0%, transparent 50%)'
        }} />
      </div>
      <div style={{ padding: isMobile ? '1.25rem' : '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TagList tags={tags} marginBottom="0.75rem" />
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--on-surface)',
          marginBottom: '0.5rem'
        }}>{project.titulo}</h3>
        <Summary text={project.descripcion} flex />
        <ProjectLinkIndicator />
      </div>
      <motion.div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: glareBackground, pointerEvents: 'none' }} />
    <div className="project-card-border" style={{ borderColor: 'rgba(70, 69, 84, 0)' }} />
    </motion.a>
  )
}

export default ProjectCard
