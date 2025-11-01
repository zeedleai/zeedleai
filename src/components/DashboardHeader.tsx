"use client";

import { useEffect, useState } from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function DashboardHeader() {
  const [user, setUser] = useState<any>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const userData = localStorage.getItem('zeedle_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-20 bg-[#0a0e27]/80 backdrop-blur-xl border-b border-[#00f0ff]/20 z-40">
      <div className="flex items-center justify-between h-full px-4 md:px-8">
        <div className="flex items-center gap-2 md:gap-3 flex-1">
          <Button
            className="md:hidden bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/30 text-[#00f0ff] p-2"
            onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('toggle-sidebar'))}
          >
            <Menu className="w-5 h-5" />
          </Button>
          {/* Search Bar */}
          <div className="hidden sm:block flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#00f0ff]" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-12 bg-[#050814]/60 border-[#00f0ff]/30 text-white placeholder:text-gray-500 focus:border-[#00f0ff] font-tech text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2 md:space-x-6">
          {/* System Time - Hidden on mobile */}
          <div className="text-right hidden md:block">
            <p className="text-xs text-[#00f0ff] font-tech uppercase">System Time</p>
            <p className="text-sm text-white font-mono">{time.toLocaleTimeString()}</p>
          </div>

          {/* Notifications */}
          <Button className="relative bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/30 text-[#00f0ff] p-2">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff2d95] rounded-full text-[10px] flex items-center justify-center glow-pulse-pink">
              3
            </span>
          </Button>

          {/* User Profile */}
          <div className="flex items-center space-x-2 md:space-x-3 px-2 md:px-4 py-2 bg-gradient-to-r from-[#ff2d95]/20 to-[#00f0ff]/20 rounded-lg border border-[#ff2d95]/30">
            <User className="w-5 h-5 md:w-6 md:h-6 text-[#ff2d95]" />
            <div className="hidden sm:block">
              <p className="text-sm text-white font-tech font-medium">{user?.name || 'User'}</p>
              <p className="text-xs text-[#00f0ff]">{user?.role || 'Admin'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
