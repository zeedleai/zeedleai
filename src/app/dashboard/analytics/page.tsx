"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Activity, Zap, Clock } from 'lucide-react';

const performanceData = [
  { name: 'Mon', agents: 45, tasks: 67, efficiency: 92 },
  { name: 'Tue', agents: 52, tasks: 78, efficiency: 94 },
  { name: 'Wed', agents: 48, tasks: 82, efficiency: 89 },
  { name: 'Thu', agents: 61, tasks: 91, efficiency: 96 },
  { name: 'Fri', agents: 55, tasks: 85, efficiency: 93 },
  { name: 'Sat', agents: 67, tasks: 95, efficiency: 97 },
  { name: 'Sun', agents: 58, tasks: 88, efficiency: 91 },
];

const distributionData = [
  { name: 'Code Gen', value: 400, color: '#ff2d95' },
  { name: 'Bug Fixing', value: 300, color: '#00f0ff' },
  { name: 'Testing', value: 200, color: '#b026ff' },
  { name: 'Deployment', value: 278, color: '#10b981' },
];

export default function AnalyticsPage() {
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
          <p className="mt-4 text-[#00f0ff] font-cyber">Loading Analytics...</p>
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
          <h1 className="text-4xl font-cyber font-bold text-white mb-2 glitch neon-text-blue" data-text="Analytics Hub">
            Analytics Hub
          </h1>
          <p className="text-gray-400 font-tech text-lg">
            Real-time performance metrics and workflow monitoring
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 w-full min-w-0">
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#ff2d95]/20 neon-border-pink">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="w-8 h-8 text-[#ff2d95]" />
              <div>
                <p className="text-sm text-gray-400 font-tech uppercase">Avg Efficiency</p>
                <p className="text-3xl font-cyber font-bold text-white">93.2%</p>
              </div>
            </div>
            <p className="text-xs text-green-400 font-tech">+5.2% from last week</p>
          </div>

          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#00f0ff]/20 neon-border-blue">
            <div className="flex items-center space-x-3 mb-3">
              <Activity className="w-8 h-8 text-[#00f0ff]" />
              <div>
                <p className="text-sm text-gray-400 font-tech uppercase">Active Tasks</p>
                <p className="text-3xl font-cyber font-bold text-white">586</p>
              </div>
            </div>
            <p className="text-xs text-green-400 font-tech">+18% from yesterday</p>
          </div>

          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#b026ff]/20">
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="w-8 h-8 text-[#b026ff]" />
              <div>
                <p className="text-sm text-gray-400 font-tech uppercase">Processing Speed</p>
                <p className="text-3xl font-cyber font-bold text-white">2.4s</p>
              </div>
            </div>
            <p className="text-xs text-green-400 font-tech">-12% faster</p>
          </div>

          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#ff2d95]/20 neon-border-pink">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="w-8 h-8 text-[#ff2d95]" />
              <div>
                <p className="text-sm text-gray-400 font-tech uppercase">Uptime</p>
                <p className="text-3xl font-cyber font-bold text-white">99.8%</p>
              </div>
            </div>
            <p className="text-xs text-green-400 font-tech">Excellent</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8 w-full min-w-0">
          {/* Performance Trends */}
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-4 md:p-6 border border-[#00f0ff]/20 neon-border-blue">
            <h2 className="text-xl font-cyber font-bold text-white mb-6">Performance Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#00f0ff20" />
                <XAxis dataKey="name" stroke="#00f0ff" style={{ fontFamily: 'Rajdhani' }} />
                <YAxis stroke="#00f0ff" style={{ fontFamily: 'Rajdhani' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0e27',
                    border: '1px solid #00f0ff',
                    borderRadius: '8px',
                    fontFamily: 'Rajdhani'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="agents" stroke="#ff2d95" strokeWidth={2} />
                <Line type="monotone" dataKey="tasks" stroke="#00f0ff" strokeWidth={2} />
                <Line type="monotone" dataKey="efficiency" stroke="#b026ff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Task Distribution */}
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-4 md:p-6 border border-[#ff2d95]/20 neon-border-pink">
            <h2 className="text-xl font-cyber font-bold text-white mb-6">Task Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0e27',
                    border: '1px solid #ff2d95',
                    borderRadius: '8px',
                    fontFamily: 'Rajdhani'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Activity */}
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-4 md:p-6 border border-[#b026ff]/20">
            <h2 className="text-xl font-cyber font-bold text-white mb-6">Weekly Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#b026ff20" />
                <XAxis dataKey="name" stroke="#b026ff" style={{ fontFamily: 'Rajdhani' }} />
                <YAxis stroke="#b026ff" style={{ fontFamily: 'Rajdhani' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0e27',
                    border: '1px solid #b026ff',
                    borderRadius: '8px',
                    fontFamily: 'Rajdhani'
                  }}
                />
                <Legend />
                <Bar dataKey="agents" fill="#ff2d95" />
                <Bar dataKey="tasks" fill="#00f0ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Real-time Metrics */}
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-4 md:p-6 border border-[#00f0ff]/20 neon-border-blue">
            <h2 className="text-xl font-cyber font-bold text-white mb-6">Real-time Metrics</h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#050814]/40 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 font-tech">CPU Usage</span>
                  <span className="text-white font-cyber">64%</span>
                </div>
                <div className="w-full bg-[#050814] rounded-full h-3">
                  <div className="h-full bg-gradient-to-r from-[#00f0ff] to-[#b026ff] rounded-full transition-all" style={{ width: '64%' }}></div>
                </div>
              </div>

              <div className="p-4 bg-[#050814]/40 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 font-tech">Memory</span>
                  <span className="text-white font-cyber">78%</span>
                </div>
                <div className="w-full bg-[#050814] rounded-full h-3">
                  <div className="h-full bg-gradient-to-r from-[#ff2d95] to-[#00f0ff] rounded-full transition-all" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div className="p-4 bg-[#050814]/40 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 font-tech">Network I/O</span>
                  <span className="text-white font-cyber">42%</span>
                </div>
                <div className="w-full bg-[#050814] rounded-full h-3">
                  <div className="h-full bg-gradient-to-r from-[#b026ff] to-[#ff2d95] rounded-full transition-all" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div className="p-4 bg-[#050814]/40 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 font-tech">Disk Usage</span>
                  <span className="text-white font-cyber">56%</span>
                </div>
                <div className="w-full bg-[#050814] rounded-full h-3">
                  <div className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff2d95] rounded-full transition-all" style={{ width: '56%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-gradient-to-r from-[#ff2d95]/10 via-[#b026ff]/10 to-[#00f0ff]/10 rounded-2xl border border-[#00f0ff]/20 p-4 md:p-8">
          <h2 className="text-2xl font-cyber font-bold text-white mb-6">Performance Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full min-w-0">
            <div>
              <p className="text-gray-400 font-tech mb-2">Total Tasks Completed</p>
              <p className="text-4xl font-cyber font-bold text-[#ff2d95]">1,248</p>
              <p className="text-sm text-green-400 font-tech mt-1">+24% this week</p>
            </div>
            <div>
              <p className="text-gray-400 font-tech mb-2">Average Response Time</p>
              <p className="text-4xl font-cyber font-bold text-[#00f0ff]">124ms</p>
              <p className="text-sm text-green-400 font-tech mt-1">-15% faster</p>
            </div>
            <div>
              <p className="text-gray-400 font-tech mb-2">Error Rate</p>
              <p className="text-4xl font-cyber font-bold text-[#b026ff]">0.02%</p>
              <p className="text-sm text-green-400 font-tech mt-1">Excellent</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
