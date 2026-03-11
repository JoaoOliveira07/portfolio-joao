import { Hero } from '@/components/home/Hero';
import { Competencies } from '@/components/home/Competencies';
import { TechStack } from '@/components/home/TechStack';
import { Stats } from '@/components/home/Stats';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { Testimonials } from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Competencies />
      <TechStack />
      <Stats />
      <FeaturedProjects />
      <Testimonials />
    </main>
  );
}
