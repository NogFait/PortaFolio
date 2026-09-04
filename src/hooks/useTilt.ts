import { useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import type { MouseEvent } from 'react'

interface UseTiltOptions {
  max?: number
  disabled?: boolean
}

export function useTilt({ max = 8, disabled = false }: UseTiltOptions = {}) {
  const rotateXRaw = useMotionValue(0)
  const rotateYRaw = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 }
  const rotateX = useSpring(rotateXRaw, springConfig)
  const rotateY = useSpring(rotateYRaw, springConfig)

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12), transparent 55%)`

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (disabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateYRaw.set((px - 0.5) * max * 2)
    rotateXRaw.set(-(py - 0.5) * max * 2)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  const handleMouseLeave = () => {
    rotateXRaw.set(0)
    rotateYRaw.set(0)
  }

  return { rotateX, rotateY, glareBackground, handleMouseMove, handleMouseLeave }
}
