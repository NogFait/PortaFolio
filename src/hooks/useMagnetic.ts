import { useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent } from 'react'

interface UseMagneticOptions {
  strength?: number
  disabled?: boolean
}

export function useMagnetic({ strength = 0.35, disabled = false }: UseMagneticOptions = {}) {
  const xRaw = useMotionValue(0)
  const yRaw = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 15, mass: 0.15 }
  const x = useSpring(xRaw, springConfig)
  const y = useSpring(yRaw, springConfig)

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (disabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    xRaw.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    yRaw.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const handleMouseLeave = () => {
    xRaw.set(0)
    yRaw.set(0)
  }

  return { x, y, handleMouseMove, handleMouseLeave }
}
