import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'JoaoOliveira07';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional: for higher rate limits

interface GitHubEvent {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload: any;
}

export async function GET() {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch GitHub user data');
    }

    const userData = await userResponse.json();

    // Fetch total contributions from all years using public API
    let totalCommits = 0;
    let allContributions: Array<{ date: string; count: number }> = [];
    
    try {
      // Calculate the account creation year from userData
      const createdAt = new Date(userData.created_at);
      const currentYear = new Date().getFullYear();
      const startYear = createdAt.getFullYear();
      
      // Fetch contributions for each year from account creation to now
      const yearPromises = [];
      for (let year = startYear; year <= currentYear; year++) {
        yearPromises.push(
          fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${year}`, {
            next: { revalidate: 3600 }
          })
        );
      }
      
      const yearResponses = await Promise.all(yearPromises);
      
      for (const response of yearResponses) {
        if (response.ok) {
          const data = await response.json();
          // Collect all contributions
          if (data.contributions) {
            allContributions = [...allContributions, ...data.contributions];
            // Sum all contributions from this year
            const yearTotal = data.contributions.reduce((sum: number, day: any) => sum + (day.count || 0), 0);
            totalCommits += yearTotal;
          }
        }
      }
    } catch (error) {
      console.error('Error fetching total contributions:', error);
    }

    // Fetch all repos to calculate languages (includes private repos if token is set)
    const reposEndpoint = GITHUB_TOKEN 
      ? `https://api.github.com/user/repos?per_page=100&affiliation=owner,collaborator,organization_member`
      : `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`;
    
    const reposResponse = await fetch(reposEndpoint, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    let languages: Record<string, number> = {};
    let totalRepos = 0;
    
    if (reposResponse.ok) {
      const repos = await reposResponse.json();
      totalRepos = repos.length;
      
      // Fetch languages for each repo (including private)
      for (const repo of repos) {
        // Fetch languages
        const langResponse = await fetch(repo.languages_url, {
          headers,
          next: { revalidate: 3600 }
        });
        
        if (langResponse.ok) {
          const repoLangs = await langResponse.json();
          
          // Aggregate languages
          Object.entries(repoLangs).forEach(([lang, bytes]) => {
            languages[lang] = (languages[lang] || 0) + (bytes as number);
          });
        }
      }
    }

    // Fetch recent activity stats with better precision when token is available
    let commitCount = 0;
    let prCount = 0;
    let issueCount = 0;
    let recentRepos = new Set<string>();
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

    if (GITHUB_TOKEN) {
      // With token, use Search API for more accurate results (includes private repos)
      try {
        // Search for recent PRs
        const prSearchResponse = await fetch(
          `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr+created:>=${thirtyDaysAgoStr}`,
          { headers, next: { revalidate: 1800 } }
        );
        if (prSearchResponse.ok) {
          const prData = await prSearchResponse.json();
          prCount = prData.total_count || 0;
        }

        // Search for recent issues
        const issueSearchResponse = await fetch(
          `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:issue+created:>=${thirtyDaysAgoStr}`,
          { headers, next: { revalidate: 1800 } }
        );
        if (issueSearchResponse.ok) {
          const issueData = await issueSearchResponse.json();
          issueCount = issueData.total_count || 0;
        }
      } catch (error) {
        console.error('Error fetching search data:', error);
      }
    }

    // Fetch recent events for commits and recent activity feed
    const eventsResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`, {
      headers,
      next: { revalidate: 1800 } // Cache for 30 minutes
    });

    let events: GitHubEvent[] = [];

    if (eventsResponse.ok) {
      events = await eventsResponse.json();
      
      // Calculate commit stats from events
      events.forEach((event: GitHubEvent) => {
        const eventDate = new Date(event.created_at);
        
        if (eventDate >= thirtyDaysAgo) {
          // Count commits
          if (event.type === 'PushEvent') {
            const commits = event.payload?.commits || event.payload?.size || 1;
            commitCount += Array.isArray(commits) ? commits.length : commits;
            recentRepos.add(event.repo.name);
          }
          
          // Count PRs from events if no token (fallback)
          if (!GITHUB_TOKEN && event.type === 'PullRequestEvent') {
            prCount++;
            recentRepos.add(event.repo.name);
          }
          
          // Count issues from events if no token (fallback)
          if (!GITHUB_TOKEN && event.type === 'IssuesEvent') {
            issueCount++;
          }
        }
      });
    }

    // Get recent commits for display (last 5)
    const recentCommits = events
      .filter(event => event.type === 'PushEvent')
      .slice(0, 5)
      .map(event => ({
        repo: event.repo.name.split('/')[1], // Get repo name without username
        date: event.created_at,
        commits: event.payload?.size || event.payload?.commits?.length || 1,
        message: event.payload?.commits?.[0]?.message || 
                 event.payload?.commits?.[event.payload.commits.length - 1]?.message ||
                 'Code update',
      }));

    // Calculate total bytes and convert to percentages
    const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    const topLanguages = Object.entries(languages)
      .map(([name, bytes]) => ({
        name,
        percentage: totalBytes > 0 ? ((bytes / totalBytes) * 100).toFixed(1) : '0',
        bytes,
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 6); // Top 6 languages

    // Calculate contribution streak from all contributions data
    // Sort contributions by date (newest first)
    const sortedContributions = allContributions
      .filter(day => day.count > 0)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    
    // Calculate current streak (consecutive days from today backwards)
    let checkDate = new Date(today);
    let foundGap = false;
    
    for (let i = 0; i <= 365 && !foundGap; i++) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const contribution = allContributions.find(c => c.date === dateStr);
      
      if (contribution && contribution.count > 0) {
        currentStreak++;
      } else if (i > 0) {
        // Allow today to have 0 contributions, but stop if we find a gap after that
        foundGap = true;
      }
      
      checkDate.setDate(checkDate.getDate() - 1);
    }
    
    // Calculate longest streak from all time
    for (let i = 0; i < sortedContributions.length; i++) {
      const currentDate = new Date(sortedContributions[i].date);
      
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prevDate = new Date(sortedContributions[i - 1].date);
        const dayDiff = Math.floor((prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (dayDiff === 1) {
          // Consecutive day
          tempStreak++;
          longestStreak = Math.max(longestStreak, tempStreak);
        } else {
          // Gap found, reset streak
          tempStreak = 1;
        }
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);
    
    // Total contributing days
    const totalContributingDays = sortedContributions.length;

    return NextResponse.json({
      // User data
      avatar_url: userData.avatar_url,
      name: userData.name,
      bio: userData.bio,
      html_url: userData.html_url,
      
      // Repository stats
      public_repos: userData.public_repos,
      total_repos: totalRepos, // Total repos (includes private if token provided)
      followers: userData.followers,
      following: userData.following,
      
      // Contribution stats
      contributions: {
        commits: commitCount, // Last 30 days
        pullRequests: prCount, // Last 30 days (includes private if token provided)
        issues: issueCount, // Last 30 days (includes private if token provided)
        activeRepos: recentRepos.size, // Last 30 days
        totalCommits: totalCommits, // All time
      },
      
      // Languages (includes private repos if token provided)
      topLanguages,
      
      // Streak data
      streak: {
        current: currentStreak,
        longest: longestStreak,
        total: totalContributingDays,
      },
      
      // Recent activity
      recentCommits,
      
      // Meta
      lastUpdated: new Date().toISOString(),
      includesPrivateData: !!GITHUB_TOKEN, // Indicates if private repos are included
    });
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch GitHub data',
        // Fallback data
        public_repos: 20,
        followers: 50,
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
        recentCommits: [],
      },
      { status: 500 }
    );
  }
}
