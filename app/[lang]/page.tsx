import { Hero } from '@/components/home/Hero';
import { Competencies } from '@/components/home/Competencies';
import { TechStack } from '@/components/home/TechStack';
import { EngineeringPractices } from '@/components/home/EngineeringPractices';
import { SystemDesignStudies } from '@/components/home/SystemDesignStudies';
import { CurrentlyLearning } from '@/components/home/CurrentlyLearning';
import { Stats } from '@/components/home/Stats';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { Testimonials } from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Competencies />
      <TechStack />
      <EngineeringPractices />
      <SystemDesignStudies />
      <CurrentlyLearning />
      <Stats />
      <FeaturedProjects />
      <Testimonials />
    </main>
  );
}
