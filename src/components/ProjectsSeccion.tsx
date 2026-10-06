import { motion } from 'framer-motion'
import { projects } from "../data/Projects"
import ProjectCard from "./ProjectCard"
import { item, stagger } from '../motion/variants'

// Entrance-stagger wrapper only. ProjectCard already tilts and glares itself
// (useTilt); a second rotation here used to stack on top of it and exaggerate
// the hover effect.
function GridItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  )
}

const ProjectsSeccion = () => {
  return (
    <motion.div
      className="projects-grid"
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-40px' }}
    >
      <GridItem className="projects-grid__hero">
        <ProjectCard project={projects[0]} layout="hero" />
      </GridItem>

      <GridItem className="projects-grid__tall">
        <ProjectCard project={projects[1]} layout="vertical" />
      </GridItem>

      <GridItem className="projects-grid__compact">
        <ProjectCard project={projects[3]} layout="compact" />
      </GridItem>

      <GridItem className="projects-grid__split">
        <ProjectCard project={projects[2]} layout="split" />
      </GridItem>
    </motion.div>
  )
}

export default ProjectsSeccion