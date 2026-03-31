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
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function HomePage() {
  return (
    <main>
      {/* Hero - White */}
      <section id="hero" className="bg-white">
        <Hero />
      </section>

      {/* Philosophy - Gray */}
      <ScrollReveal>
        <section id="philosophy" className="bg-gray-50">
          <AboutSection />
        </section>
      </ScrollReveal>

      {/* Expertise - White */}
      <ScrollReveal>
        <section id="expertise" className="bg-white">
          <Competencies />
        </section>
      </ScrollReveal>

      {/* Experience - Gray */}
      <ScrollReveal>
        <section id="experience" className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <Timeline />
          </div>
        </section>
      </ScrollReveal>

      {/* Engineering - White */}
      <ScrollReveal>
        <section id="engineering" className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <EngineeringPractices />
          </div>
        </section>
      </ScrollReveal>

      {/* Tech Stack - Gray */}
      <ScrollReveal>
        <section id="techstack" className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <TechStack />
          </div>
        </section>
      </ScrollReveal>

      {/* Learning - White */}
      <ScrollReveal>
        <section id="learning" className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <CurrentlyLearning />
          </div>
        </section>
      </ScrollReveal>

      {/* System Design Studies - Gray */}
      <ScrollReveal>
        <section id="system-design" className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <SystemDesignStudies />
          </div>
        </section>
      </ScrollReveal>

      {/* Projects - White */}
      <ScrollReveal>
        <section id="projects" className="bg-white">
          <FeaturedProjects />
        </section>
      </ScrollReveal>

      {/* Stats - Gray */}
      <ScrollReveal>
        <section id="stats" className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <Stats />
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonials - White */}
      <ScrollReveal>
        <section id="testimonials" className="bg-white">
          <Testimonials />
        </section>
      </ScrollReveal>

      {/* Contact - Emerald Dark */}
      <ScrollReveal>
        <section id="contact" className="bg-emerald-900">
          <Contact />
        </section>
      </ScrollReveal>
    </main>
  );
}
