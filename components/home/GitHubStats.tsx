'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Github, GitFork, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GitHubStats {
  public_repos: number;
  followers: number;
  html_url: string;
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    fetch('/api/github')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  if (!stats) return null;

  return (
    <section className="w-full py-16 bg-surface/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl md:text-4xl font-bold text-text text-center">
            GitHub Stats
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-primary">
                  <Github className="h-5 w-5" />
                  Repositories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-text">{stats.public_repos}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-primary">
                  <Star className="h-5 w-5" />
                  Followers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-text">{stats.followers}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-primary">
                  <GitFork className="h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href={stats.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-semibold"
                >
                  View GitHub
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
