/**
 * Featured practitioners section
 */

import Link from 'next/link';
import { Practitioner } from '@/lib/types';

interface FeaturedPractitionersProps {
  practitioners: Practitioner[];
}

export default function FeaturedPractitioners({
  practitioners,
}: FeaturedPractitionersProps) {
  if (practitioners.length === 0) {
    return (
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Profesionales destacados
        </h2>
        <div className="mt-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No hay profesionales destacados por ahora.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Profesionales destacados
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {practitioners.map((practitioner) => {
          const name = practitioner.nombre || practitioner.name || 'Sin nombre';
          const specialties =
            practitioner.especialidades?.join(', ') ||
            practitioner.specialties?.join(', ') ||
            'Sin especialidades';

          return (
            <article
              key={practitioner.id}
              className="rounded-md border border-zinc-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800"
            >
              <div className="flex items-start gap-4">
                <div
                  className="h-12 w-12 flex-none rounded-full bg-zinc-200 dark:bg-zinc-700"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {name}
                  </h3>
                  <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {specialties}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link
                      href={`/practitioners/${practitioner.id}`}
                      className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Ver perfil
                    </Link>
                    <button
                      type="button"
                      className="rounded-md border border-zinc-200 px-3 py-1 text-xs text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    >
                      Contactar
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

