/**
 * Hero section with search form
 */

import Link from 'next/link';
import { TRUST_FEATURES } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="rounded-lg bg-white p-8 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Encuentra podólogos cerca de ti
          </p>
          <h1 className="mt-2 text-3xl font-extrabold">
            Reserva cita con podólogos verificados
          </h1>
          <p className="mt-3 text-zinc-600">
            Búsqueda por ciudad, especialidad o nombre. Perfiles con reseñas y horarios.
          </p>

          <form method="get" action="/search" className="mt-6">
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label htmlFor="city" className="sr-only">
                  Ciudad o dirección
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Ciudad, barrio o código postal"
                  aria-label="Ciudad o dirección"
                  className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label htmlFor="service" className="sr-only">
                  Especialidad
                </label>
                <input
                  id="service"
                  name="service"
                  type="text"
                  placeholder="Ej. uñas encarnadas, plantillas"
                  aria-label="Especialidad"
                  className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Buscar
                </button>
              </div>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Filtros avanzados disponibles en la página de búsqueda.
            </p>
          </form>
        </div>

        <div>
          <div className="rounded-md border border-zinc-100 bg-zinc-50 p-4">
            <h3 className="text-sm font-semibold text-zinc-900">
              Confianza y seguridad
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {TRUST_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

