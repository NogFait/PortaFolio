import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { projects } from "../data/Projects"
import ProjectCard from "./ProjectCard"
import ProjectDetail from "./ProjectDetail"
import { item, stagger } from '../motion/variants'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

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
  const [openId, setOpenId] = useState<string | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const open = useCallback((id: string, trigger: HTMLElement) => {
    triggerRef.current = trigger
    setOpenId(id)
  }, [])

  const close = useCallback(() => {
    setOpenId(null)
    // the panel was reached from a specific card: hand focus back to it
    triggerRef.current?.focus({ preventScroll: true })
  }, [])

  const openProject = projects.find(p => p.id === openId)

  // threshold 0 + bottom-only margin: reveals as soon as the grid is 40px inside,
  // and (see useScrollAnimation) never hides while any part is still on screen
  const { ref: gridRef, isVisible } = useScrollAnimation<HTMLDivElement>({
    once: false,
    threshold: 0,
    rootMargin: '0px 0px -40px 0px',
  })

  return (
    <LayoutGroup>
      <motion.div
        ref={gridRef}
        className="projects-grid"
        variants={stagger(0.08)}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <GridItem className="projects-grid__hero">
          <ProjectCard project={projects[0]} layout="hero" onOpen={open} />
        </GridItem>

        <GridItem className="projects-grid__tall">
          <ProjectCard project={projects[1]} layout="vertical" onOpen={open} />
        </GridItem>

        <GridItem className="projects-grid__compact">
          <ProjectCard project={projects[3]} layout="compact" onOpen={open} />
        </GridItem>

        <GridItem className="projects-grid__split">
          <ProjectCard project={projects[2]} layout="split" onOpen={open} />
        </GridItem>
      </motion.div>

      <AnimatePresence>
        {openProject && <ProjectDetail key={openProject.id} project={openProject} onClose={close} />}
      </AnimatePresence>
    </LayoutGroup>
  )
}

export default ProjectsSeccion
