"use client";

import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', agents: 45, tasks: 67, deployments: 23 },
  { name: 'Tue', agents: 52, tasks: 78, deployments: 31 },
  { name: 'Wed', agents: 48, tasks: 82, deployments: 28 },
  { name: 'Thu', agents: 61, tasks: 91, deployments: 42 },
  { name: 'Fri', agents: 55, tasks: 85, deployments: 38 },
  { name: 'Sat', agents: 67, tasks: 95, deployments: 45 },
  { name: 'Sun', agents: 58, tasks: 88, deployments: 35 },
];

export default function AnalyticsChart() {
  return (
    <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-4 md:p-6 border border-[#ff2d95]/20 neon-border-pink w-full min-w-0">
      <h2 className="text-xl font-cyber font-bold text-white mb-6">Performance Metrics</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAgents" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff2d95" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ff2d95" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDeployments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#b026ff" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#b026ff" stopOpacity={0}/>
            </linearGradient>
          </defs>
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
          <Area type="monotone" dataKey="agents" stroke="#ff2d95" fillOpacity={1} fill="url(#colorAgents)" />
          <Area type="monotone" dataKey="tasks" stroke="#00f0ff" fillOpacity={1} fill="url(#colorTasks)" />
          <Area type="monotone" dataKey="deployments" stroke="#b026ff" fillOpacity={1} fill="url(#colorDeployments)" />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex justify-center space-x-8 mt-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff2d95]"></div>
          <span className="text-sm text-gray-400 font-tech">AI Agents</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#00f0ff]"></div>
          <span className="text-sm text-gray-400 font-tech">Tasks</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#b026ff]"></div>
          <span className="text-sm text-gray-400 font-tech">Deployments</span>
        </div>
      </div>
    </div>
  );
}
