"use client";

import { useEffect, useRef } from 'react';

const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>{}[]()=+-*/%&|!@#$^~;:,.?';
const codeSnippets = [
  'const', 'function', 'async', 'await', 'return', 'import', 'export',
  'class', 'extends', 'if', 'else', 'for', 'while', 'try', 'catch',
  '=>', '{}', '()', '[]', '===', '!==', '&&', '||', 'null', 'undefined',
  'true', 'false', 'let', 'var', 'new', 'this', 'super', 'static'
];

interface Drop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number;
}

export default function CodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: Drop[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      if (Math.random() > 0.7) { // Only 30% of columns have drops
        drops.push({
          x: i * fontSize,
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 1,
          chars: Array(20).fill(0).map(() => 
            Math.random() > 0.5 
              ? codeChars[Math.floor(Math.random() * codeChars.length)]
              : codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
          ),
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    }

    function animate() {
      if (!ctx || !canvas) return;

      // Fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((drop) => {
        // Draw the trail
        drop.chars.forEach((char, index) => {
          const y = drop.y - (index * fontSize);
          if (y > 0 && y < canvas.height) {
            // Gradient effect - brighter at the head
            const alpha = (1 - index / drop.chars.length) * drop.opacity;
            
            // Alternate colors for variety
            if (index === 0) {
              ctx.fillStyle = `rgba(255, 45, 149, ${alpha})`; // Pink for head
            } else if (index < 3) {
              ctx.fillStyle = `rgba(176, 38, 255, ${alpha})`; // Purple
            } else {
              ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`; // Cyan
            }
            
            ctx.font = `${fontSize}px monospace`;
            ctx.fillText(char, drop.x, y);
          }
        });

        // Move drop
        drop.y += drop.speed;

        // Reset drop when it goes off screen
        if (drop.y > canvas.height + drop.chars.length * fontSize) {
          drop.y = -drop.chars.length * fontSize;
          drop.speed = Math.random() * 2 + 1;
          drop.opacity = Math.random() * 0.5 + 0.3;
          // Occasionally change the characters
          if (Math.random() > 0.8) {
            drop.chars = Array(20).fill(0).map(() => 
              Math.random() > 0.5 
                ? codeChars[Math.floor(Math.random() * codeChars.length)]
                : codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
            );
          }
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
