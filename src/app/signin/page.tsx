"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ParticleBackground from '@/components/ParticleBackground';
import { Lock, Mail } from 'lucide-react';
import { signInWithEmail, signInWithGoogle } from '@/lib/firebase';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signInWithEmail(email, password);

    if (result.success) {
      localStorage.setItem('zeedle_token', 'firebase_token');
      localStorage.setItem('zeedle_user', JSON.stringify({ name: 'User', email: email }));
      router.push('/dashboard');
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    const result = await signInWithGoogle();

    if (result.success && result.user) {
      localStorage.setItem('zeedle_token', 'firebase_token');
      localStorage.setItem('zeedle_user', JSON.stringify({ 
        name: result.user.displayName || 'User', 
        email: result.user.email 
      }));
      router.push('/dashboard');
    } else {
      setError(result.message || 'Failed to sign in with Google. Please try again.');
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
              Next-Gen Backend Command Center
            </p>
          </div>

          {/* Sign In Card */}
          <div className="neon-border-blue glow-pulse-blue bg-[#0a0e27]/80 backdrop-blur-xl rounded-xl p-8 shadow-2xl">
            <h2 className="text-2xl font-cyber font-bold text-white mb-6 text-center">
              Access Portal
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#00f0ff] font-tech text-sm uppercase tracking-wider">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@zeedleai.com"
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="demo123"
                  className="bg-[#050814]/60 border-[#ff2d95]/30 text-white placeholder:text-gray-500 focus:border-[#ff2d95] focus:ring-[#ff2d95]/50 font-tech"
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
                className="w-full bg-gradient-to-r from-[#00f0ff] to-[#00d4ff] hover:from-[#00f0ff]/80 hover:to-[#00d4ff]/80 text-white font-cyber font-bold py-6 text-lg glow-pulse-blue transition-all duration-300"
              >
                {loading ? 'AUTHENTICATING...' : 'ENTER SYSTEM'}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#0a0e27]/80 text-gray-400 font-tech">OR CONTINUE WITH</span>
              </div>
            </div>

            {/* Google Sign-In Button */}
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 text-gray-900 font-tech font-bold py-6 text-base border border-gray-300 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400 font-tech">
                Don't have an account?{' '}
                <a href="/register" className="text-[#00f0ff] hover:text-[#00f0ff]/80 font-cyber">
                  Sign Up
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
