'use client';

/**
 * Category grid section with animated cards
 * Displays service categories with icons and hover effects
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { CATEGORIES } from '@/lib/constants';

export default function CategoryGrid() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (e: React.MouseEvent, slug: string) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push('/login');
    }
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            // Animate cards with stagger effect
            CATEGORIES.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => new Set([...prev, index]));
              }, index * 100);
            });
            // Unobserve after animation
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4],
        rootMargin: '0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="mt-12" ref={sectionRef}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Especialidades destacadas
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Encuentra el tratamiento que necesitas
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((category, index) => {
          const isVisible = visibleCards.has(index);

          return (
            <Link
              key={category.key}
              href={isAuthenticated ? `/search?service=${encodeURIComponent(category.slug)}` : '#'}
              onClick={(e) => handleCategoryClick(e, category.slug)}
              className={`group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-700 hover:shadow-xl dark:bg-zinc-900 ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
                }`}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
              />

              {/* Icon container */}
              <div className="relative mb-4 flex items-center justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br ${category.color} text-2xl shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                >
                  {category.icon}
                </div>

                {/* Arrow icon */}
                <svg
                  className="h-5 w-5 text-zinc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-base font-semibold text-zinc-900 transition-colors group-hover:text-zinc-950 dark:text-zinc-50 dark:group-hover:text-white">
                  {category.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {category.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r ${category.color} transition-all duration-300 group-hover:w-full`}
              />

              {/* Badge */}
              <div className="relative mt-4 inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 transition-colors group-hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-zinc-700">
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Ver especialistas
              </div>
            </Link>
          );
        })}
      </div>

      {/* Info note */}
      <div className="mt-8 text-center">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          ¿No encuentras lo que buscas?{' '}
          <Link
            href="/search"
            className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Explorar todos los servicios
          </Link>
        </p>
      </div>
    </section>
  );
}
