/**
 * How it works section
 */

import { HOW_IT_WORKS_STEPS } from '@/lib/constants';

export default function HowItWorksSection() {
  return (
    <section id="how" className="mt-10">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Cómo funciona
      </h2>
      <ol className="mt-4 space-y-3 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <li key={index} className="list-decimal">
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}

