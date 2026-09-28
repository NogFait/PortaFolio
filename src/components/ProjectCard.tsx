import { useState } from "react"
import type { Project } from "../types/ProjectType"
import { motion } from "framer-motion"
import { SiGithub } from "react-icons/si"
import { useBreakpoint, useMediaQuery } from "../hooks/useMediaQuery"
import { useTilt } from "../hooks/useTilt"
import { TECH_ICONS } from "../data/techIcons"

type Layout = 'hero' | 'vertical' | 'compact' | 'split'

type Props = {
  project: Project
  layout?: Layout
}

const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  SaaS: { bg: 'rgba(var(--secondary-rgb), 0.3)', text: '#8ef7cd', border: 'rgba(var(--secondary-rgb), 0.5)' },
  Fullstack: { bg: 'rgba(var(--primary-rgb), 0.3)', text: '#ececff', border: 'rgba(var(--primary-rgb), 0.5)' },
  'E-commerce': { bg: 'rgba(255, 183, 131, 0.15)', text: '#ffb783', border: 'rgba(255, 183, 131, 0.2)' },
  'Desarrollo Web': { bg: 'rgba(var(--primary-rgb), 0.25)', text: '#e1e0ff', border: 'rgba(var(--primary-rgb), 0.35)' },
}

const TechStack = ({ tecnologias, iconOnly = false }: { tecnologias?: string[]; iconOnly?: boolean }) => {
  if (!tecnologias || tecnologias.length === 0) return null
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {tecnologias.map(tech => {
        const Icon = TECH_ICONS[tech]
        return (
          <span key={tech} title={tech} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            padding: iconOnly ? '0.3125rem' : '0.25rem 0.5rem',
            borderRadius: '9999px',
            background: 'var(--surface-container-lowest)',
            color: 'var(--on-surface-variant)',
            border: '1px solid var(--outline-variant)'
          }}>
            {Icon && <Icon size={12} />}
            {!iconOnly && tech}
          </span>
        )
      })}
    </div>
  )
}

const TagList = ({ tags, marginBottom = '1rem' }: { tags: string[]; marginBottom?: string }) => {
  if (tags.length === 0) return null
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom, flexWrap: 'wrap' }}>
      {tags.map(tag => (
        <span key={tag} style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          padding: '0.25rem 0.5rem',
          borderRadius: '9999px',
          background: TAG_COLORS[tag]?.bg ?? 'rgba(var(--primary-rgb), 0.1)',
          color: TAG_COLORS[tag]?.text ?? 'var(--primary)',
          border: `1px solid ${TAG_COLORS[tag]?.border ?? 'rgba(var(--primary-rgb), 0.1)'}`,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontWeight: 600
        }}>
          {tag}
        </span>
      ))}
    </div>
  )
}

// Renders the problema/solucion pair when the data exists; falls back to the
// plain descripcion otherwise, since not every project has that evidence yet.
const ProjectEvidence = ({ project, compact = false }: { project: Project; compact?: boolean }) => {
  const textStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: compact ? '0.8125rem' : '0.875rem',
    color: 'var(--on-surface-variant)',
    lineHeight: '1.5',
    margin: 0,
  }
  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.625rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: 'var(--secondary)',
  }

  if (!project.problema || !project.solucion) {
    return <p style={{ ...textStyle, marginBottom: compact ? '1rem' : '1.5rem' }}>{project.descripcion}</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: compact ? '1rem' : '1.5rem' }}>
      <div>
        <span style={labelStyle}>Problema</span>
        <p style={{ ...textStyle, marginTop: '0.25rem' }}>{project.problema}</p>
      </div>
      <div>
        <span style={labelStyle}>Solución</span>
        <p style={{ ...textStyle, marginTop: '0.25rem' }}>{project.solucion}</p>
      </div>
    </div>
  )
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
        transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 250ms var(--ease-out)',
      }}
      className="project-card-img"
    />
  )
}

// Names what clicking the card actually does: GitHub links read "Ver código",
// live sites read "Ver Proyecto" - a recruiter shouldn't have to guess.
const ProjectLinkIndicator = ({ link }: { link?: string }) => {
  const isGitHub = link?.includes('github.com')
  return (
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
      {isGitHub ? 'Ver código' : 'Ver Proyecto'}
      {isGitHub
        ? <SiGithub size={11} />
        : <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>north_east</span>}
    </span>
  )
}

const ProjectCard = ({ project, layout = 'compact' }: Props) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint()
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { rotateX, rotateY, glareBackground, handleMouseMove, handleMouseLeave } = useTilt({
    disabled: !isDesktop || prefersReducedMotion
  })

  const tags = getTagsForProject(project.titulo)

  if (layout === 'hero') {
    return (
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          background: 'var(--surface-container-high)',
          height: isMobile ? '640px' : isTablet ? '480px' : '480px',
          textDecoration: 'none',
          cursor: 'pointer',
          rotateX,
          rotateY,
          transformPerspective: 800
        }}
      >
        <div style={{
          flex: `0 0 ${isMobile ? '260px' : '220px'}`,
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
        <div style={{ flex: 1, padding: isMobile ? '1.5rem' : '1.75rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <TagList tags={tags} marginBottom="0.75rem" />
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
            fontWeight: 700,
            color: 'var(--on-surface)',
            marginBottom: '0.75rem'
          }}>{project.titulo}</h3>
          <ProjectEvidence project={project} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <TechStack tecnologias={project.tecnologias} />
            <ProjectLinkIndicator link={project.link} />
          </div>
        </div>
        <motion.div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: glareBackground, pointerEvents: 'none' }} />
        <div className="project-card-border" />
      </motion.a>
    )
  }

  if (layout === 'vertical') {
    return (
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          background: 'var(--surface-container-high)',
          height: isMobile ? '470px' : isTablet ? '480px' : '480px',
          textDecoration: 'none',
          cursor: 'pointer',
          position: 'relative',
          rotateX,
          rotateY,
          transformPerspective: 800
        }}
      >
        <div style={{
          flex: isMobile ? '0 0 220px' : 1,
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
        <div style={{ padding: '1.5rem', flex: '0 0 auto', display: 'flex', flexDirection: 'column' }}>
          <TagList tags={tags} marginBottom="0.75rem" />
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.375rem',
            fontWeight: 700,
            color: 'var(--on-surface)',
            marginBottom: '0.375rem'
          }}>{project.titulo}</h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--on-surface-variant)',
            lineHeight: '1.5',
            marginBottom: '0.75rem'
          }}>{project.descripcion}</p>
          <div style={{ marginBottom: '0.75rem' }}>
            <TechStack tecnologias={project.tecnologias} />
          </div>
          <ProjectLinkIndicator link={project.link} />
        </div>
        <motion.div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: glareBackground, pointerEvents: 'none' }} />
        <div className="project-card-border" style={{ borderColor: 'rgba(var(--secondary-rgb), 0)' }} />
      </motion.a>
    )
  }

  if (layout === 'split') {
    return (
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'flex',
          flexDirection: isTablet ? 'column' : 'row',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          background: 'var(--surface-container-high)',
          height: isMobile ? '560px' : isTablet ? '480px' : '400px',
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
          padding: '1.75rem 2rem',
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
          <ProjectEvidence project={project} compact />
          {project.resultados && project.resultados.length > 0 ? (
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.75rem' }}>
              {project.resultados.map(r => (
                <div key={r.label}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--secondary)',
                    display: 'block'
                  }}>{r.value}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    textTransform: 'uppercase',
                    color: 'var(--outline)'
                  }}>{r.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ marginBottom: '0.75rem' }}>
              <TechStack tecnologias={project.tecnologias} />
            </div>
          )}
          <ProjectLinkIndicator link={project.link} />
        </div>
        <div style={{
          width: isTablet ? '100%' : '50%',
          height: isTablet ? '200px' : '100%',
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
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: '0.75rem',
        background: 'var(--surface-container-high)',
        height: isMobile ? '420px' : '400px',
        textDecoration: 'none',
        cursor: 'pointer',
        position: 'relative',
        rotateX,
        rotateY,
        transformPerspective: 800
      }}
    >
      <div style={{
        height: '50%',
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
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--on-surface)',
          marginBottom: '0.5rem'
        }}>{project.titulo}</h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8125rem',
          color: 'var(--on-surface-variant)',
          lineHeight: '1.5',
          marginBottom: '0.75rem',
          flex: 1
        }}>{project.descripcion}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <TagList tags={tags} marginBottom="0" />
          <TechStack tecnologias={project.tecnologias} iconOnly />
        </div>
        <ProjectLinkIndicator link={project.link} />
      </div>
      <motion.div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: glareBackground, pointerEvents: 'none' }} />
    <div className="project-card-border" style={{ borderColor: 'rgba(70, 69, 84, 0)' }} />
    </motion.a>
  )
}

function getTagsForProject(title: string): string[] {
  const map: Record<string, string[]> = {
    'Client Flow': ['SaaS', 'Fullstack'],
    'FoodStore': ['E-commerce'],
    'El Tornillo': ['Desarrollo Web'],
    'Studio Glam': ['Desarrollo Web'],
  }
  return map[title] ?? []
}

export default ProjectCard
