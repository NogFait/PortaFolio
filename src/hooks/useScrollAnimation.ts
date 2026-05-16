import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  easing?: string;
  staggerDelay?: number;
}

export function useScrollAnimation<T extends HTMLElement>(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
    staggerDelay = 0,
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
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, staggerDelay, prefersReducedMotion]);

  const getTransformStyle = (direction: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale') => {
    if (prefersReducedMotion || isVisible) {
      return { opacity: 1, transform: 'translateY(0) translateX(0) scale(1)' };
    }

    switch (direction) {
      case 'up':
        return { opacity: 0, transform: 'translateY(40px) scale(1)' };
      case 'down':
        return { opacity: 0, transform: 'translateY(-40px) scale(1)' };
      case 'left':
        return { opacity: 0, transform: 'translateX(40px) scale(1)' };
      case 'right':
        return { opacity: 0, transform: 'translateX(-40px) scale(1)' };
      case 'scale':
        return { opacity: 0, transform: 'translateY(0) scale(0.95)' };
      case 'fade':
      default:
        return { opacity: 0, transform: 'translateY(0) scale(1)' };
    }
  };

  const getTransition = (duration = 0.8) =>
    prefersReducedMotion ? 'none' : `all ${duration}s ${easing}`;

  return { ref, isVisible, getTransformStyle, getTransition, prefersReducedMotion };
}
