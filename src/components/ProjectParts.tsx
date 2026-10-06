import type { Project } from '../types/ProjectType'
import { TECH_ICONS } from '../data/techIcons'

const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  SaaS: { bg: 'rgba(var(--secondary-rgb), 0.3)', text: '#8ef7cd', border: 'rgba(var(--secondary-rgb), 0.5)' },
  Fullstack: { bg: 'rgba(var(--primary-rgb), 0.3)', text: '#ececff', border: 'rgba(var(--primary-rgb), 0.5)' },
  'E-commerce': { bg: 'rgba(255, 183, 131, 0.15)', text: '#ffb783', border: 'rgba(255, 183, 131, 0.2)' },
  'Desarrollo Web': { bg: 'rgba(var(--primary-rgb), 0.25)', text: '#e1e0ff', border: 'rgba(var(--primary-rgb), 0.35)' },
}

export const TechStack = ({ tecnologias, iconOnly = false }: { tecnologias?: string[]; iconOnly?: boolean }) => {
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

export const TagList = ({ tags, marginBottom = '1rem' }: { tags: string[]; marginBottom?: string }) => {
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
export const ProjectEvidence = ({ project, compact = false }: { project: Project; compact?: boolean }) => {
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
