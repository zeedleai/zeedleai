"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Zap, Code2, Shield, Cpu, Terminal, GitBranch, Database, Rocket, Brain, Lock, Server } from 'lucide-react';
import CodeBackground from '@/components/CodeBackground';

const codeSnippets = [
  { code: 'const deploy = async () => {', color: '#ff2d95', delay: 0 },
  { code: '  await ai.optimize();', color: '#00f0ff', delay: 100 },
  { code: '  return success;', color: '#b026ff', delay: 200 },
  { code: '};', color: '#ff2d95', delay: 300 },
];

const features = [
  {
    icon: Terminal,
    title: 'AI Code Generation',
    description: 'Generate production-ready code with intelligent AI assistance',
    gradient: 'from-pink-500 to-purple-600'
  },
  {
    icon: GitBranch,
    title: 'Smart Deployments',
    description: 'Automated CI/CD pipelines with zero-downtime deployments',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    icon: Brain,
    title: 'Intelligent Debugging',
    description: 'AI-powered bug detection and automatic fix suggestions',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    icon: Database,
    title: 'Database Optimization',
    description: 'Real-time query optimization and performance monitoring',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Lock,
    title: 'Security Scanning',
    description: 'Continuous security analysis and vulnerability detection',
    gradient: 'from-red-500 to-orange-600'
  },
  {
    icon: Rocket,
    title: 'Performance Boost',
    description: 'Automatic scaling and resource optimization',
    gradient: 'from-green-500 to-emerald-600'
  },
];

const terminalCommands = [
  '$ zeedle init --ai-powered',
  '> Initializing AI Backend Agent...',
  '> Loading neural networks...',
  '> Analyzing codebase...',
  '✓ Ready to revolutionize your workflow!',
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [terminalText, setTerminalText] = useState('');
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    const elements = heroRef.current?.children;
    if (elements) {
      Array.from(elements).forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate-in');
        }, index * 150);
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Terminal typing animation
  useEffect(() => {
    if (currentCommandIndex >= terminalCommands.length) return;

    const currentCommand = terminalCommands[currentCommandIndex];
    
    if (currentCharIndex < currentCommand.length) {
      const timeout = setTimeout(() => {
        setTerminalText(prev => prev + currentCommand[currentCharIndex]);
        setCurrentCharIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTerminalText(prev => prev + '\n');
        setCurrentCommandIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentCommandIndex]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <CodeBackground />
      
      {/* Floating code snippets */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {codeSnippets.map((snippet, i) => (
          <div
            key={i}
            className="absolute text-xs md:text-sm font-mono opacity-20"
            style={{
              color: snippet.color,
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              animation: `float ${3 + i}s ease-in-out infinite`,
              animationDelay: `${snippet.delay}ms`,
            }}
          >
            {snippet.code}
          </div>
        ))}
      </div>

      <main className="relative z-10 pt-10 pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div ref={heroRef} className="text-center space-y-6 mb-16">
            <div className="mb-4">
              <img src="/logo.svg" alt="ZeedleAI" className="w-40 h-40 md:w-48 md:h-48 mx-auto" />
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-cyber font-bold">
              <span className="block bg-gradient-to-r from-[#ff2d95] via-[#b026ff] to-[#00f0ff] bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                Code Smarter,
              </span>
              <span className="block bg-gradient-to-r from-[#00f0ff] via-[#b026ff] to-[#ff2d95] bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                Deploy Faster
              </span>
            </h1>

            <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-tech">
              Harness the power of <span className="text-[#ff2d95] font-bold">AI-driven automation</span> to revolutionize your backend operations. 
              Generate code, fix bugs, and deploy with <span className="text-[#00f0ff] font-bold">unprecedented efficiency</span>.
            </p>

            {/* Terminal Window */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-[#00f0ff]/30 shadow-2xl overflow-hidden">
                <div className="bg-gray-800/90 px-4 py-2 flex items-center gap-2 border-b border-[#00f0ff]/20">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-xs text-gray-400 font-mono">zeedle-terminal</span>
                </div>
                <div className="p-4 font-mono text-sm text-left h-40 overflow-hidden">
                  <pre className="text-[#00f0ff]">{terminalText}<span className="animate-pulse">▊</span></pre>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center pt-6">
              <Link href="/register">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-[#ff2d95] to-[#b026ff] hover:from-[#ff2d95]/80 hover:to-[#b026ff]/80 text-white font-cyber font-bold text-lg rounded-lg glow-pulse-pink transition-all duration-300 transform hover:scale-105">
                  <span className="relative z-10 flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Launch Dashboard
                    <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-cyber font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-[#ff2d95] to-[#00f0ff] bg-clip-text text-transparent">
                Supercharge Your Development
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-[#00f0ff]/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#00f0ff]/20"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-cyber font-bold mb-2 text-white group-hover:text-[#00f0ff] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-tech leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/0 to-[#ff2d95]/0 group-hover:from-[#00f0ff]/5 group-hover:to-[#ff2d95]/5 rounded-lg transition-all duration-300 pointer-events-none"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Code Generated', value: '10M+', icon: Code2 },
              { label: 'Deployments', value: '500K+', icon: Rocket },
              { label: 'Bugs Fixed', value: '2M+', icon: Shield },
              { label: 'Active Devs', value: '50K+', icon: Cpu },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:border-[#ff2d95]/50 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 mx-auto mb-2 text-[#ff2d95]" />
                  <div className="text-3xl font-cyber font-bold bg-gradient-to-r from-[#ff2d95] to-[#00f0ff] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-tech mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
