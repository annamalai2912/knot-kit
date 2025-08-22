import React, { useState, useEffect } from 'react';
import { Shuffle, Download, Copy } from 'lucide-react';

interface GenerativeGradientBackgroundProps {
  autoChange?: boolean;
  interval?: number;
}

export const GenerativeGradientBackground: React.FC<GenerativeGradientBackgroundProps> = ({
  autoChange = false,
  interval = 5000
}) => {
  const [currentGradient, setCurrentGradient] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const colorPalettes = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#a8edea', '#fed6e3'],
    ['#ff9a9e', '#fecfef'],
    ['#ffecd2', '#fcb69f'],
    ['#ff8a80', '#ea4c89'],
    ['#667eea', '#764ba2'],
    ['#89f7fe', '#66a6ff'],
    ['#fdbb2d', '#22c1c3'],
    ['#ee9ca7', '#ffdde1'],
    ['#ff6b6b', '#feca57'],
    ['#48cae4', '#023e8a']
  ];

  const directions = [
    'to right',
    'to left', 
    'to bottom',
    'to top',
    'to bottom right',
    'to bottom left',
    'to top right',
    'to top left',
    '45deg',
    '135deg',
    '225deg',
    '315deg'
  ];

  const generateGradient = () => {
    const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const additionalColors = Math.random() > 0.5 ? `, ${palette[1]}` : '';
    
    return `linear-gradient(${direction}, ${palette[0]}, ${palette[1]}${additionalColors})`;
  };

  const handleGenerateNew = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentGradient(generateGradient());
      setIsAnimating(false);
    }, 150);
  };

  const copyGradientCSS = () => {
    const cssValue = `background: ${currentGradient};`;
    navigator.clipboard.writeText(cssValue);
  };

  const downloadGradient = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1080;

    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'gradient-background.png';
          a.click();
          URL.revokeObjectURL(url);
        }
      });
    }
  };

  useEffect(() => {
    setCurrentGradient(generateGradient());
  }, []);

  useEffect(() => {
    if (!autoChange) return;

    const timer = setInterval(handleGenerateNew, interval);
    return () => clearInterval(timer);
  }, [autoChange, interval]);

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg group">
      {/* Gradient Background */}
      <div
        className={`w-full h-full transition-all duration-300 ${
          isAnimating ? 'scale-105 blur-sm' : 'scale-100 blur-0'
        }`}
        style={{ background: currentGradient }}
      >
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`
            }}
          />
        </div>
      </div>

      {/* Controls Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
        <div className="bg-white rounded-lg p-4 shadow-lg space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 text-center">
            Generative Gradient
          </h3>
          
          <div className="flex space-x-2">
            <button
              onClick={handleGenerateNew}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Shuffle className="w-4 h-4" />
              <span>Generate New</span>
            </button>
            
            <button
              onClick={copyGradientCSS}
              className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              title="Copy CSS"
            >
              <Copy className="w-4 h-4" />
            </button>
            
            <button
              onClick={downloadGradient}
              className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              title="Download as PNG"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-gray-600 max-w-xs">
            <p className="font-mono bg-gray-100 p-2 rounded text-center break-all">
              {currentGradient}
            </p>
          </div>
        </div>
      </div>

      {/* Animation Indicator */}
      {isAnimating && (
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm text-gray-700">
          Generating...
        </div>
      )}
    </div>
  );
};