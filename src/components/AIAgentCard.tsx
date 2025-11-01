"use client";

import { Bot, Activity, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AIAgentCardProps {
  name: string;
  status: 'active' | 'idle' | 'processing';
  tasksCompleted: number;
  efficiency: number;
  type: string;
}

export default function AIAgentCard({ name, status, tasksCompleted, efficiency, type }: AIAgentCardProps) {
  const statusColors = {
    active: 'bg-green-500',
    idle: 'bg-yellow-500',
    processing: 'bg-[#ff2d95]'
  };

  const statusLabels = {
    active: 'Active',
    idle: 'Idle',
    processing: 'Processing'
  };

  return (
    <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-4 md:p-6 border border-[#00f0ff]/20 hover:border-[#ff2d95]/50 transition-all duration-300 hover:scale-105 w-full min-w-0">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-lg bg-gradient-to-br from-[#ff2d95]/20 to-[#00f0ff]/20">
            <Bot className="w-6 h-6 text-[#ff2d95]" />
          </div>
          <div>
            <h3 className="text-lg font-cyber font-bold text-white">{name}</h3>
            <p className="text-xs text-gray-400 font-tech">{type}</p>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${statusColors[status]} glow-pulse-${status === 'processing' ? 'pink' : 'blue'}`}></div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 font-tech">Status</span>
          <Badge className={`${
            status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
            status === 'processing' ? 'bg-[#ff2d95]/20 text-[#ff2d95] border-[#ff2d95]/50' :
            'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
          } font-tech`}>
            {statusLabels[status]}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 font-tech flex items-center">
            <Zap className="w-4 h-4 mr-1 text-[#00f0ff]" />
            Tasks
          </span>
          <span className="text-white font-cyber font-bold">{tasksCompleted}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 font-tech flex items-center">
            <TrendingUp className="w-4 h-4 mr-1 text-[#ff2d95]" />
            Efficiency
          </span>
          <span className="text-white font-cyber font-bold">{efficiency}%</span>
        </div>

        <div className="w-full bg-[#050814] rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#ff2d95] to-[#00f0ff] glow-pulse-pink transition-all duration-500"
            style={{ width: `${efficiency}%` }}
          ></div>
        </div>
      </div>

      <Button className="w-full mt-4 bg-gradient-to-r from-[#ff2d95]/20 to-[#00f0ff]/20 hover:from-[#ff2d95]/30 hover:to-[#00f0ff]/30 text-white border border-[#00f0ff]/30 font-tech">
        <Activity className="w-4 h-4 mr-2" />
        View Details
      </Button>
    </div>
  );
}
