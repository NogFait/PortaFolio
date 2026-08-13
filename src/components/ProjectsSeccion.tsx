import { useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { projects } from "../data/Projects"
import ProjectCard from "./ProjectCard"
import { useMediaQuery } from "../hooks/useMediaQuery"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(-y * 8)
    rotateY.set(x * 8)
  }, [isDesktop])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [])

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

const ProjectsSeccion = () => {
  return (
    <motion.div
      className="projects-grid"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <TiltCard className="projects-grid__hero">
        <ProjectCard project={projects[0]} layout="hero" />
      </TiltCard>

      <TiltCard className="projects-grid__tall">
        <ProjectCard project={projects[1]} layout="vertical" />
      </TiltCard>

      <TiltCard className="projects-grid__compact">
        <ProjectCard project={projects[3]} layout="compact" />
      </TiltCard>

      <TiltCard className="projects-grid__split">
        <ProjectCard project={projects[2]} layout="split" />
      </TiltCard>
    </motion.div>
  )
}

export default ProjectsSeccion