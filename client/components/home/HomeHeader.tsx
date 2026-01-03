/**
 * Home page header with navigation
 */

import Link from 'next/link';

export default function HomeHeader() {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-zinc-900 transition-colors hover:text-blue-600 dark:text-zinc-50 dark:hover:text-blue-400"
          >
            Directorio de Podólogos
          </Link>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Reserva cita con podólogos verificados
          </p>
        </div>
        <nav className="hidden md:flex gap-6 text-sm text-zinc-700 dark:text-zinc-300">
          <Link
            href="/search"
            className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            Buscar podólogo
          </Link>
          <Link
            href="#how"
            className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            Cómo funciona
          </Link>
          <Link
            href="#contact"
            className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}

