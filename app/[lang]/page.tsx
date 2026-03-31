import { Hero } from '@/components/home/Hero';
import { AboutSection } from '@/components/home/AboutSection';
import { Competencies } from '@/components/home/Competencies';
import { Timeline } from '@/components/home/Timeline';
import { EngineeringPractices } from '@/components/home/EngineeringPractices';
import { TechStack } from '@/components/home/TechStack';
import { CurrentlyLearning } from '@/components/home/CurrentlyLearning';
import { SystemDesignStudies } from '@/components/home/SystemDesignStudies';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { Stats } from '@/components/home/Stats';
import { Testimonials } from '@/components/home/Testimonials';
import { Contact } from '@/components/home/Contact';

export default function HomePage() {
  return (
    <main>
      {/* Hero - White */}
      <section id="hero" className="bg-white">
        <Hero />
      </section>

      {/* Philosophy - Gray */}
      <section id="philosophy" className="bg-gray-50">
        <AboutSection />
      </section>

      {/* Expertise - White */}
      <section id="expertise" className="bg-white">
        <Competencies />
      </section>

      {/* Experience - Gray */}
      <section id="experience" className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <Timeline />
        </div>
      </section>

      {/* Engineering - White */}
      <section id="engineering" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <EngineeringPractices />
        </div>
      </section>

      {/* Tech Stack - Gray */}
      <section id="techstack" className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <TechStack />
        </div>
      </section>

      {/* Learning - White */}
      <section id="learning" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <CurrentlyLearning />
        </div>
      </section>

      {/* System Design Studies - Gray */}
      <section id="system-design" className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <SystemDesignStudies />
        </div>
      </section>

      {/* Projects - White */}
      <section id="projects" className="bg-white">
        <FeaturedProjects />
      </section>

      {/* Stats - Gray */}
      <section id="stats" className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <Stats />
        </div>
      </section>

      {/* Testimonials - White */}
      <section id="testimonials" className="bg-white">
        <Testimonials />
      </section>

      {/* Contact - Emerald Dark */}
      <section id="contact" className="bg-emerald-900">
        <Contact />
      </section>
    </main>
  );
}
