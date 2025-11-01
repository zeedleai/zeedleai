"use client";

import { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Rocket, GitBranch, CheckCircle2, XCircle, Clock, Server, Globe, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const deployments = [
  {
    id: 'DEP-001',
    name: 'Production API v2.4.1',
    environment: 'production',
    status: 'success',
    branch: 'main',
    commit: 'a3f4b2c',
    deployedBy: 'AI Agent',
    duration: '2m 34s',
    timestamp: '5 mins ago',
    url: 'https://api.production.com',
    health: 100
  },
  {
    id: 'DEP-002',
    name: 'Staging API v2.5.0-beta',
    environment: 'staging',
    status: 'deploying',
    branch: 'develop',
    commit: 'b7e9d1f',
    deployedBy: 'AI Agent',
    duration: 'In progress',
    timestamp: '2 mins ago',
    url: 'https://api.staging.com',
    health: 85
  },
  {
    id: 'DEP-003',
    name: 'Development API v2.5.1',
    environment: 'development',
    status: 'success',
    branch: 'feature/new-auth',
    commit: 'c2a8f5e',
    deployedBy: 'John Doe',
    duration: '1m 52s',
    timestamp: '1 hour ago',
    url: 'https://api.dev.com',
    health: 98
  },
];

const deploymentStats = [
  { label: 'Total Deployments', value: '1,247', change: '+18%', icon: Rocket, color: 'text-purple-500' },
  { label: 'Success Rate', value: '98.2%', change: '+2.1%', icon: CheckCircle2, color: 'text-green-500' },
  { label: 'Avg Deploy Time', value: '2m 15s', change: '-12%', icon: Clock, color: 'text-cyan-500' },
  { label: 'Active Servers', value: '24', change: '+4', icon: Server, color: 'text-pink-500' },
];

export default function DeploymentPage() {
  const [selectedDeployment, setSelectedDeployment] = useState(deployments[0]);
  const [autoDeployEnabled, setAutoDeployEnabled] = useState(true);

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
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-cyber font-bold text-white neon-text-pink drop-shadow-lg">Deployment Center</h1>
                <p className="text-gray-400 font-tech">Manage and monitor your deployments</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-cyber">
              <Rocket className="w-4 h-4 mr-2" />
              New Deployment
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {deploymentStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <span className={`text-xs font-tech ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-cyber font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 font-tech">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Auto Deploy Toggle */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-purple-500" />
              <div>
                <div className="text-white font-cyber font-bold">AI Auto-Deploy</div>
                <div className="text-sm text-gray-400 font-tech">Automatically deploy on successful builds</div>
              </div>
            </div>
            <button
              onClick={() => setAutoDeployEnabled(!autoDeployEnabled)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                autoDeployEnabled ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gray-700'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  autoDeployEnabled ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Deployment List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-cyber font-bold text-white neon-text-pink drop-shadow-lg mb-4">Recent Deployments</h2>

              <div className="space-y-3 max-h-[700px] overflow-y-auto">
                {deployments.map((deployment) => (
                  <div
                    key={deployment.id}
                    onClick={() => setSelectedDeployment(deployment)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedDeployment.id === deployment.id
                        ? 'bg-gray-800 border-pink-500'
                        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-mono text-gray-400">{deployment.id}</span>
                      {deployment.status === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      {deployment.status === 'deploying' && <Clock className="w-5 h-5 text-yellow-500 animate-spin" />}
                      {deployment.status === 'failed' && <XCircle className="w-5 h-5 text-red-500" />}
                    </div>
                    <h3 className="text-sm font-tech font-bold text-white mb-2">{deployment.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-tech border ${
                        deployment.environment === 'production' ? 'bg-green-500/20 text-green-500 border-green-500/50' :
                        deployment.environment === 'staging' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' :
                        'bg-blue-500/20 text-blue-500 border-blue-500/50'
                      }`}>
                        {deployment.environment}
                      </span>
                      <span className="text-xs text-gray-400">{deployment.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <GitBranch className="w-3 h-3" />
                      <span className="font-mono">{deployment.branch}</span>
                      <span>•</span>
                      <span className="font-mono">{deployment.commit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deployment Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-gray-400">{selectedDeployment.id}</span>
                    <span className={`px-3 py-1 rounded text-sm font-tech border ${
                      selectedDeployment.environment === 'production' ? 'bg-green-500/20 text-green-500 border-green-500/50' :
                      selectedDeployment.environment === 'staging' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' :
                      'bg-blue-500/20 text-blue-500 border-blue-500/50'
                    }`}>
                      {selectedDeployment.environment.toUpperCase()}
                    </span>
                    {selectedDeployment.status === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                    {selectedDeployment.status === 'deploying' && <Clock className="w-5 h-5 text-yellow-500 animate-spin" />}
                    {selectedDeployment.status === 'failed' && <XCircle className="w-5 h-5 text-red-500" />}
                  </div>
                  <h2 className="text-2xl font-cyber font-bold text-white mb-1">{selectedDeployment.name}</h2>
                  <a href={selectedDeployment.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm font-mono flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {selectedDeployment.url}
                  </a>
                </div>
              </div>

              {/* Deployment Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Branch & Commit</div>
                  <div className="flex items-center gap-2 text-sm font-mono text-white">
                    <GitBranch className="w-4 h-4 text-purple-500" />
                    {selectedDeployment.branch}
                  </div>
                  <div className="text-xs font-mono text-cyan-400 mt-1">{selectedDeployment.commit}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Duration</div>
                  <div className="text-sm font-tech text-white">{selectedDeployment.duration}</div>
                  <div className="text-xs text-gray-400 mt-1">{selectedDeployment.timestamp}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Deployed By</div>
                  <div className="text-sm font-tech text-white">{selectedDeployment.deployedBy}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Health Status</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          selectedDeployment.health > 90 ? 'bg-green-500' :
                          selectedDeployment.health > 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${selectedDeployment.health}%` }}
                      />
                    </div>
                    <span className="text-sm font-tech text-white">{selectedDeployment.health}%</span>
                  </div>
                </div>
              </div>

              {/* Deployment Logs */}
              <div className="mb-6">
                <h3 className="text-lg font-cyber font-bold text-white neon-text-pink drop-shadow-lg mb-3">Deployment Logs</h3>
                <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-xs text-gray-400 font-mono">deployment-logs</span>
                  </div>
                  <div className="p-4 font-mono text-xs space-y-1 max-h-64 overflow-y-auto">
                    <div className="text-gray-500">[2024-10-24 10:15:23] Starting deployment...</div>
                    <div className="text-cyan-400">[2024-10-24 10:15:24] Pulling latest changes from {selectedDeployment.branch}</div>
                    <div className="text-cyan-400">[2024-10-24 10:15:26] Installing dependencies...</div>
                    <div className="text-cyan-400">[2024-10-24 10:15:45] Running build process...</div>
                    <div className="text-cyan-400">[2024-10-24 10:16:12] Build completed successfully</div>
                    <div className="text-cyan-400">[2024-10-24 10:16:15] Running tests...</div>
                    <div className="text-green-400">[2024-10-24 10:16:45] ✓ All tests passed (127/127)</div>
                    <div className="text-cyan-400">[2024-10-24 10:16:48] Deploying to {selectedDeployment.environment}...</div>
                    <div className="text-cyan-400">[2024-10-24 10:17:23] Updating load balancer...</div>
                    <div className="text-cyan-400">[2024-10-24 10:17:45] Running health checks...</div>
                    {selectedDeployment.status === 'success' && (
                      <div className="text-green-400">[2024-10-24 10:17:57] ✓ Deployment successful!</div>
                    )}
                    {selectedDeployment.status === 'failed' && (
                      <div className="text-red-400">[2024-10-24 10:17:57] ✗ Deployment failed: Connection timeout</div>
                    )}
                    {selectedDeployment.status === 'deploying' && (
                      <div className="text-yellow-400 animate-pulse">[2024-10-24 10:17:57] Deployment in progress...</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              {selectedDeployment.status === 'success' && (
                <div className="flex gap-4">
                  <Button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-cyber border border-gray-700">
                    Rollback
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-cyber">
                    Redeploy
                  </Button>
                </div>
              )}
              {selectedDeployment.status === 'deploying' && (
                <div className="flex gap-4">
                  <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-cyber">
                    Cancel Deployment
                  </Button>
                </div>
              )}
              {selectedDeployment.status === 'failed' && (
                <div className="flex gap-4">
                  <Button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-cyber border border-gray-700">
                    View Error Details
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-cyber">
                    Retry Deployment
                  </Button>
                </div>
              )}

              {/* Server Status */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mt-6">
                <h3 className="text-lg font-cyber font-bold text-white neon-text-pink drop-shadow-lg mb-4">Server Status</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: 'Server 1', status: 'healthy', cpu: 45, memory: 62 },
                    { name: 'Server 2', status: 'healthy', cpu: 38, memory: 55 },
                    { name: 'Server 3', status: 'warning', cpu: 78, memory: 85 },
                  ].map((server, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-tech text-white">{server.name}</span>
                        <div className={`w-2 h-2 rounded-full ${server.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="text-xs text-gray-400 mb-1">CPU: {server.cpu}%</div>
                          <div className="bg-gray-700 rounded-full h-1.5">
                            <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${server.cpu}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Memory: {server.memory}%</div>
                          <div className="bg-gray-700 rounded-full h-1.5">
                            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${server.memory}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
