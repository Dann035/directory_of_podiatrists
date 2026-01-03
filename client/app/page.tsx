import { fetchFeaturedPractitioners } from '@/lib/practitioners';
import HomeHeader from '@/components/home/HomeHeader';
import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedPractitioners from '@/components/home/FeaturedPractitioners';
import BenefitsSection from '@/components/home/BenefitsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import Footer from '@/components/home/Footer';

/**
 * Home page component
 * Displays the main landing page with search, categories, featured practitioners, and other sections
 */
export default async function Home() {
  const featuredPractitioners = await fetchFeaturedPractitioners();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">
      <main className="mx-auto max-w-6xl py-12 px-6">
        <HomeHeader />
        <HeroSection />
        <CategoryGrid />
        <FeaturedPractitioners practitioners={featuredPractitioners} />
        <BenefitsSection />
        <TestimonialsSection />
        <HowItWorksSection />
        <Footer />
      </main>
    </div>
  );
}
