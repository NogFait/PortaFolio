import type { Project } from "../types/ProjectType"
import { motion } from "framer-motion"
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
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          background: 'var(--surface-container-high)',
          height: isMobile ? '400px' : isTablet ? '380px' : '380px',
          textDecoration: 'none',
          cursor: 'pointer',
          rotateX,
          rotateY,
          transformPerspective: 800
        }}
      >
        <img
          src={project.imagen}
          alt={project.titulo}
          loading="eager"
          fetchPriority="high"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: project.objectFit ?? 'cover',
            objectPosition: project.objectFit === 'contain' ? 'center' : 'center 30%',
            opacity: project.objectFit === 'contain' ? 0.85 : 0.6,
            transition: 'transform 0.7s ease'
          }}
          className="project-card-img"
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: project.objectFit === 'contain'
            ? 'linear-gradient(to top, var(--surface) 0%, rgba(var(--surface-rgb), 0.6) 40%, transparent 100%)'
            : 'linear-gradient(to top, var(--surface) 0%, rgba(var(--surface-rgb), 0.4) 50%, transparent 100%)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          padding: '2rem',
          width: '100%'
        }}>
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
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
          )}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--on-surface)',
            marginBottom: '0.5rem'
          }}>{project.titulo}</h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--on-surface-variant)',
            maxWidth: '400px',
            lineHeight: '1.5',
            marginBottom: '1rem'
          }}>{project.descripcion}</p>
          <div style={{ marginBottom: '1rem' }}>
            <TechStack tecnologias={project.tecnologias} />
          </div>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--primary)',
            transition: 'transform 0.3s ease'
          }} className="project-card-link">
            Ver Proyecto
            <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>north_east</span>
          </span>
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
          height: isMobile ? '450px' : isTablet ? '380px' : '380px',
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
          position: 'relative',
          overflow: 'hidden',
          background: project.bgColor ?? 'var(--surface-container-highest)'
        }}>
          <img
            src={project.imagen}
            alt={project.titulo}
            loading="lazy"
            decoding="async"
            style={{
            width: '100%',
            height: '100%',
            objectFit: project.objectFit ?? 'cover',
            objectPosition: project.objectPosition ?? 'center',
            opacity: project.objectFit === 'contain' ? 0.8 : 0.7,
              transition: 'transform 0.7s ease'
            }}
            className="project-card-img"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--surface-container-high) 0%, transparent 60%)'
          }} />
        </div>
        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
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
          )}
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
            marginBottom: '1rem'
          }}>{project.descripcion}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <TechStack tecnologias={project.tecnologias} iconOnly />
            <span className="material-symbols-outlined" style={{
              color: 'var(--primary)',
              fontSize: '1.25rem',
              transition: 'transform 0.3s ease'
            }}>arrow_forward</span>
          </div>
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
          height: isMobile ? '500px' : isTablet ? '420px' : '320px',
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
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
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
          )}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--on-surface)',
            marginBottom: '1rem'
          }}>{project.titulo}</h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--on-surface-variant)',
            lineHeight: '1.5',
            marginBottom: '2rem'
          }}>{project.descripcion}</p>
          {project.resultados && project.resultados.length > 0 ? (
            <div style={{ display: 'flex', gap: '1.5rem' }}>
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
            <TechStack tecnologias={project.tecnologias} />
          )}
        </div>
        <div style={{
          width: isTablet ? '100%' : '50%',
          height: isTablet ? '200px' : '100%',
          position: 'relative',
          overflow: 'hidden',
          background: project.bgColor ?? 'var(--surface-container-highest)',
          order: isTablet ? -1 : 1
        }}>
          <img
            src={project.imagen}
            alt={project.titulo}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: project.objectFit ?? 'cover',
              objectPosition: project.objectPosition ?? 'center',
              opacity: 0.7,
              transition: 'transform 0.7s ease'
            }}
            className="project-card-img"
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
        height: isMobile ? '400px' : isTablet ? '380px' : '320px',
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
        <img
          src={project.imagen}
          alt={project.titulo}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: project.objectFit ?? 'cover',
            objectPosition: project.objectPosition ?? 'center',
            opacity: 0.8,
            transition: 'transform 0.7s ease'
          }}
          className="project-card-img"
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
          )}
          <TechStack tecnologias={project.tecnologias} iconOnly />
        </div>
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