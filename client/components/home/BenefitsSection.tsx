'use client';

/**
 * Benefits section with 3D flip cards
 * Displays benefits in elegant flip cards with scroll animations
 */

import { useState, useEffect, useRef } from 'react';
import { BENEFITS } from '@/lib/constants';

export default function BenefitsSection() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const timeoutRefs = useRef<{ [key: number]: NodeJS.Timeout }>({});

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            // Animate cards with stagger effect
            BENEFITS.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => new Set([...prev, index]));
              }, index * 150);
            });
            // Unobserve after animation to prevent re-triggering
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Store timeouts ref for cleanup
    const timeouts = timeoutRefs.current;

    return () => {
      observer.disconnect();
      // Clear all timeouts on unmount
      Object.values(timeouts).forEach(clearTimeout);
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    // Clear any pending timeout for this card
    if (timeoutRefs.current[index]) {
      clearTimeout(timeoutRefs.current[index]);
      delete timeoutRefs.current[index];
    }
    // Flip immediately
    setFlippedCards((prev) => new Set([...prev, index]));
  };

  const handleMouseLeave = (index: number) => {
    // Clear any existing timeout
    if (timeoutRefs.current[index]) {
      clearTimeout(timeoutRefs.current[index]);
    }
    // Set timeout to flip back after 300ms
    timeoutRefs.current[index] = setTimeout(() => {
      setFlippedCards((prev) => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
      delete timeoutRefs.current[index];
    }, 300);
  };

  return (
    <section className="mt-10" ref={sectionRef}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Por qué elegirnos
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Comprometidos con tu salud y bienestar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BENEFITS.map((benefit, index) => {
          const isFlipped = flippedCards.has(index);
          const isVisible = visibleCards.has(index);
          // First row: left to right (0, 1)
          // Second row: right to left (2, 3)
          const isFirstRow = index < 2;
          const animationClass = isFirstRow
            ? 'translate-x-[-100px]'
            : 'translate-x-[100px]';

          return (
            <div
              key={benefit.title}
              className={`perspective-1000 transition-all duration-700 ease-out ${isVisible
                ? 'opacity-100 translate-x-0'
                : `opacity-0 ${animationClass}`
                }`}
              style={{ minHeight: '320px' }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div
                className="relative w-full h-full cursor-pointer preserve-3d"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                }}
              >
                {/* Front of card */}
                <div
                  className="absolute inset-0 backface-hidden rounded-2xl bg-gray-900 border border-zinc-800 p-6 shadow-lg hover:shadow-xl transition-shadow"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    {/* Icon */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-4xl shadow-lg mb-4">
                      {benefit.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-zinc-50 mb-2">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-zinc-400 mb-4">
                      {benefit.description}
                    </p>

                    {/* Hover hint */}
                    <div className="mt-auto pt-4">
                      <div className="inline-flex items-center gap-2 text-xs text-blue-400">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Pasa el cursor para ver más</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 backface-hidden rounded-2xl bg-gray-950 border border-zinc-700 p-6 shadow-lg"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="h-full flex flex-col">
                    {/* Header with icon */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-zinc-800">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-2xl shadow-lg">
                        {benefit.icon}
                      </div>
                      <h3 className="text-lg font-bold text-zinc-50">
                        {benefit.title}
                      </h3>
                    </div>

                    {/* Details list */}
                    <div className="flex-1 overflow-y-auto">
                      <h4 className="text-xs font-medium text-zinc-400 mb-3 uppercase tracking-wide">
                        Características destacadas:
                      </h4>
                      <ul className="space-y-2">
                        {benefit.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-zinc-300"
                          >
                            <svg
                              className="mt-0.5 h-4 w-4 shrink-0 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer badge */}
                    <div className="mt-4 pt-4 border-t border-zinc-800">
                      <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1.5 text-xs text-blue-400">
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Garantizado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-8 text-center">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Todos nuestros servicios están respaldados por nuestra garantía de satisfacción
        </p>
      </div>

      {/* CSS for 3D flip effect */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}
