import { useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { projects } from "../data/Projects";
import ProjectCard from "./ProjectCard";

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
  const isDesktop = window.innerWidth >= 1024

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
      className="bento-grid"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <TiltCard className="bento-grande">
        <ProjectCard project={projects[0]} variant="grande" />
      </TiltCard>

      <TiltCard className="bento-vertical">
        <ProjectCard project={projects[1]} variant="vertical" />
      </TiltCard>

      <TiltCard className="bento-small">
        <ProjectCard project={projects[2]} variant="compact" />
      </TiltCard>

      <TiltCard className="bento-small">
        <ProjectCard project={projects[3]} variant="compact" />
      </TiltCard>
    </motion.div>
  );
};

export default ProjectsSeccion;