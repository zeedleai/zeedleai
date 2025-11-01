"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Bot, 
  Code, 
  Bug, 
  Rocket, 
  BarChart3, 
  Users, 
  GitBranch, 
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Bot, label: 'AI Agents', href: '/dashboard/agents' },
  { icon: Code, label: 'Code Generation', href: '/dashboard/code' },
  { icon: Bug, label: 'Bug Fixing', href: '/dashboard/bugs' },
  { icon: Rocket, label: 'Deployment', href: '/dashboard/deployment' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Users, label: 'Users', href: '/dashboard/users' },
  { icon: GitBranch, label: 'Git Integration', href: '/dashboard/git' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(prev => !prev);
    if (typeof window !== 'undefined') {
      window.addEventListener('toggle-sidebar', handler as EventListener);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('toggle-sidebar', handler as EventListener);
      }
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('zeedle_token');
    localStorage.removeItem('zeedle_user');
    window.location.href = '/signin';
  };

  return (
    <>
    {open && (
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
      />
    )}
    <div className={`fixed top-0 h-screen w-64 bg-[#0a0e27]/95 backdrop-blur-xl border-r border-[#00f0ff]/20 neon-border-blue z-50 transition-all duration-300 ${open ? 'left-0' : '-left-64'} md:left-0`}>
      {/* Logo */}
      <div className="p-4 border-b border-[#00f0ff]/20">
        <div className="flex items-center justify-center">
          <img src="/logo.svg" alt="Logo" className="w-45 h-12" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-200px)]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 font-tech ${
                isActive
                  ? 'bg-gradient-to-r from-[#ff2d95]/20 to-[#00f0ff]/20 neon-border-pink text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#00f0ff]/10'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#ff2d95]' : ''}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#00f0ff]/20">
        <Button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-[#ff2d95]/20 to-[#b026ff]/20 hover:from-[#ff2d95]/30 hover:to-[#b026ff]/30 text-white border border-[#ff2d95]/30 font-tech"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
    </>
  );
}
