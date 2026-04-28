import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
}

export default function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getInitialStyle = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, transform: 'translateY(40px)' };
      case 'down':
        return { opacity: 0, transform: 'translateY(-40px)' };
      case 'left':
        return { opacity: 0, transform: 'translateX(40px)' };
      case 'right':
        return { opacity: 0, transform: 'translateX(-40px)' };
      case 'fade':
      default:
        return { opacity: 0 };
    }
  };

  const getAnimateStyle = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, transform: 'translateY(0)' };
      case 'left':
      case 'right':
        return { opacity: 1, transform: 'translateX(0)' };
      case 'fade':
      default:
        return { opacity: 1 };
    }
  };

  const initial = getInitialStyle();
  const animate = getAnimateStyle();

  return (
    <section
      ref={ref}
      style={{
        ...initial,
        opacity: isVisible ? animate.opacity : initial.opacity,
        transform: isVisible
          ? (animate as any).transform
          : (initial as any).transform,
        transition: `all ${duration}s ease-out ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </section>
  );
}