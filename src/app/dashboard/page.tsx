"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import StatCard from '@/components/StatCard';
import AnalyticsChart from '@/components/AnalyticsChart';
import ActivityFeed from '@/components/ActivityFeed';
import AIAgentCard from '@/components/AIAgentCard';
import { Bot, Code, Bug, Rocket, TrendingUp, Zap } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('zeedle_token');
    if (!token) {
      router.push('/signin');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050814] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-[#ff2d95] border-t-transparent rounded-full animate-spin glow-pulse-pink"></div>
          <p className="mt-4 text-[#00f0ff] font-cyber">Loading Command Center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050814] overflow-x-hidden">
      <div className="cyber-grid fixed inset-0 opacity-10" />
      <div className="scanline" />
      
      <DashboardSidebar />
      <DashboardHeader />

      <main className="md:ml-64 ml-0 mt-20 p-4 md:p-8 relative z-10 max-w-full overflow-x-hidden">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-cyber font-bold text-white mb-2 glitch neon-text-pink" data-text="Command Center">
            Command Center
          </h1>
          <p className="text-gray-400 font-tech text-lg">
            Real-time monitoring and control of your AI-powered backend operations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 w-full min-w-0">
          <StatCard
            title="Active AI Agents"
            value="24"
            change="+12%"
            icon={Bot}
            color="pink"
          />
          <StatCard
            title="Code Generated"
            value="1.2K"
            change="+18%"
            icon={Code}
            color="blue"
          />
          <StatCard
            title="Bugs Fixed"
            value="342"
            change="+24%"
            icon={Bug}
            color="purple"
          />
          <StatCard
            title="Deployments"
            value="89"
            change="+8%"
            icon={Rocket}
            color="pink"
          />
        </div>

        {/* Analytics & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8 w-full min-w-0">
          <div className="lg:col-span-2">
            <AnalyticsChart />
          </div>
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>

        {/* AI Agents Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-cyber font-bold text-white">Active AI Agents</h2>
            <button className="px-4 py-2 bg-gradient-to-r from-[#ff2d95] to-[#00f0ff] rounded-lg font-tech font-medium hover:opacity-80 transition-opacity">
              View All Agents
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full min-w-0">
            <AIAgentCard
              name="CodeGen-Alpha"
              status="processing"
              tasksCompleted={156}
              efficiency={94}
              type="Code Generation"
            />
            <AIAgentCard
              name="BugHunter-Beta"
              status="active"
              tasksCompleted={89}
              efficiency={87}
              type="Bug Detection"
            />
            <AIAgentCard
              name="DeployBot-Gamma"
              status="idle"
              tasksCompleted={124}
              efficiency={91}
              type="Deployment"
            />
            <AIAgentCard
              name="TestRunner-Delta"
              status="active"
              tasksCompleted={203}
              efficiency={96}
              type="Testing"
            />
            <AIAgentCard
              name="SecurityScan-Epsilon"
              status="processing"
              tasksCompleted={78}
              efficiency={89}
              type="Security"
            />
            <AIAgentCard
              name="OptimizeAI-Zeta"
              status="active"
              tasksCompleted={145}
              efficiency={93}
              type="Optimization"
            />
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full min-w-0">
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#00f0ff]/20 neon-border-blue">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-[#00f0ff]" />
              <h3 className="text-lg font-cyber font-bold text-white">System Health</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400 font-tech">CPU Usage</span>
                  <span className="text-sm text-white font-cyber">64%</span>
                </div>
                <div className="w-full bg-[#050814] rounded-full h-2">
                  <div className="h-full bg-gradient-to-r from-[#00f0ff] to-[#b026ff] rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400 font-tech">Memory</span>
                  <span className="text-sm text-white font-cyber">78%</span>
                </div>
                <div className="w-full bg-[#050814] rounded-full h-2">
                  <div className="h-full bg-gradient-to-r from-[#ff2d95] to-[#00f0ff] rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400 font-tech">Network</span>
                  <span className="text-sm text-white font-cyber">42%</span>
                </div>
                <div className="w-full bg-[#050814] rounded-full h-2">
                  <div className="h-full bg-gradient-to-r from-[#b026ff] to-[#ff2d95] rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#ff2d95]/20 neon-border-pink">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-6 h-6 text-[#ff2d95]" />
              <h3 className="text-lg font-cyber font-bold text-white">Quick Stats</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400 font-tech">Uptime</span>
                <span className="text-sm text-white font-cyber">99.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400 font-tech">API Calls</span>
                <span className="text-sm text-white font-cyber">2.4M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400 font-tech">Response Time</span>
                <span className="text-sm text-white font-cyber">124ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400 font-tech">Error Rate</span>
                <span className="text-sm text-green-400 font-cyber">0.02%</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#b026ff]/20">
            <div className="flex items-center space-x-3 mb-4">
              <Rocket className="w-6 h-6 text-[#b026ff]" />
              <h3 className="text-lg font-cyber font-bold text-white">Recent Deploys</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-[#050814]/40 rounded">
                <span className="text-sm text-white font-tech">Production v2.4.1</span>
                <span className="text-xs text-green-400 font-mono">Success</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#050814]/40 rounded">
                <span className="text-sm text-white font-tech">Staging v2.4.2</span>
                <span className="text-xs text-[#00f0ff] font-mono">In Progress</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#050814]/40 rounded">
                <span className="text-sm text-white font-tech">Dev v2.5.0</span>
                <span className="text-xs text-gray-400 font-mono">Queued</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
