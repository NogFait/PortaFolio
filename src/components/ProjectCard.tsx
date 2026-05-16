import { useEffect, useState } from 'react'
import { SiReact, SiTypescript, SiVite, SiCss, SiSupabase, SiPython, SiFastapi } from 'react-icons/si'
import type{ Project } from "../types/ProjectType";

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

type Props= {
  project:Project;
  variant?: 'grande' | 'vertical' | 'compact';
};

const POSITION_MAP = {
  grande: 'center 30%',
  vertical: 'center',
  compact: 'center',
} as const

const ProjectCard = ({project, variant = 'compact'}:Props) => {
  const isGrande = variant === 'grande'
  const isVertical = variant === 'vertical'
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const aspectRatio = isGrande
    ? (isMobile ? '16/9' : '3/1')
    : (isMobile ? '4/3' : '2/1')
  const titleSize = isGrande ? '0.75rem' : '0.6875rem'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
      height: '100%'
    }}>
        {project.imagen && (
          <div className={`project-card-image ${isGrande ? 'project-card-image--grande' : ''}`} style={{
            width: '100%',
            ...(isVertical && !isMobile ? { flex: 1, minHeight: 0 } : { aspectRatio }),
            overflow: 'hidden',
            borderRadius: '0.375rem',
            position: 'relative',
            backgroundColor: project.bgColor ?? (project.objectFit === 'contain' ? 'transparent' : '#0b1326')
          }}>
            <img 
              src={project.imagen} 
              alt={project.titulo}
              style={{
                width: '100%',
                height: '100%',
                objectFit: project.objectFit ?? 'cover',
                objectPosition: POSITION_MAP[variant],
                borderRadius: '0.375rem'
              }}
            />
          </div>
        )}

        <h3 style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: titleSize,
          lineHeight: '1.3',
          fontWeight: 600,
          color: '#dae2fd',
          marginBottom: 0
        }}>{project.titulo}</h3>

        {isGrande && <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.625rem',
          lineHeight: '1.3',
          color: '#c7c4d7',
          marginBottom: 0,
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{project.descripcion}</p>}

        {project.tecnologias && project.tecnologias.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.125rem'
          }}>
            {project.tecnologias.map((tech) => {
              const Icon = TECH_ICONS[tech]
              return (
                <span key={tech} className="tech-chip" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  fontSize: '0.625rem',
                  padding: '0.2rem 0.4rem'
                }}>
                  {Icon && <Icon size={10} />}
                  {tech}
                </span>
              )
            })}
          </div>
        )}

        {project.link && (
          <a 
            href={project.link}
            target="_blank"
            className="project-link-btn"
            style={{
              fontSize: titleSize,
              padding: '0.1875rem 0.375rem',
              marginTop: 0,
              alignSelf: 'flex-start'
            }}
          >
            Explorar →
          </a>
        )}
    </div>
  )
}

export default ProjectCard
