import { useEffect } from 'react'
import Lenis from 'lenis'

// One shared instance, so programmatic scrolls (nav links) go through the same
// physics as the wheel instead of fighting it with native smooth-scroll.
let instance: Lenis | null = null

// Wheel input decays exponentially toward the target (lerp) rather than playing
// a fixed-duration tween: it inherits the current velocity and any new wheel tick
// redirects it immediately, like native scroll inertia.
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.09,
      orientation: 'vertical',
      smoothWheel: true,
    })
    instance = lenis

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      instance = null
    }
  }, [])
}

export function scrollToTarget(target: string | number | HTMLElement) {
  if (instance) {
    // lerp-based: no duration/easing, and the user grabbing the wheel mid-flight takes over.
    instance.scrollTo(target, { lerp: 0.12 })
    return
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' })
  else if (typeof target === 'string') document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  else target.scrollIntoView({ behavior: 'smooth' })
}
