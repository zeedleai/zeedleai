"use client";

import { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Code2, Sparkles, Copy, Download, Play, RefreshCw, Zap, FileCode, Terminal, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const codeTemplates = [
  {
    id: 1,
    name: 'REST API Endpoint',
    language: 'TypeScript',
    description: 'Generate a complete REST API endpoint with validation',
    gradient: 'from-pink-500 to-purple-600'
  },
  {
    id: 2,
    name: 'Database Model',
    language: 'TypeScript',
    description: 'Create database models with Prisma or TypeORM',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 3,
    name: 'Authentication',
    language: 'TypeScript',
    description: 'JWT authentication with middleware',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 4,
    name: 'CRUD Operations',
    language: 'TypeScript',
    description: 'Complete CRUD with error handling',
    gradient: 'from-green-500 to-emerald-600'
  },
];

const recentGenerations = [
  { id: 1, name: 'UserController.ts', time: '2 mins ago', lines: 156 },
  { id: 2, name: 'AuthMiddleware.ts', time: '15 mins ago', lines: 89 },
  { id: 3, name: 'DatabaseSchema.ts', time: '1 hour ago', lines: 234 },
  { id: 4, name: 'APIRoutes.ts', time: '2 hours ago', lines: 178 },
];

export default function CodeGenerationPage() {
  const [prompt, setPrompt] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('TypeScript');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const languages = ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java'];

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI code generation
    setTimeout(() => {
      const sampleCode = `// AI Generated Code - ${selectedLanguage}
import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }
    
    // Create user
    const user = await prisma.user.create({
      data: { name, email, password }
    });
    
    return res.status(201).json({ 
      success: true, 
      user 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}`;
      setGeneratedCode(sampleCode);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  return (
    <div className="min-h-screen bg-[#050814]">
      <div className="cyber-grid fixed inset-0 opacity-10" />
      <div className="scanline" />

      <DashboardSidebar />
      <DashboardHeader />

      <main className="md:ml-64 ml-0 mt-20 p-4 md:p-8 relative z-10 max-w-full overflow-x-hidden">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-cyber font-bold text-white neon-text-pink drop-shadow-lg">AI Code Generation</h1>
              <p className="text-gray-400 font-tech">Generate production-ready code with AI assistance</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 w-full min-w-0">
          {[
            { label: 'Code Generated', value: '1,234', icon: Code2, color: 'text-pink-500' },
            { label: 'Lines of Code', value: '45.6K', icon: FileCode, color: 'text-cyan-500' },
            { label: 'Success Rate', value: '98.5%', icon: CheckCircle2, color: 'text-green-500' },
            { label: 'Time Saved', value: '127h', icon: Zap, color: 'text-purple-500' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                <Icon className={`w-8 h-8 ${stat.color} mb-2`} />
                <div className="text-2xl font-cyber font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 font-tech">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 w-full min-w-0">
          {/* Main Generation Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-cyber font-bold text-white neon-text-pink drop-shadow-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                Describe What You Want to Build
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-tech text-gray-400 mb-2">Language</label>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`px-4 py-2 rounded-lg font-tech transition-all ${
                          selectedLanguage === lang
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-tech text-gray-400 mb-2">Prompt</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., Create a user authentication endpoint with JWT tokens..."
                    className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white font-mono text-sm focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-cyber font-bold py-6 text-lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Generating Code...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Code
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Generated Code Output */}
            {generatedCode && (
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden">
                <div className="bg-gray-800/90 px-4 py-3 flex items-center justify-between border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-sm text-gray-400 font-mono">Generated Code</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="p-2 hover:bg-gray-700 rounded transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-700 rounded transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-700 rounded transition-colors"
                      title="Run code"
                    >
                      <Play className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                <pre className="p-4 md:p-6 overflow-x-auto max-w-full">
                  <code className="text-sm font-mono text-cyan-400">{generatedCode}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Templates */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-cyber font-bold text-white neon-text-pink drop-shadow-lg mb-4">Quick Templates</h3>
              <div className="space-y-3">
                {codeTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setPrompt(template.description)}
                    className="w-full text-left p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-pink-500/50 rounded-lg transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Code2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-tech font-bold text-white text-sm group-hover:text-pink-500 transition-colors">
                          {template.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{template.language}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Generations */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-cyber font-bold text-white neon-text-pink drop-shadow-lg mb-4">Recent Generations</h3>
              <div className="space-y-3">
                {recentGenerations.map((item) => (
                  <div key={item.id} className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-mono text-white">{item.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{item.time}</span>
                      <span>{item.lines} lines</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
