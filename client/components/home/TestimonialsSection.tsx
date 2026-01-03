'use client';

/**
 * Testimonials section with infinite smooth carousel
 * Displays testimonials in a continuous loop animation from right to left
 */

import { TESTIMONIALS } from '@/lib/constants';

export default function TestimonialsSection() {
  // Duplicate testimonials for seamless infinite loop
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="mt-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Testimonios
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Lo que dicen nuestros pacientes
        </p>
      </div>

      {/* Carousel container with overflow hidden */}
      <div className="relative overflow-hidden">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-zinc-50 to-transparent dark:from-zinc-900" />
        <div className="absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-zinc-50 to-transparent dark:from-zinc-900" />

        {/* Animated carousel track */}
        <div className="flex gap-6 animate-scroll">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.author}-${index}`}
              className="min-w-[calc(50%-12px)] md:min-w-[calc(50%-12px)] shrink-0"
            >
              <blockquote className="h-full rounded-xl border border-zinc-200 bg-gray-900 p-6 shadow-sm transition-all hover:shadow-lg dark:border-zinc-800">
                {/* Rating stars */}
                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${i < Math.floor(testimonial.rating)
                        ? 'text-yellow-400'
                        : 'text-zinc-300 dark:text-zinc-600'
                        }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {testimonial.rating}
                  </span>
                </div>

                {/* Testimonial text */}
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <footer className="mt-4 flex items-center gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-700">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-sm font-semibold text-white">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Cliente verificado
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      {/* Info note */}
      <div className="mt-6 text-center">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Todas las reseñas son de pacientes verificados
        </p>
      </div>

      {/* CSS for infinite scroll animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
