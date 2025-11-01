"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Users, UserPlus, Crown, Shield, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  subscription: string;
  status: 'active' | 'inactive';
  apiCalls: number;
  joined: string;
}

export default function UsersPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('zeedle_token');
    if (!token) {
      router.push('/signin');
      return;
    }

    // Fetch mock users
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050814] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-[#ff2d95] border-t-transparent rounded-full animate-spin glow-pulse-pink"></div>
          <p className="mt-4 text-[#00f0ff] font-cyber">Loading Users...</p>
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-cyber font-bold text-white mb-2 glitch neon-text-pink" data-text="User Management">
                User Management
              </h1>
              <p className="text-gray-400 font-tech text-lg">
                Monitor and manage user accounts and subscriptions
              </p>
            </div>
            <Button className="bg-gradient-to-r from-[#ff2d95] to-[#00f0ff] hover:from-[#ff2d95]/80 hover:to-[#00f0ff]/80 text-white font-cyber font-bold glow-pulse-pink">
              <UserPlus className="w-5 h-5 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#ff2d95]/20 neon-border-pink">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-cyber font-bold text-white">{users.length}</p>
                <p className="text-sm text-gray-400 font-tech uppercase mt-1">Total Users</p>
              </div>
              <Users className="w-10 h-10 text-[#ff2d95]" />
            </div>
          </div>

          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#00f0ff]/20 neon-border-blue">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-cyber font-bold text-white">{users.filter(u => u.status === 'active').length}</p>
                <p className="text-sm text-gray-400 font-tech uppercase mt-1">Active Users</p>
              </div>
              <TrendingUp className="w-10 h-10 text-[#00f0ff]" />
            </div>
          </div>

          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#b026ff]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-cyber font-bold text-white">{users.filter(u => u.subscription === 'Premium').length}</p>
                <p className="text-sm text-gray-400 font-tech uppercase mt-1">Premium</p>
              </div>
              <Crown className="w-10 h-10 text-[#b026ff]" />
            </div>
          </div>

          <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl p-6 border border-[#ff2d95]/20 neon-border-pink">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-cyber font-bold text-white">{users.reduce((acc, u) => acc + u.apiCalls, 0).toLocaleString()}</p>
                <p className="text-sm text-gray-400 font-tech uppercase mt-1">API Calls</p>
              </div>
              <Star className="w-10 h-10 text-[#ff2d95]" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md bg-[#0a0e27]/60 border-[#00f0ff]/30 text-white placeholder:text-gray-500 focus:border-[#00f0ff] font-tech"
          />
        </div>

        {/* Users Table */}
        <div className="bg-[#0a0e27]/60 backdrop-blur-xl rounded-xl border border-[#00f0ff]/20 neon-border-blue overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#050814]/60">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-tech uppercase tracking-wider text-[#00f0ff]">User</th>
                  <th className="px-6 py-4 text-left text-xs font-tech uppercase tracking-wider text-[#00f0ff]">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-tech uppercase tracking-wider text-[#00f0ff]">Subscription</th>
                  <th className="px-6 py-4 text-left text-xs font-tech uppercase tracking-wider text-[#00f0ff]">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-tech uppercase tracking-wider text-[#00f0ff]">API Calls</th>
                  <th className="px-6 py-4 text-left text-xs font-tech uppercase tracking-wider text-[#00f0ff]">Joined</th>
                  <th className="px-6 py-4 text-left text-xs font-tech uppercase tracking-wider text-[#00f0ff]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#00f0ff]/10">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#050814]/40 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-tech font-medium">{user.name}</p>
                        <p className="text-sm text-gray-400 font-mono">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-[#ff2d95]" />
                        <span className="text-white font-tech">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`${
                        user.subscription === 'Premium' ? 'bg-[#ff2d95]/20 text-[#ff2d95] border-[#ff2d95]/50' :
                        user.subscription === 'Pro' ? 'bg-[#b026ff]/20 text-[#b026ff] border-[#b026ff]/50' :
                        'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]/50'
                      } font-tech`}>
                        {user.subscription}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`${
                        user.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                        'bg-gray-500/20 text-gray-400 border-gray-500/50'
                      } font-tech`}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-cyber">{user.apiCalls.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400 font-mono text-sm">{user.joined}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Button className="bg-gradient-to-r from-[#ff2d95]/20 to-[#00f0ff]/20 hover:from-[#ff2d95]/30 hover:to-[#00f0ff]/30 text-white border border-[#00f0ff]/30 font-tech text-sm">
                        Manage
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
