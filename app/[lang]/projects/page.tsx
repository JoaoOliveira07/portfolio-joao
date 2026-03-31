import { FeaturedProjects } from '@/components/home/FeaturedProjects';

export default function ProjectsPage() {
  return (
    <main className="bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">All Projects</h1>
        <FeaturedProjects />
      </div>
    </main>
  );
}
