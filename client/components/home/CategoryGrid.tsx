/**
 * Category grid section
 */

import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';

export default function CategoryGrid() {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Categorías populares
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((category) => (
          <Link
            key={category.key}
            href={`/search?service=${encodeURIComponent(category.slug)}`}
            className="block rounded-lg border border-zinc-100 bg-white p-4 text-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800"
          >
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              {category.title}
            </div>
            <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Ver especialistas
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

