import { Hero } from '@/components/home/Hero';
import { AboutSection } from '@/components/home/AboutSection';
import { Competencies } from '@/components/home/Competencies';
import { Timeline } from '@/components/home/Timeline';
import { EngineeringPractices } from '@/components/home/EngineeringPractices';
import { SystemDesignStudies } from '@/components/home/SystemDesignStudies';
import { CurrentlyLearning } from '@/components/home/CurrentlyLearning';
import { TechStack } from '@/components/home/TechStack';
import { Stats } from '@/components/home/Stats';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { Testimonials } from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section id="hero" className="bg-white scroll-mt-16">
        <Hero />
      </section>

      {/* About Me & Core Competencies - CINZA */}
      <section id="about" className="bg-gray-50 py-16 md:py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <AboutSection />
          <Competencies />
        </div>
      </section>

      {/* Professional Experience - BRANCA */}
      <section id="experience" className="bg-white py-16 md:py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <Timeline />
        </div>
      </section>

      {/* Engineering - CINZA */}
      <section id="engineering" className="bg-gray-50 py-16 md:py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <EngineeringPractices />
        </div>
      </section>

      {/* Tech Stack - BRANCA */}
      <section id="techstack" className="bg-white py-16 md:py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <TechStack />
        </div>
      </section>

      {/* Currently Learning & System Design - CINZA */}
      <section id="learning" className="bg-gray-50 py-16 md:py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <CurrentlyLearning />
          <SystemDesignStudies />
        </div>
      </section>

      {/* Projects - BRANCA */}
      <section id="projects" className="bg-white py-16 md:py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <FeaturedProjects />
        </div>
      </section>

      {/* Stats (Numbers that Matter) - CINZA */}
      <section id="stats" className="bg-gray-50 py-16 md:py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <Stats />
        </div>
      </section>

      {/* Testimonials - BRANCA */}
      <section id="testimonials" className="bg-white py-16 md:py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <Testimonials />
        </div>
      </section>
    </main>
  );
}
