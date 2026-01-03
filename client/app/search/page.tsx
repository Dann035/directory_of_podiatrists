'use client';

/**
 * Search page for practitioners
 * Protected route - requires authentication
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import SearchBar from '@/components/SearchBar';
import ResultsList from '@/components/ResultsList';
import { practitionersService, SearchParams } from '@/lib/services/practitioners.service';
import { Practitioner } from '@/lib/types';
import Link from 'next/link';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Practitioner[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Filters
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [service, setService] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setCity(searchParams.get('city') || '');
    setPostalCode(searchParams.get('postalCode') || '');
    setService(searchParams.get('service') || '');
  }, [searchParams]);

  // Perform search when filters change
  useEffect(() => {
    performSearch();
  }, [query, city, postalCode, service, verifiedOnly]);

  const performSearch = async () => {
    setLoading(true);
    setError('');

    try {
      const params: SearchParams = {
        q: query || undefined,
        city: city || undefined,
        postalCode: postalCode || undefined,
        service: service || undefined,
        verified: verifiedOnly || undefined,
        perPage: 20,
      };

      const response = await practitionersService.search(params);
      setResults(response.data);
    } catch (err) {
      setError('Error al buscar podólogos. Por favor, intenta de nuevo.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-zinc-900 transition-colors hover:text-blue-600 dark:text-zinc-50 dark:hover:text-blue-400"
            >
              Directorio de Podólogos
            </Link>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Encuentra el podólogo perfecto para ti
            </p>
          </div>
          <Link
            href="/"
            className="btn px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-700"
          >
            Volver al inicio
          </Link>
        </div>

        {/* Search Section */}
        <div className="rounded-2xl bg-white dark:bg-zinc-800 p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Buscar podólogos
          </h1>

          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Buscar por nombre, ciudad o especialidad..."
          />

          {/* Filters */}
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Ciudad
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Madrid, Barcelona..."
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Especialidad
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas</option>
                <option value="unias">Tratamientos uñas</option>
                <option value="plantillas">Plantillas y ortopedia</option>
                <option value="fascitis">Fascitis plantar</option>
                <option value="diabetes">Cuidado pie diabético</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  Solo verificados
                </span>
              </label>
            </div>
          </div>

          {/* Results count */}
          {!loading && results.length > 0 && (
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              Se encontraron <strong>{results.length}</strong> podólogos
            </p>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Results */}
        <ResultsList loading={loading} items={results} />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <ProtectedRoute>
      <SearchPageContent />
    </ProtectedRoute>
  );
}

