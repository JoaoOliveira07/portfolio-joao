import { Hero } from '@/components/home/Hero';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { TechStack } from '@/components/home/TechStack';
import { GitHubStats } from '@/components/home/GitHubStats';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProjects />
      <TechStack />
      <GitHubStats />
    </main>
  );
}
