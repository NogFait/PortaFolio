import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    staggerDelay = 0,
    once = true,
  } = options;

  const ref = useRef<T>(null!);
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const [isVisible, setIsVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (staggerDelay > 0) {
            setTimeout(() => setIsVisible(true), staggerDelay);
          } else {
            setIsVisible(true);
          }
          if (once) observer.unobserve(element);
        } else if (!once) {
          // Replay only when the element is back below the viewport (the reader scrolled
          // up past it). Leaving through the top must never hide it: a tall section's last
          // strip, or a card's bottom edge, would fade out while still on screen.
          const viewportHeight = entry.rootBounds?.height ?? window.innerHeight;
          if (entry.boundingClientRect.top > viewportHeight / 2) setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, staggerDelay, prefersReducedMotion, once]);

  return { ref, isVisible, prefersReducedMotion };
}
