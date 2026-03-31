'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';
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
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch('/api/github')
      .then(res => res.json())
      .then(data => { setGithubData(data); setLoading(false); })
      .catch(() => {
        setGithubData({
          public_repos: 7, followers: 4,
          contributions: { commits: 0, pullRequests: 0, issues: 0, activeRepos: 0, totalCommits: 0 },
          topLanguages: [], streak: { current: 0, longest: 0, total: 0 }
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
        const interval = setInterval(() => {
          current += target / 50;
          if (current >= target) { current = target; clearInterval(interval); }
          setAnimatedValues(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 20);
      });
      githubData.topLanguages.forEach((lang) => {
        let progress = 0;
        const target = parseFloat(lang.percentage);
        const interval = setInterval(() => {
          progress += target / 50;
          if (progress >= target) { progress = target; clearInterval(interval); }
          setLanguageProgress(prev => ({ ...prev, [lang.name]: progress }));
        }, 20);
      });
    }
  }, [githubData, isVisible, loading]);

  const stats: Stat[] = [
    { value: (animatedValues.totalCommits || githubData?.contributions.totalCommits || 0).toString(), label: 'Total Commits', sublabel: 'All time', icon: GitCommit },
    { value: (animatedValues.pullRequests || githubData?.contributions.pullRequests || 0).toString(), label: 'Pull Requests', sublabel: 'Last 30 days', icon: GitPullRequest },
    { value: (animatedValues.activeRepos || githubData?.contributions.activeRepos || 0).toString(), label: 'Active Repos', sublabel: 'Last 30 days', icon: FolderGit2 },
    { value: (animatedValues.publicRepos || githubData?.public_repos || 0).toString(), label: 'Total Projects', sublabel: 'Public repositories', icon: Code2 },
  ];

  return (
    <div className="w-full" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">GitHub Activity</span>
          <h2 className="text-4xl font-bold tracking-tight mt-4 text-white">{t('title')}</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="bg-neutral-900/50 border border-white/10 rounded-lg p-6 h-full hover:border-emerald-500/30 transition-all">
                <div className="flex items-start gap-3 mb-4 pb-4 border-b border-white/10">
                  <IconComponent className="w-6 h-6 text-emerald-400" />
                  <div className="flex-1 min-w-0">
                    <div className="text-3xl md:text-4xl font-bold text-white leading-none mb-1">
                      {loading ? '...' : stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-300">{stat.label}</div>
                  </div>
                </div>
                {stat.sublabel && <div className="text-xs text-gray-500">{stat.sublabel}</div>}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-neutral-900/50 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-1 h-6 bg-emerald-500 rounded-full" />
              <h3 className="text-base font-semibold text-white">Most Used Languages</h3>
            </div>
            {loading ? (
              <div className="text-center py-8 text-gray-500 text-sm">Loading...</div>
            ) : githubData && githubData.topLanguages.length > 0 ? (
              <div className="space-y-4">
                {githubData.topLanguages.map((lang) => (
                  <div key={lang.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[lang.name] || LANGUAGE_COLORS.Default }} />
                        <span className="font-medium text-white">{lang.name}</span>
                      </div>
                      <span className="text-gray-500 text-xs">{languageProgress[lang.name]?.toFixed(1) || lang.percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${languageProgress[lang.name] || 0}%`, backgroundColor: LANGUAGE_COLORS[lang.name] || LANGUAGE_COLORS.Default }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : <div className="text-center py-8 text-gray-500 text-sm">No language data</div>}
          </div>

          <div className="bg-neutral-900/50 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-1 h-6 bg-emerald-500 rounded-full" />
              <h3 className="text-base font-semibold text-white">Contribution Streak</h3>
            </div>
            {loading ? (
              <div className="text-center py-8 text-gray-500 text-sm">Loading...</div>
            ) : githubData && githubData.streak ? (
              <div className="space-y-6">
                <div className="text-center p-6 bg-neutral-800/50 rounded-lg border border-white/10">
                  <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Current Streak</div>
                  <div className="text-4xl font-bold text-white mb-1">{githubData.streak.current}</div>
                  <div className="text-xs text-gray-500">{githubData.streak.current === 1 ? 'day' : 'days'}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-neutral-800/50 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-white mb-1">{githubData.streak.longest}</div>
                    <div className="text-xs text-gray-500">Longest Streak</div>
                  </div>
                  <div className="text-center p-4 bg-neutral-800/50 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-white mb-1">{githubData.streak.total}</div>
                    <div className="text-xs text-gray-500">Total Days</div>
                  </div>
                </div>
              </div>
            ) : <div className="text-center py-8 text-gray-500 text-sm">No streak data</div>}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-600">Data refreshed every hour • Powered by GitHub API</p>
        </div>
      </div>
    </div>
  );
}
