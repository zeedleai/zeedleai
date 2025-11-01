"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import AIAgentCard from '@/components/AIAgentCard';
import { Bot, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AgentsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('zeedle_token');
    if (!token) {
      router.push('/signin');
    } else {
      setLoading(false);
    }
  }, [router]);

  const agents = [
    { name: 'CodeGen-Alpha', status: 'processing' as const, tasksCompleted: 156, efficiency: 94, type: 'Code Generation' },
    { name: 'BugHunter-Beta', status: 'active' as const, tasksCompleted: 89, efficiency: 87, type: 'Bug Detection' },
    { name: 'DeployBot-Gamma', status: 'idle' as const, tasksCompleted: 124, efficiency: 91, type: 'Deployment' },
    { name: 'TestRunner-Delta', status: 'active' as const, tasksCompleted: 203, efficiency: 96, type: 'Testing' },
    { name: 'SecurityScan-Epsilon', status: 'processing' as const, tasksCompleted: 78, efficiency: 89, type: 'Security' },
    { name: 'OptimizeAI-Zeta', status: 'active' as const, tasksCompleted: 145, efficiency: 93, type: 'Optimization' },
    { name: 'DataSync-Theta', status: 'active' as const, tasksCompleted: 112, efficiency: 88, type: 'Data Sync' },
    { name: 'APIGateway-Kappa', status: 'processing' as const, tasksCompleted: 167, efficiency: 95, type: 'API Management' },
    { name: 'MonitorBot-Lambda', status: 'active' as const, tasksCompleted: 234, efficiency: 97, type: 'Monitoring' },
  ];

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050814] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-[#ff2d95] border-t-transparent rounded-full animate-spin glow-pulse-pink"></div>
          <p className="mt-4 text-[#00f0ff] font-cyber">Loading AI Agents...</p>
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

      <main className="md:ml-64 ml-0 mt-20 p-4 md:p-8 relative z-10 max-w-full overflow-x-hidden">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-cyber font-bold text-white mb-2 glitch neon-text-pink" data-text="AI Agents">
                AI Agents
              </h1>
              <p className="text-gray-400 font-tech text-lg">
                Manage and monitor your intelligent automation agents
              </p>
            </div>
            <Button className="bg-gradient-to-r from-[#ff2d95] to-[#00f0ff] hover:from-[#ff2d95]/80 hover:to-[#00f0ff]/80 text-white font-cyber font-bold glow-pulse-pink">
              <Plus className="w-5 h-5 mr-2" />
              Deploy New Agent
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 w-full min-w-0">
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#ff2d95]/20 neon-border-pink">
            <p className="text-3xl font-cyber font-bold text-white">{agents.length}</p>
            <p className="text-sm text-gray-400 font-tech uppercase mt-1">Total Agents</p>
          </div>
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#00f0ff]/20 neon-border-blue">
            <p className="text-3xl font-cyber font-bold text-white">{agents.filter(a => a.status === 'active').length}</p>
            <p className="text-sm text-gray-400 font-tech uppercase mt-1">Active</p>
          </div>
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#b026ff]/20">
            <p className="text-3xl font-cyber font-bold text-white">{agents.filter(a => a.status === 'processing').length}</p>
            <p className="text-sm text-gray-400 font-tech uppercase mt-1">Processing</p>
          </div>
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#ff2d95]/20 neon-border-pink">
            <p className="text-3xl font-cyber font-bold text-white">92%</p>
            <p className="text-sm text-gray-400 font-tech uppercase mt-1">Avg Efficiency</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-6">
          <Input
            type="text"
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md bg-[#0a0e27]/60 border-[#00f0ff]/30 text-white placeholder:text-gray-500 focus:border-[#00f0ff] font-tech"
          />
          <Button className="bg-[#0a0e27]/60 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/10 font-tech">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full min-w-0">
          {filteredAgents.map((agent, index) => (
            <AIAgentCard key={index} {...agent} />
          ))}
        </div>
      </main>
    </div>
  );
}
