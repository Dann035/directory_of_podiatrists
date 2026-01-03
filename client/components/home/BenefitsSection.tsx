/**
 * Benefits section
 */

import { BENEFITS } from '@/lib/constants';

export default function BenefitsSection() {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Por qué elegirnos
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((benefit) => (
          <div
            key={benefit}
            className="rounded-md border border-zinc-100 bg-white p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-50"
          >
            {benefit}
          </div>
        ))}
      </div>
    </section>
  );
}

