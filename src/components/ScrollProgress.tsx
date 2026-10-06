import { motion, useScroll, useSpring } from 'framer-motion'
import { springs } from '../motion/physics'

// Reading progress, tied to the scroll position. The spring only removes the
// stair-stepping of wheel ticks; it never lags the real position by much.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, springs.follow)

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        transformOrigin: '0 50%',
        background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
        zIndex: 1001,
        pointerEvents: 'none',
      }}
    />
  )
}

export default ScrollProgress
