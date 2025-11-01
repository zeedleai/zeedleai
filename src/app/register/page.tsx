"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ParticleBackground from '@/components/ParticleBackground';
import { Lock, Mail, User } from 'lucide-react';
import { signUpWithEmail } from '@/lib/firebase';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await signUpWithEmail(formData.email, formData.password, formData.name);

    if (result.success) {
      localStorage.setItem('zeedle_token', 'firebase_token'); // Mock token for now
      localStorage.setItem('zeedle_user', JSON.stringify({ name: formData.name, email: formData.email }));
      router.push('/dashboard');
    } else {
      setError(result.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center mb-2">
              <img src="/logo.svg" alt="ZeedleAI Logo" className="w-66 h-16" />
            </div>
            <p className="text-[#00f0ff] font-tech text-lg tracking-wider">
              Create Your Account
            </p>
          </div>

          {/* Register Card */}
          <div className="neon-border-blue glow-pulse-blue bg-[#0a0e27]/80 backdrop-blur-xl rounded-xl p-8 shadow-2xl">
            <h2 className="text-2xl font-cyber font-bold text-white mb-6 text-center">
              Join ZeedleAI
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#00f0ff] font-tech text-sm uppercase tracking-wider">
                  <User className="inline w-4 h-4 mr-2" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="bg-[#050814]/60 border-[#00f0ff]/30 text-white placeholder:text-gray-500 focus:border-[#00f0ff] focus:ring-[#00f0ff]/50 font-tech"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#00f0ff] font-tech text-sm uppercase tracking-wider">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@zeedleai.com"
                  className="bg-[#050814]/60 border-[#00f0ff]/30 text-white placeholder:text-gray-500 focus:border-[#00f0ff] focus:ring-[#00f0ff]/50 font-tech"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#ff2d95] font-tech text-sm uppercase tracking-wider">
                  <Lock className="inline w-4 h-4 mr-2" />
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-[#050814]/60 border-[#ff2d95]/30 text-white placeholder:text-gray-500 focus:border-[#ff2d95] focus:ring-[#ff2d95]/50 font-tech"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#b026ff] font-tech text-sm uppercase tracking-wider">
                  <Lock className="inline w-4 h-4 mr-2" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-[#050814]/60 border-[#b026ff]/30 text-white placeholder:text-gray-500 focus:border-[#b026ff] focus:ring-[#b026ff]/50 font-tech"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm font-tech">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#ff2d95] to-[#b026ff] hover:from-[#ff2d95]/80 hover:to-[#b026ff]/80 text-white font-cyber font-bold py-6 text-lg glow-pulse-pink transition-all duration-300"
              >
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400 font-tech">
                Already have an account?{' '}
                <a href="/signin" className="text-[#00f0ff] hover:text-[#00f0ff]/80 font-cyber">
                  Sign In
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 font-tech">
              Powered by <span className="text-[#ff2d95]">ZeedleAI</span> Technology
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
