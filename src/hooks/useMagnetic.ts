import { useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent } from 'react'
import { springs } from '../motion/physics'

interface UseMagneticOptions {
  strength?: number
  disabled?: boolean
}

export function useMagnetic({ strength = 0.35, disabled = false }: UseMagneticOptions = {}) {
  const xRaw = useMotionValue(0)
  const yRaw = useMotionValue(0)

  // Slightly under-damped: when the pointer leaves, the element is released and
  // overshoots a touch on its way home, instead of gliding back dead.
  const x = useSpring(xRaw, springs.magnet)
  const y = useSpring(yRaw, springs.magnet)

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
