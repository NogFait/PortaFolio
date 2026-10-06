import type { Variants } from 'framer-motion'
import { springs } from './physics'

// A surface arrives from slightly below and slightly smaller, as if it were
// settling into place. No blur here on purpose: filter on a large container
// leaves a stacking context behind and breaks nested backdrop-filter glass.
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springs.gentle },
}

// Staggered children of a section: the same arrival, one beat apart.
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
})

export const item: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springs.settle },
}

// Small elements can afford blur: it reads as the element coming into focus.
export const focusIn: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: springs.gentle },
}
