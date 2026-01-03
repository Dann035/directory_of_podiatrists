'use client';

/**
 * Hero section with main heading and call to action
 */

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Build search URL with query parameter
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      // Try to determine if it's a city or postal code
      const isPostalCode = /^\d{5}$/.test(searchQuery.trim());
      if (isPostalCode) {
        params.append('postalCode', searchQuery.trim());
      } else {
        params.append('city', searchQuery.trim());
      }
    }

    const searchUrl = `/search${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(searchUrl);
  };

  return (
    <section className="mt-8 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl">
        Encuentra tu podólogo ideal
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        Busca entre cientos de profesionales verificados cerca de ti. Reserva tu
        cita en minutos.
      </p>

      {isAuthenticated ? (
        <form onSubmit={handleSearch} className="mx-auto mt-8 max-w-xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ciudad o código postal"
              className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Buscar
            </button>
          </div>
        </form>
      ) : (
        <div className="mx-auto mt-8 max-w-xl">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6">
            <p className="text-sm text-blue-900 dark:text-blue-100 mb-4">
              Para buscar y reservar citas con podólogos, necesitas una cuenta
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/register"
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Crear cuenta gratis
              </Link>
              <Link
                href="/login"
                className="px-6 py-2.5 rounded-lg border border-blue-600 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
