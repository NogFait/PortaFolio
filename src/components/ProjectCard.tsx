import type{ Project } from "../types/ProjectType";

type Props= {
  project:Project;
};
 
const ProjectCard = ({project}:Props) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      height: '100%'
    }}>
        {project.imagen && (
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            overflow: 'hidden',
            borderRadius: '0.75rem',
            position: 'relative',
            marginBottom: '0.5rem',
            backgroundColor: '#0b1326'
          }}>
            <img 
              src={project.imagen} 
              alt={project.titulo}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '0.75rem'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            />
          </div>
        )}
        
        <h3 style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: '1.5rem',
          lineHeight: '1.3',
          fontWeight: 600,
          color: '#dae2fd',
          marginBottom: '0.5rem'
        }}>{project.titulo}</h3>
        
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          color: '#c7c4d7',
          flex: '1',
          marginBottom: '0.75rem'
        }}>{project.descripcion}</p>
        
        {project.tecnologias && project.tecnologias.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.375rem',
            marginBottom: '0.75rem'
          }}>
            {project.tecnologias.map((tech, index) => (
              <span key={index} style={{
                display: 'inline-block',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.6875rem',
                backgroundColor: '#00a572',
                color: '#003824',
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 165, 114, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        
        {project.link && (
          <a 
            href={project.link}
            target="_blank"
            style={{
              fontFamily: '"Inter", sans-serif',
              color: '#1000a9',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              transition: 'all 0.3s ease',
              marginTop: 'auto',
              background: 'linear-gradient(45deg, #c0c1ff, #8083ff)',
              padding: '0.625rem 1.25rem',
              borderRadius: '0.75rem',
              boxShadow: '0 0 20px rgba(192, 193, 255, 0.3)'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.gap = '0.5rem';
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(192, 193, 255, 0.5)';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.gap = '0.375rem';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(192, 193, 255, 0.3)';
            }}
          >
            Explorar →
          </a>
        )}
    </div>
  )
}

export default ProjectCard;