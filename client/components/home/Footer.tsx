/**
 * Footer component
 */

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="mt-12 border-t border-zinc-100 pt-6 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div>© {currentYear} Directorio de Podólogos</div>
        <div className="flex gap-4">
          <Link
            href="/privacy"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Política de privacidad
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Términos
          </Link>
        </div>
      </div>
    </footer>
  );
}

