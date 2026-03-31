import { Hero } from '@/components/home/Hero';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { EngineeringPractices } from '@/components/home/EngineeringPractices';
import { TechStack } from '@/components/home/TechStack';
import { AboutSection } from '@/components/home/AboutSection';
import { Timeline } from '@/components/home/Timeline';
import { Testimonials } from '@/components/home/Testimonials';
import { Contact } from '@/components/home/Contact';
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

      {/* Projects - PROVA PRIMEIRO */}
      <SectionDivider variant="glow" className="mt-8" />
      <ScrollReveal>
        <section id="projects" className="relative">
          <FeaturedProjects />
        </section>
      </ScrollReveal>

      {/* Differentials - O que eu resolvo */}
      <SectionDivider variant="line" />
      <ScrollReveal>
        <section id="engineering" className="relative">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <EngineeringPractices />
          </div>
        </section>
      </ScrollReveal>

      {/* Tech Stack - Organizado por contexto */}
      <SectionDivider variant="line" />
      <ScrollReveal>
        <section id="techstack" className="relative">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <TechStack />
          </div>
        </section>
      </ScrollReveal>

      {/* About - CURTO */}
      <SectionDivider variant="line" />
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

      {/* Testimonials - Recomendações */}
      <SectionDivider variant="line" />
      <ScrollReveal>
        <section id="testimonials" className="relative">
          <Testimonials />
        </section>
      </ScrollReveal>

      {/* Contact - Simples */}
      <SectionDivider variant="gradient" />
      <Contact />
    </main>
  );
}