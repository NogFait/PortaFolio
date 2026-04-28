import { projects } from "../data/Projects";
import ProjectCard from "./ProjectCard";

const ProjectsSeccion = () => {
  return (
<div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '1.5rem',
      width: '100%',
      alignItems: 'start'
    }}>
      {projects.map((project) => (
        <div style={{
          background: 'linear-gradient(145deg, #222a3d 0%, #2d3449 100%)',
          padding: '1.5rem',
          borderRadius: '1rem',
          boxShadow: '0 10px 40px rgba(218, 226, 253, 0.06), 0 0 100px rgba(192, 193, 255, 0.05)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          border: '1px solid rgba(192, 193, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(218, 226, 253, 0.1), 0 0 150px rgba(192, 193, 255, 0.1)';
          e.currentTarget.style.border = '1px solid rgba(192, 193, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 10px 40px rgba(218, 226, 253, 0.06), 0 0 100px rgba(192, 193, 255, 0.05)';
          e.currentTarget.style.border = '1px solid rgba(192, 193, 255, 0.1)';
        }}
        >
          {/* Overlay gradiente opcional - sin glow extra */}
          {/* <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(192, 193, 255, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} /> */}
          
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectsSeccion;