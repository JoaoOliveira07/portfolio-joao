'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';
import { FadeIn } from '@/components/ui/Animations';
import { GitCommit, GitPullRequest, FolderGit2, Code2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
  icon: LucideIcon;
  sublabel?: string;
}

interface Language {
  name: string;
  percentage: string;
  bytes: number;
}

interface GitHubData {
  public_repos: number;
  followers: number;
  contributions: {
    commits: number;
    pullRequests: number;
    issues: number;
    activeRepos: number;
    totalCommits: number;
  };
  topLanguages: Language[];
  streak: {
    current: number;
    longest: number;
    total: number;
  };
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Default: '#858585',
};

export function Stats() {
  const t = useTranslations('stats');
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});
  const [languageProgress, setLanguageProgress] = useState<Record<string, number>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch('/api/github')
      .then(res => res.json())
      .then(data => {
        setGithubData(data);
        setLoading(false);
      })
      .catch(() => {
        setGithubData({
          public_repos: 7,
          followers: 4,
          contributions: {
            commits: 0,
            pullRequests: 0,
            issues: 0,
            activeRepos: 0,
            totalCommits: 0,
          },
          topLanguages: [],
          streak: {
            current: 0,
            longest: 0,
            total: 0,
          },
        });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (githubData && isVisible && !loading) {
      const targets = {
        totalCommits: githubData.contributions.totalCommits,
        pullRequests: githubData.contributions.pullRequests,
        activeRepos: githubData.contributions.activeRepos,
        publicRepos: githubData.public_repos,
      };

      Object.entries(targets).forEach(([key, target]) => {
        let current = 0;
        const increment = target / 50;
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          setAnimatedValues(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 20);
      });

      githubData.topLanguages.forEach((lang) => {
        let progress = 0;
        const target = parseFloat(lang.percentage);
        const interval = setInterval(() => {
          progress += target / 50;
          if (progress >= target) {
            progress = target;
            clearInterval(interval);
          }
          setLanguageProgress(prev => ({ ...prev, [lang.name]: progress }));
        }, 20);
      });
    }
  }, [githubData, isVisible, loading]);

  const stats: Stat[] = [
    {
      value: (animatedValues.totalCommits || githubData?.contributions.totalCommits || 0).toString(),
      label: 'Total Commits',
      sublabel: 'All time',
      icon: GitCommit,
    },
    {
      value: (animatedValues.pullRequests || githubData?.contributions.pullRequests || 0).toString(),
      label: 'Pull Requests',
      sublabel: 'Last 30 days',
      icon: GitPullRequest,
    },
    {
      value: (animatedValues.activeRepos || githubData?.contributions.activeRepos || 0).toString(),
      label: 'Active Repos',
      sublabel: 'Last 30 days',
      icon: FolderGit2,
    },
    {
      value: (animatedValues.publicRepos || githubData?.public_repos || 0).toString(),
      label: 'Total Projects',
      sublabel: 'Public repositories',
      icon: Code2,
    },
  ];

  return (
    <div className="w-full" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">
            GitHub Activity
          </span>
          <h2 className="text-4xl font-bold tracking-tight mt-4">
            {t('title')}
          </h2>
          <p className="text-on-surface-variant mt-4 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <FadeIn key={stat.label} delay={index * 0.1}>
                <div className="bg-white rounded-lg border border-neutral-200 hover:border-primary/30 hover:shadow-md transition-all duration-300 p-6 h-full">
                  {/* Icon and Value */}
                  <div className="flex items-start gap-3 mb-4 pb-4 border-b border-neutral-100">
                    <div className="w-1 h-12 bg-primary-500 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <div className="text-3xl md:text-4xl font-bold text-neutral-900 leading-none mb-1">
                        {loading ? '...' : stat.value}
                      </div>
                      <div className="text-sm font-medium text-neutral-700">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                  
                  {/* Sublabel */}
                  {stat.sublabel && (
                    <div className="text-xs text-neutral-500">
                      {stat.sublabel}
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Most Used Languages & Contribution Streak */}
        <FadeIn delay={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Most Used Languages */}
            <div className="bg-white rounded-lg border border-neutral-200 hover:border-primary/30 hover:shadow-md transition-all duration-300 p-6 h-full">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
                <div className="w-1 h-6 bg-primary-500 rounded-full" />
                <h3 className="text-base font-semibold text-neutral-900">
                  Most Used Languages
                </h3>
              </div>
              
              {loading ? (
                <div className="text-center py-8 text-neutral-400 text-sm">Loading...</div>
              ) : githubData && githubData.topLanguages.length > 0 ? (
                <div className="space-y-4">
                  {githubData.topLanguages.map((lang, index) => (
                    <div key={lang.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: LANGUAGE_COLORS[lang.name] || LANGUAGE_COLORS.Default }}
                          />
                          <span className="font-medium text-neutral-900">{lang.name}</span>
                        </div>
                        <span className="text-neutral-500 text-xs">{languageProgress[lang.name]?.toFixed(1) || lang.percentage}%</span>
                      </div>
                      <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${languageProgress[lang.name] || 0}%`,
                            backgroundColor: LANGUAGE_COLORS[lang.name] || LANGUAGE_COLORS.Default
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-neutral-400 text-sm">No language data available</div>
              )}
            </div>

            {/* Contribution Streak */}
            <div className="bg-white rounded-lg border border-neutral-200 hover:border-primary/30 hover:shadow-md transition-all duration-300 p-6 h-full">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
                <div className="w-1 h-6 bg-primary-500 rounded-full" />
                <h3 className="text-base font-semibold text-neutral-900">
                  Contribution Streak
                </h3>
              </div>
              
              {loading ? (
                <div className="text-center py-8 text-neutral-400 text-sm">Loading...</div>
              ) : githubData && githubData.streak ? (
                <div className="space-y-6">
                  {/* Current Streak */}
                  <div className="text-center p-6 bg-neutral-50 rounded-lg border border-neutral-200">
                    <div className="text-xs text-neutral-500 mb-2 font-medium uppercase tracking-wider">Current Streak</div>
                    <div className="text-4xl font-bold text-neutral-900 mb-1">
                      {githubData.streak.current}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {githubData.streak.current === 1 ? 'day' : 'days'}
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                      <div className="text-2xl font-bold text-neutral-900 mb-1">
                        {githubData.streak.longest}
                      </div>
                      <div className="text-xs text-neutral-500">Longest Streak</div>
                    </div>
                    <div className="text-center p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                      <div className="text-2xl font-bold text-neutral-900 mb-1">
                        {githubData.streak.total}
                      </div>
                      <div className="text-xs text-neutral-500">Total Days</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-neutral-400 text-sm">No streak data available</div>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-xs text-neutral-400">
            Data refreshed every hour • Powered by GitHub API
          </p>
        </div>
      </div>
    </div>
  );
}
