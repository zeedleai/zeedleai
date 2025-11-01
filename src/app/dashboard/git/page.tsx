"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { GitBranch, GitCommit, GitMerge, GitPullRequest, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Commit {
  id: string;
  message: string;
  author: string;
  branch: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
}

interface PullRequest {
  id: number;
  title: string;
  author: string;
  branch: string;
  status: 'open' | 'merged' | 'closed';
  commits: number;
  created: string;
}

export default function GitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('zeedle_token');
    if (!token) {
      router.push('/signin');
      return;
    }

    // Fetch mock git data
    fetch('/api/git/commits')
      .then(res => res.json())
      .then(data => {
        setCommits(data.commits);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch('/api/git/pull-requests')
      .then(res => res.json())
      .then(data => setPullRequests(data.pullRequests))
      .catch(() => {});
  }, [router]);

  const handleSync = async () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050814] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-[#ff2d95] border-t-transparent rounded-full animate-spin glow-pulse-pink"></div>
          <p className="mt-4 text-[#00f0ff] font-cyber">Loading Git Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050814]">
      <div className="cyber-grid fixed inset-0 opacity-10" />
      <div className="scanline" />
      
      <DashboardSidebar />
      <DashboardHeader />

      <main className="md:ml-64 ml-0 mt-20 p-4 md:p-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-cyber font-bold text-white mb-2 glitch neon-text-blue" data-text="Git Integration">
                Git Integration
              </h1>
              <p className="text-gray-400 font-tech text-lg">
                Monitor repositories, commits, and pull requests in real-time
              </p>
            </div>
            <Button 
              onClick={handleSync}
              disabled={syncing}
              className="bg-gradient-to-r from-[#00f0ff] to-[#b026ff] hover:from-[#00f0ff]/80 hover:to-[#b026ff]/80 text-white font-cyber font-bold glow-pulse-blue"
            >
              <RefreshCw className={`w-5 h-5 mr-2 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing...' : 'Sync Now'}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#00f0ff]/20 neon-border-blue">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-cyber font-bold text-white">{commits.length}</p>
                <p className="text-sm text-gray-400 font-tech uppercase mt-1">Total Commits</p>
              </div>
              <GitCommit className="w-10 h-10 text-[#00f0ff]" />
            </div>
          </div>

          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#ff2d95]/20 neon-border-pink">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-cyber font-bold text-white">{pullRequests.filter(pr => pr.status === 'open').length}</p>
                <p className="text-sm text-gray-400 font-tech uppercase mt-1">Open PRs</p>
              </div>
              <GitPullRequest className="w-10 h-10 text-[#ff2d95]" />
            </div>
          </div>

          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#b026ff]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-cyber font-bold text-white">5</p>
                <p className="text-sm text-gray-400 font-tech uppercase mt-1">Active Branches</p>
              </div>
              <GitBranch className="w-10 h-10 text-[#b026ff]" />
            </div>
          </div>

          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#00f0ff]/20 neon-border-blue">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-cyber font-bold text-white">{pullRequests.filter(pr => pr.status === 'merged').length}</p>
                <p className="text-sm text-gray-400 font-tech uppercase mt-1">Merged Today</p>
              </div>
              <GitMerge className="w-10 h-10 text-[#00f0ff]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Commits */}
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#00f0ff]/20 neon-border-blue">
            <div className="flex items-center space-x-3 mb-6">
              <GitCommit className="w-6 h-6 text-[#00f0ff]" />
              <h2 className="text-xl font-cyber font-bold text-white">Recent Commits</h2>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {commits.map((commit) => (
                <div
                  key={commit.id}
                  className="p-4 bg-[#050814]/40 rounded-lg hover:bg-[#050814]/60 transition-colors border border-[#00f0ff]/10"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-white font-tech font-medium mb-1">{commit.message}</p>
                      <p className="text-xs text-gray-400 font-mono">
                        {commit.author} · {commit.timestamp}
                      </p>
                    </div>
                    {commit.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : commit.status === 'failed' ? (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    ) : (
                      <RefreshCw className="w-5 h-5 text-yellow-400 animate-spin" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-[#b026ff]/20 text-[#b026ff] border-[#b026ff]/50 font-mono text-xs">
                      {commit.branch}
                    </Badge>
                    <Badge className="bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]/50 font-mono text-xs">
                      {commit.id.substring(0, 7)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pull Requests */}
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#ff2d95]/20 neon-border-pink">
            <div className="flex items-center space-x-3 mb-6">
              <GitPullRequest className="w-6 h-6 text-[#ff2d95]" />
              <h2 className="text-xl font-cyber font-bold text-white">Pull Requests</h2>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {pullRequests.map((pr) => (
                <div
                  key={pr.id}
                  className="p-4 bg-[#050814]/40 rounded-lg hover:bg-[#050814]/60 transition-colors border border-[#ff2d95]/10"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-white font-tech font-medium mb-1">#{pr.id} {pr.title}</p>
                      <p className="text-xs text-gray-400 font-mono">
                        {pr.author} · {pr.created}
                      </p>
                    </div>
                    <Badge className={`${
                      pr.status === 'open' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                      pr.status === 'merged' ? 'bg-[#b026ff]/20 text-[#b026ff] border-[#b026ff]/50' :
                      'bg-gray-500/20 text-gray-400 border-gray-500/50'
                    } font-tech`}>
                      {pr.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]/50 font-mono text-xs">
                      {pr.branch}
                    </Badge>
                    <span className="text-xs text-gray-400 font-tech">{pr.commits} commits</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    {pr.status === 'open' && (
                      <>
                        <Button className="flex-1 bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/30 font-tech text-sm">
                          Review
                        </Button>
                        <Button className="flex-1 bg-[#ff2d95]/20 hover:bg-[#ff2d95]/30 text-[#ff2d95] border border-[#ff2d95]/30 font-tech text-sm">
                          Merge
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Branch Overview */}
        <div className="mt-8 bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#b026ff]/20">
          <div className="flex items-center space-x-3 mb-6">
            <GitBranch className="w-6 h-6 text-[#b026ff]" />
            <h2 className="text-xl font-cyber font-bold text-white">Active Branches</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['main', 'develop', 'feature/ai-agents', 'hotfix/auth', 'release/v2.0'].map((branch) => (
              <div
                key={branch}
                className="p-4 bg-[#050814]/40 rounded-lg border border-[#b026ff]/20 hover:border-[#b026ff]/50 transition-colors"
              >
                <GitBranch className="w-5 h-5 text-[#b026ff] mb-2" />
                <p className="text-white font-mono text-sm">{branch}</p>
                <p className="text-xs text-gray-400 font-tech mt-1">{Math.floor(Math.random() * 20) + 5} commits</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
