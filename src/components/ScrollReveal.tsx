import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'bottom';
  delayMs?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'bottom',
  delayMs = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    let raf1 = 0;
    let raf2 = 0;

    const triggerEnter = () => {
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    };

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.96) {
      triggerEnter();
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            triggerEnter();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      observer.disconnect();
    };
  }, []);

  const hiddenTransform =
    direction === 'left'
      ? '-translate-x-24 scale-95 opacity-0'
      : direction === 'right'
        ? 'translate-x-24 scale-95 opacity-0'
        : 'translate-y-20 scale-95 opacity-0';

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: '950ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delayMs}ms`,
      }}
      className={`transition-all will-change-transform ${
        visible
          ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
          : hiddenTransform
      } ${className}`}
    >
      {children}
    </div>
  );
};
