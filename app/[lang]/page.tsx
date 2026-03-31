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
import { SectionDivider } from '@/components/ui/SectionDivider';
import { Sparkles } from '@/components/ui/Sparkles';

export default function HomePage() {
  return (
    <main className="relative">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-radial-gradient pointer-events-none" />

      {/* Hero */}
      <section id="hero" className="relative">
        <Sparkles particleCount={30} particleSize={1.5} speed={0.5} className="opacity-50" />
        <Hero />
      </section>

      {/* Philosophy */}
      <SectionDivider variant="glow" className="mt-8" />
      <ScrollReveal>
        <section id="philosophy" className="relative">
          <AboutSection />
        </section>
      </ScrollReveal>

      {/* Experience */}
      <SectionDivider variant="line" />
      <ScrollReveal>
        <section id="experience" className="relative">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <Timeline />
          </div>
        </section>
      </ScrollReveal>

      {/* Tech Stack */}
      <SectionDivider variant="line" />
      <ScrollReveal>
        <section id="techstack" className="relative">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <TechStack />
          </div>
        </section>
      </ScrollReveal>

      {/* Engineering */}
      <SectionDivider variant="line" />
      <ScrollReveal>
        <section id="engineering" className="relative">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <EngineeringPractices />
          </div>
        </section>
      </ScrollReveal>

      {/* Conhecimentos (System Design) */}
      <SectionDivider variant="line" />
      <ScrollReveal>
        <section id="system-design" className="relative">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <SystemDesignStudies />
          </div>
        </section>
      </ScrollReveal>

      {/* Projects */}
      <SectionDivider variant="line" />
      <ScrollReveal>
        <section id="projects" className="relative">
          <FeaturedProjects />
        </section>
      </ScrollReveal>

      {/* Stats */}
      <SectionDivider variant="line" />
      <ScrollReveal>
        <section id="stats" className="relative">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <Stats />
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonials */}
      <SectionDivider variant="line" />
      <ScrollReveal>
        <section id="testimonials" className="relative">
          <Testimonials />
        </section>
      </ScrollReveal>

      {/* Contact */}
      <SectionDivider variant="gradient" />
    </main>
  );
}
