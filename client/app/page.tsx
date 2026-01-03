'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import HomeHeader from '@/components/home/HomeHeader';
import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedPractitioners from '@/components/home/FeaturedPractitioners';
import BenefitsSection from '@/components/home/BenefitsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import Footer from '@/components/home/Footer';
import { practitionersService } from '@/lib/services/practitioners.service';
import { Practitioner } from '@/lib/types';

/**
 * Home page component
 * Displays the main landing page with search, categories, featured practitioners, and other sections
 */
export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const [featuredPractitioners, setFeaturedPractitioners] = useState<Practitioner[]>([]);
  const [loadingPractitioners, setLoadingPractitioners] = useState(false);

  useEffect(() => {
    async function loadFeaturedPractitioners() {
      if (!isAuthenticated) {
        setFeaturedPractitioners([]);
        return;
      }

      setLoadingPractitioners(true);
      try {
        const practitioners = await practitionersService.getFeatured();
        setFeaturedPractitioners(practitioners);
      } catch (error) {
        console.error('Error loading featured practitioners:', error);
        setFeaturedPractitioners([]);
      } finally {
        setLoadingPractitioners(false);
      }
    }

    if (!isLoading) {
      loadFeaturedPractitioners();
    }
  }, [isAuthenticated, isLoading]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">
      <main className="mx-auto max-w-6xl py-12 px-6">
        <HomeHeader />
        <HeroSection />
        <CategoryGrid />

        {/* Featured Practitioners Section - Only for authenticated users */}
        <section className="mt-16">
          {isLoading || loadingPractitioners ? (
            <div className="flex justify-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            </div>
          ) : !isAuthenticated ? (
            <div className="rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-12 text-center shadow-lg">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
                Inicia sesión para ver los podólogos
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-md mx-auto">
                Regístrate o inicia sesión para acceder a nuestra red de podólogos verificados y reservar tu cita.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/login"
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            </div>
          ) : (
            <FeaturedPractitioners practitioners={featuredPractitioners} />
          )}
        </section>

        <BenefitsSection />
        <TestimonialsSection />
        <HowItWorksSection />
        <Footer />
      </main>
    </div>
  );
}
