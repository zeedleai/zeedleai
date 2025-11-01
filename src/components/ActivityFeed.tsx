"use client";

import { useEffect, useState } from 'react';
import { Activity, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'success' | 'warning' | 'info';
  message: string;
  time: string;
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: 1, type: 'success', message: 'AI Agent "CodeGen-Alpha" completed task', time: '2m ago' },
    { id: 2, type: 'info', message: 'New deployment initiated on production', time: '5m ago' },
    { id: 3, type: 'warning', message: 'Bug detected in authentication module', time: '12m ago' },
    { id: 4, type: 'success', message: 'Test suite passed with 100% coverage', time: '18m ago' },
    { id: 5, type: 'info', message: 'Git sync completed successfully', time: '25m ago' },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Clock className="w-5 h-5 text-[#00f0ff]" />;
    }
  };

  return (
    <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-4 md:p-6 border border-[#00f0ff]/20 neon-border-blue h-full w-full min-w-0">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-6 h-6 text-[#00f0ff]" />
        <h2 className="text-xl font-cyber font-bold text-white">Live Activity Feed</h2>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 bg-[#050814]/40 rounded-lg hover:bg-[#050814]/60 transition-colors"
          >
            <div className="mt-1">{getIcon(activity.type)}</div>
            <div className="flex-1">
              <p className="text-sm text-white font-tech">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1 font-mono">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
