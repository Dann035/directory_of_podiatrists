'use client';

/**
 * Testimonials section with animated carousel
 * Displays testimonials in a 2-column grid with smooth sliding animation
 */

import { useEffect, useState } from 'react';
import { TESTIMONIALS } from '@/lib/constants';

const TESTIMONIALS_PER_VIEW = 2;
const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Calculate how many slides we need (2 testimonials per slide)
  const totalSlides = Math.ceil(TESTIMONIALS.length / TESTIMONIALS_PER_VIEW);

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  // Get testimonials for current slide
  const getCurrentTestimonials = () => {
    const start = currentIndex * TESTIMONIALS_PER_VIEW;
    return TESTIMONIALS.slice(start, start + TESTIMONIALS_PER_VIEW);
  };

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Testimonios
      </h2>
      
      <div
        className="relative mt-4 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Carousel container */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => {
            const start = slideIndex * TESTIMONIALS_PER_VIEW;
            const slideTestimonials = TESTIMONIALS.slice(
              start,
              start + TESTIMONIALS_PER_VIEW
            );

            return (
              <div
                key={slideIndex}
                className="min-w-full grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {slideTestimonials.map((testimonial, index) => (
                  <blockquote
                    key={`${slideIndex}-${index}`}
                    className="rounded-md border-l-4 border-blue-600 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-blue-500 dark:bg-zinc-800"
                  >
                    <div className="mb-2 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(testimonial.rating)
                              ? 'text-yellow-400'
                              : 'text-zinc-300 dark:text-zinc-600'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-400">
                        {testimonial.rating}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <footer className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      &mdash; {testimonial.author}
                    </footer>
                  </blockquote>
                ))}
              </div>
            );
          })}
        </div>

        {/* Navigation buttons */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              aria-label="Testimonio anterior"
            >
              <svg
                className="h-5 w-5 text-zinc-700 dark:text-zinc-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              aria-label="Siguiente testimonio"
            >
              <svg
                className="h-5 w-5 text-zinc-700 dark:text-zinc-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Dots indicator */}
        {totalSlides > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-blue-600 dark:bg-blue-500'
                    : 'w-2 bg-zinc-300 dark:bg-zinc-600'
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
