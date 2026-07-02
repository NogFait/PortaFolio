import { useEffect, useState } from 'react'
import { SiReact, SiTypescript, SiVite, SiCss, SiSupabase, SiPython, SiFastapi } from 'react-icons/si'
import type { Project } from "../types/ProjectType"

const TECH_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  React: SiReact,
  Typescript: SiTypescript,
  TypeScript: SiTypescript,
  Vite: SiVite,
  CSS: SiCss,
  Supabase: SiSupabase,
  Python: SiPython,
  FastAPI: SiFastapi,
}

type Layout = 'hero' | 'vertical' | 'compact' | 'split'

type Props = {
  project: Project
  layout?: Layout
}

const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  SaaS: { bg: 'rgba(78, 222, 163, 0.3)', text: '#8ef7cd', border: 'rgba(78, 222, 163, 0.5)' },
  Fullstack: { bg: 'rgba(192, 193, 255, 0.3)', text: '#ececff', border: 'rgba(192, 193, 255, 0.5)' },
  'E-commerce': { bg: 'rgba(255, 183, 131, 0.15)', text: '#ffb783', border: 'rgba(255, 183, 131, 0.2)' },
  'Desarrollo Web': { bg: 'rgba(192, 193, 255, 0.25)', text: '#e1e0ff', border: 'rgba(192, 193, 255, 0.35)' },
}

const ProjectCard = ({ project, layout = 'compact' }: Props) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 768)
      setIsTablet(window.innerWidth <= 1024)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const tags = getTagsForProject(project.titulo)

  if (layout === 'hero') {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          background: '#222a3d',
          height: isMobile ? '400px' : isTablet ? '380px' : '380px',
          textDecoration: 'none',
          cursor: 'pointer'
        }}
      >
        <img
          src={project.imagen}
          alt={project.titulo}
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
            ? 'linear-gradient(to top, #0b1326 0%, rgba(11, 19, 38, 0.6) 40%, transparent 100%)'
            : 'linear-gradient(to top, #0b1326 0%, rgba(11, 19, 38, 0.4) 50%, transparent 100%)'
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
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.625rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '9999px',
                  background: TAG_COLORS[tag]?.bg ?? 'rgba(192, 193, 255, 0.1)',
                  color: TAG_COLORS[tag]?.text ?? '#c0c1ff',
                  border: `1px solid ${TAG_COLORS[tag]?.border ?? 'rgba(192, 193, 255, 0.1)'}`,
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
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: '#dae2fd',
            marginBottom: '0.5rem'
          }}>{project.titulo}</h3>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.875rem',
            color: '#c7c4d7',
            maxWidth: '400px',
            lineHeight: '1.5',
            marginBottom: '1rem'
          }}>{project.descripcion}</p>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#c0c1ff',
            transition: 'transform 0.3s ease'
          }} className="project-card-link">
            Ver Proyecto
            <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>north_east</span>
          </span>
        </div>
        <div className="project-card-border" />
      </a>
    )
  }

  if (layout === 'vertical') {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          background: '#222a3d',
          height: isMobile ? '450px' : isTablet ? '380px' : '380px',
          textDecoration: 'none',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        <div style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          background: project.bgColor ?? '#2d3449'
        }}>
          <img
            src={project.imagen}
            alt={project.titulo}
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
            background: 'linear-gradient(to top, #222a3d 0%, transparent 60%)'
          }} />
        </div>
        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              {tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.625rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '9999px',
                  background: TAG_COLORS[tag]?.bg ?? 'rgba(192, 193, 255, 0.1)',
                  color: TAG_COLORS[tag]?.text ?? '#c0c1ff',
                  border: `1px solid ${TAG_COLORS[tag]?.border ?? 'rgba(192, 193, 255, 0.1)'}`,
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
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: '1.375rem',
            fontWeight: 700,
            color: '#dae2fd',
            marginBottom: '0.375rem'
          }}>{project.titulo}</h3>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.8125rem',
            color: '#c7c4d7',
            lineHeight: '1.5',
            marginBottom: '1rem'
          }}>{project.descripcion}</p>
          <span className="material-symbols-outlined" style={{
            alignSelf: 'flex-end',
            color: '#c0c1ff',
            fontSize: '1.25rem',
            transition: 'transform 0.3s ease'
          }}>arrow_forward</span>
        </div>
        <div className="project-card-border" style={{ borderColor: 'rgba(78, 222, 163, 0)' }} />
      </a>
    )
  }

  if (layout === 'split') {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          flexDirection: isTablet ? 'column' : 'row',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          background: '#222a3d',
          height: isMobile ? '500px' : isTablet ? '420px' : '320px',
          textDecoration: 'none',
          cursor: 'pointer',
          position: 'relative'
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
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.625rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '9999px',
                  background: TAG_COLORS[tag]?.bg ?? 'rgba(192, 193, 255, 0.1)',
                  color: TAG_COLORS[tag]?.text ?? '#c0c1ff',
                  border: `1px solid ${TAG_COLORS[tag]?.border ?? 'rgba(192, 193, 255, 0.1)'}`,
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
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#dae2fd',
            marginBottom: '1rem'
          }}>{project.titulo}</h3>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.8125rem',
            color: '#c7c4d7',
            lineHeight: '1.5',
            marginBottom: '2rem'
          }}>{project.descripcion}</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div>
              <span style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#4edea3',
                display: 'block'
              }}>A+</span>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                color: '#908fa0'
              }}>Performance</span>
            </div>
            <div>
              <span style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#c0c1ff',
                display: 'block'
              }}>SEO</span>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                color: '#908fa0'
              }}>Optimizado</span>
            </div>
          </div>
        </div>
        <div style={{
          width: isTablet ? '100%' : '50%',
          height: isTablet ? '200px' : '100%',
          position: 'relative',
          overflow: 'hidden',
          background: project.bgColor ?? '#2d3449',
          order: isTablet ? -1 : 1
        }}>
          <img
            src={project.imagen}
            alt={project.titulo}
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
        <div className="project-card-border" />
      </a>
    )
  }

  return (
      <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: '0.75rem',
        background: '#222a3d',
        height: isMobile ? '400px' : isTablet ? '380px' : '320px',
        textDecoration: 'none',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      <div style={{
        height: '50%',
        position: 'relative',
        overflow: 'hidden',
        background: project.bgColor ?? '#2d3449'
      }}>
        <img
          src={project.imagen}
          alt={project.titulo}
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
          background: 'linear-gradient(to top, #222a3d 0%, transparent 50%)'
        }} />
      </div>
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#dae2fd',
          marginBottom: '0.5rem'
        }}>{project.titulo}</h3>
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.8125rem',
          color: '#c7c4d7',
          lineHeight: '1.5',
          marginBottom: '0.75rem',
          flex: 1
        }}>{project.descripcion}</p>
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {tags.map(tag => (
              <span key={tag} style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.625rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
                background: TAG_COLORS[tag]?.bg ?? 'rgba(192, 193, 255, 0.1)',
                color: TAG_COLORS[tag]?.text ?? '#c0c1ff',
                border: `1px solid ${TAG_COLORS[tag]?.border ?? 'rgba(192, 193, 255, 0.1)'}`,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="project-card-border" style={{ borderColor: 'rgba(70, 69, 84, 0)' }} />
    </a>
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