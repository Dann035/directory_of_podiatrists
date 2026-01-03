'use client';

import Link from 'next/link';
import React from 'react';
import { Practitioner } from '@/lib/types';

interface ResultsListProps {
  loading?: boolean;
  items: Practitioner[];
}

export default function ResultsList({ loading, items }: ResultsListProps) {
  if (loading) {
    return (
      <div className="mt-6 flex justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Buscando...</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-zinc-400"
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
        <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-50">
          No se encontraron resultados
        </h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Intenta con otros términos de búsqueda
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((practitioner) => (
        <li key={practitioner.id}>
          <Link
            href={`/practitioners/${practitioner.slug || practitioner.id}`}
            className="block h-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-500 dark:hover:border-blue-400"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {practitioner.name}
                </h3>
                {practitioner.city && (
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 flex items-center">
                    <svg
                      className="mr-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {practitioner.city}
                  </p>
                )}
              </div>
              {practitioner.rating && (
                <div className="ml-2 flex items-center gap-1 rounded-full bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1">
                  <svg
                    className="h-4 w-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                    {practitioner.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {practitioner.specialties && practitioner.specialties.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {practitioner.specialties.slice(0, 3).map((specialty, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/20 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300"
                  >
                    {specialty}
                  </span>
                ))}
                {practitioner.specialties.length > 3 && (
                  <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-700 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    +{practitioner.specialties.length - 3}
                  </span>
                )}
              </div>
            )}

            <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400">
              Ver perfil
              <svg
                className="ml-1 h-4 w-4"
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
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
