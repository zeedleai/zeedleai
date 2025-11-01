"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Settings, User, Bell, Shield, Database, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
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
          <p className="mt-4 text-[#00f0ff] font-cyber">Loading Settings...</p>
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

      <main className="md:ml-64 ml-0 mt-20 p-4 md:p-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-cyber font-bold text-white mb-2 glitch neon-text-pink" data-text="Settings">
            Settings
          </h1>
          <p className="text-gray-400 font-tech text-lg">
            Configure your ZeedleAI dashboard preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="lg:col-span-2 bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#00f0ff]/20 neon-border-blue">
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-[#00f0ff]" />
              <h2 className="text-xl font-cyber font-bold text-white">Profile Settings</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-[#00f0ff] font-tech">Full Name</Label>
                <Input
                  defaultValue="Admin User"
                  className="bg-[#050814]/60 border-[#00f0ff]/30 text-white font-tech"
                />
              </div>
              <div>
                <Label className="text-[#00f0ff] font-tech">Email Address</Label>
                <Input
                  defaultValue="admin@zeedleai.com"
                  className="bg-[#050814]/60 border-[#00f0ff]/30 text-white font-tech"
                />
              </div>
              <div>
                <Label className="text-[#00f0ff] font-tech">Role</Label>
                <Input
                  defaultValue="Administrator"
                  disabled
                  className="bg-[#050814]/60 border-[#00f0ff]/30 text-gray-400 font-tech"
                />
              </div>
              <Button className="bg-gradient-to-r from-[#ff2d95] to-[#00f0ff] hover:from-[#ff2d95]/80 hover:to-[#00f0ff]/80 text-white font-cyber font-bold">
                Save Changes
              </Button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#ff2d95]/20 neon-border-pink">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-6 h-6 text-[#ff2d95]" />
              <h2 className="text-xl font-cyber font-bold text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white font-tech">Email Alerts</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-white font-tech">Push Notifications</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-white font-tech">Task Updates</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-white font-tech">Weekly Reports</Label>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#b026ff]/20">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-[#b026ff]" />
              <h2 className="text-xl font-cyber font-bold text-white">Security</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-[#b026ff] font-tech">Current Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-[#050814]/60 border-[#b026ff]/30 text-white font-tech"
                />
              </div>
              <div>
                <Label className="text-[#b026ff] font-tech">New Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-[#050814]/60 border-[#b026ff]/30 text-white font-tech"
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-[#b026ff]/20 to-[#ff2d95]/20 hover:from-[#b026ff]/30 hover:to-[#ff2d95]/30 text-white border border-[#b026ff]/30 font-cyber">
                Update Password
              </Button>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#00f0ff]/20 neon-border-blue">
            <div className="flex items-center space-x-3 mb-6">
              <Palette className="w-6 h-6 text-[#00f0ff]" />
              <h2 className="text-xl font-cyber font-bold text-white">Appearance</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white font-tech">Neon Effects</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-white font-tech">Animations</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-white font-tech">Particle Background</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-white font-tech">Scanline Effect</Label>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* API Settings */}
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#ff2d95]/20 neon-border-pink">
            <div className="flex items-center space-x-3 mb-6">
              <Database className="w-6 h-6 text-[#ff2d95]" />
              <h2 className="text-xl font-cyber font-bold text-white">API Settings</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-[#ff2d95] font-tech">API Key</Label>
                <Input
                  defaultValue="zai_demo_key_2024..."
                  disabled
                  className="bg-[#050814]/60 border-[#ff2d95]/30 text-gray-400 font-mono text-sm"
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-[#ff2d95]/20 to-[#00f0ff]/20 hover:from-[#ff2d95]/30 hover:to-[#00f0ff]/30 text-white border border-[#ff2d95]/30 font-cyber">
                Generate New Key
              </Button>
              <div className="mt-4 p-3 bg-[#050814]/40 rounded-lg">
                <p className="text-xs text-gray-400 font-tech">
                  Rate Limit: 10,000 requests/hour
                </p>
                <p className="text-xs text-gray-400 font-tech mt-1">
                  Usage: 2,847 / 10,000
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
