"use client";

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  color: 'pink' | 'blue' | 'purple';
}

export default function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  const colorClasses = {
    pink: 'neon-border-pink text-[#ff2d95]',
    blue: 'neon-border-blue text-[#00f0ff]',
    purple: 'border-[#b026ff] text-[#b026ff]'
  };

  return (
    <div className={`bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-4 md:p-6 border ${colorClasses[color]} hover:scale-105 transition-transform duration-300 w-full min-w-0`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${
          color === 'pink' ? 'from-[#ff2d95]/20 to-[#ff2d95]/5' :
          color === 'blue' ? 'from-[#00f0ff]/20 to-[#00f0ff]/5' :
          'from-[#b026ff]/20 to-[#b026ff]/5'
        }`}>
          <Icon className={`w-6 h-6 ${colorClasses[color]}`} />
        </div>
        <span className={`text-sm font-tech ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-3xl font-cyber font-bold text-white mb-1">{value}</h3>
      <p className="text-sm text-gray-400 font-tech uppercase tracking-wider">{title}</p>
    </div>
  );
}
