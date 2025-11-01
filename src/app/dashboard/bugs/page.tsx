"use client";

import { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Bug, AlertTriangle, CheckCircle2, Zap, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const bugData = [
  {
    id: 'BUG-001',
    title: 'Memory leak in user authentication',
    severity: 'critical',
    status: 'fixed',
    file: 'src/auth/middleware.ts',
    line: 45,
    description: 'Memory leak detected in JWT token validation',
    solution: 'Implemented proper cleanup in token validation lifecycle',
    timeToFix: '12 mins',
    detectedAt: '2 hours ago'
  },
  {
    id: 'BUG-002',
    title: 'Race condition in database queries',
    severity: 'high',
    status: 'analyzing',
    file: 'src/db/queries.ts',
    line: 128,
    description: 'Concurrent queries causing data inconsistency',
    solution: 'AI is analyzing the issue...',
    timeToFix: 'In progress',
    detectedAt: '30 mins ago'
  },
  {
    id: 'BUG-003',
    title: 'Null pointer exception in API handler',
    severity: 'medium',
    status: 'fixed',
    file: 'src/api/users.ts',
    line: 67,
    description: 'Unhandled null value in user profile endpoint',
    solution: 'Added null checks and default values',
    timeToFix: '8 mins',
    detectedAt: '5 hours ago'
  },
  {
    id: 'BUG-004',
    title: 'Incorrect data validation logic',
    severity: 'low',
    status: 'pending',
    file: 'src/utils/validation.ts',
    line: 23,
    description: 'Email validation regex not matching all valid formats',
    solution: 'Pending review',
    timeToFix: 'Not started',
    detectedAt: '1 day ago'
  },
];

export default function BugFixingPage() {
  const [selectedBug, setSelectedBug] = useState(bugData[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBugs = bugData.filter(bug =>
    bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bug.file.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050814]">
      <div className="cyber-grid fixed inset-0 opacity-10" />
      <div className="scanline" />

      <DashboardSidebar />
      <DashboardHeader />

      <main className="md:ml-64 ml-0 mt-20 p-4 md:p-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Bug className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-cyber font-bold text-white neon-text-pink drop-shadow-lg">AI Bug Detection & Fixing</h1>
              <p className="text-gray-400 font-tech">Automatically detect and fix bugs with AI assistance</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Bugs Fixed', value: '847', icon: CheckCircle2, color: 'text-green-500' },
            { label: 'Active Bugs', value: '23', icon: Bug, color: 'text-yellow-500' },
            { label: 'Avg Fix Time', value: '15m', icon: CheckCircle2, color: 'text-cyan-500' },
            { label: 'Prevention Rate', value: '94%', icon: CheckCircle2, color: 'text-purple-500' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <span className="text-xs font-tech text-green-500">+5%</span>
                </div>
                <div className="text-2xl font-cyber font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 font-tech">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bug List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-cyber font-bold text-white neon-text-pink drop-shadow-lg">Detected Bugs</h2>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-tech text-sm">
                  <Zap className="w-4 h-4 mr-1" />
                  Scan Now
                </Button>
              </div>

              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search bugs..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              {/* Bug Items */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredBugs.map((bug) => (
                  <div
                    key={bug.id}
                    onClick={() => setSelectedBug(bug)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedBug.id === bug.id
                        ? 'bg-gray-800 border-pink-500'
                        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-mono text-gray-400">{bug.id}</span>
                      <span className={`px-2 py-1 rounded text-xs font-tech ${
                        bug.status === 'fixed' ? 'bg-green-500/20 text-green-500' :
                        bug.status === 'analyzing' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-gray-500/20 text-gray-500'
                      }`}>
                        {bug.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-tech font-bold text-white mb-2">{bug.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs font-tech border ${
                        bug.severity === 'critical' ? 'bg-red-500/20 text-red-500 border-red-500/50' :
                        bug.severity === 'high' ? 'bg-orange-500/20 text-orange-500 border-orange-500/50' :
                        bug.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' :
                        'bg-blue-500/20 text-blue-500 border-blue-500/50'
                      }`}>
                        {bug.severity}
                      </span>
                      <span className="text-xs text-gray-400">{bug.detectedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bug Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-gray-400">{selectedBug.id}</span>
                    <span className={`px-3 py-1 rounded text-sm font-tech border ${
                      selectedBug.severity === 'critical' ? 'bg-red-500/20 text-red-500 border-red-500/50' :
                      selectedBug.severity === 'high' ? 'bg-orange-500/20 text-orange-500 border-orange-500/50' :
                      selectedBug.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' :
                      'bg-blue-500/20 text-blue-500 border-blue-500/50'
                    }`}>
                      {selectedBug.severity.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded text-sm font-tech ${
                      selectedBug.status === 'fixed' ? 'bg-green-500/20 text-green-500' :
                      selectedBug.status === 'analyzing' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-gray-500/20 text-gray-500'
                    }`}>
                      {selectedBug.status.toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-2xl font-cyber font-bold text-white">{selectedBug.title}</h2>
                </div>
              </div>

              {/* Bug Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">File Location</div>
                  <div className="text-sm font-mono text-cyan-400">{selectedBug.file}</div>
                  <div className="text-xs text-gray-400 mt-1">Line {selectedBug.line}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Time to Fix</div>
                  <div className="text-sm font-tech text-white">{selectedBug.timeToFix}</div>
                  <div className="text-xs text-gray-400 mt-1">Detected {selectedBug.detectedAt}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-cyber font-bold text-white neon-text-pink drop-shadow-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  Problem Description
                </h3>
                <p className="text-gray-300 font-tech leading-relaxed bg-gray-800/50 rounded-lg p-4">
                  {selectedBug.description}
                </p>
              </div>

              {/* AI Solution */}
              <div className="mb-6">
                <h3 className="text-lg font-cyber font-bold text-white neon-text-pink drop-shadow-lg mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-pink-500" />
                  AI Suggested Solution
                </h3>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-gray-300 font-tech leading-relaxed mb-4">
                    {selectedBug.solution}
                  </p>
                  {selectedBug.status === 'fixed' && (
                    <div className="flex items-center gap-2 text-green-500 text-sm font-tech">
                      <CheckCircle2 className="w-4 h-4" />
                      Fix has been successfully applied
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              {selectedBug.status !== 'fixed' && (
                <div className="flex gap-4 mt-6">
                  <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-cyber">
                    <Zap className="w-4 h-4 mr-2" />
                    Apply AI Fix
                  </Button>
                  <Button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-cyber border border-gray-700">
                    Mark as Resolved
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
