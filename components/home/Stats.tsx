'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
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

  const stats: Stat[] = [
    {
      value: githubData?.contributions.totalCommits.toString() || '0',
      label: 'Total Commits',
      sublabel: 'All time',
      icon: GitCommit,
    },
    {
      value: githubData?.contributions.pullRequests.toString() || '0',
      label: 'Pull Requests',
      sublabel: 'Last 30 days',
      icon: GitPullRequest,
    },
    {
      value: githubData?.contributions.activeRepos.toString() || '0',
      label: 'Active Repos',
      sublabel: 'Last 30 days',
      icon: FolderGit2,
    },
    {
      value: githubData?.public_repos.toString() || '0',
      label: 'Total Projects',
      sublabel: 'Public repositories',
      icon: Code2,
    },
  ];

  return (
    <div className="w-full">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-5 bg-primary-500 rounded-full flex-shrink-0" />
            <h2 className="text-2xl font-bold text-neutral-900">
              {t('title')}
            </h2>
          </div>
          <p className="text-sm text-neutral-500 ml-6">
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
                        <span className="text-neutral-500 text-xs">{lang.percentage}%</span>
                      </div>
                      <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${lang.percentage}%`,
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
