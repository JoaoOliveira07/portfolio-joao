import { Hero } from '@/components/home/Hero';
import { AboutSection } from '@/components/home/AboutSection';
import { Timeline } from '@/components/home/Timeline';
import { EngineeringPractices } from '@/components/home/EngineeringPractices';
import { TechStack } from '@/components/home/TechStack';
import { SystemDesignStudies } from '@/components/home/SystemDesignStudies';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { Stats } from '@/components/home/Stats';
import { Testimonials } from '@/components/home/Testimonials';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section id="hero">
        <Hero />
      </section>

      {/* Philosophy */}
      <ScrollReveal>
        <section id="philosophy" className="bg-neutral-950">
          <AboutSection />
        </section>
      </ScrollReveal>

      {/* Experience */}
      <ScrollReveal>
        <section id="experience" className="bg-neutral-950">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <Timeline />
          </div>
        </section>
      </ScrollReveal>

      {/* Tech Stack */}
      <ScrollReveal>
        <section id="techstack" className="bg-neutral-950">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <TechStack />
          </div>
        </section>
      </ScrollReveal>

      {/* Engineering */}
      <ScrollReveal>
        <section id="engineering" className="bg-neutral-950">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <EngineeringPractices />
          </div>
        </section>
      </ScrollReveal>

      {/* Conhecimentos (System Design) */}
      <ScrollReveal>
        <section id="system-design" className="bg-neutral-950">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <SystemDesignStudies />
          </div>
        </section>
      </ScrollReveal>

      {/* Projects */}
      <ScrollReveal>
        <section id="projects" className="bg-neutral-950">
          <FeaturedProjects />
        </section>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal>
        <section id="stats" className="bg-neutral-950">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <Stats />
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonials */}
      <ScrollReveal>
        <section id="testimonials" className="bg-neutral-950">
          <Testimonials />
        </section>
      </ScrollReveal>
    </main>
  );
}
