import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface CelebrationButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export const CelebrationButton: React.FC<CelebrationButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md'
}) => {
  const [isExploding, setIsExploding] = useState(false);

  const handleClick = () => {
    setIsExploding(true);
    onClick?.();
    setTimeout(() => setIsExploding(false), 1000);
  };

  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        className={`
          relative overflow-hidden rounded-lg font-medium transition-all duration-200 
          transform active:scale-95 flex items-center space-x-2
          ${variants[variant]} ${sizes[size]}
          ${isExploding ? 'animate-pulse' : 'hover:scale-105'}
        `}
      >
        <span>{children}</span>
        <Sparkles className={`w-4 h-4 transition-transform duration-200 ${
          isExploding ? 'animate-spin' : ''
        }`} />
      </button>

      {/* Fireworks Animation */}
      {isExploding && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute">
              {/* Firework Particles */}
              <div
                className="w-1 h-1 bg-yellow-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  animation: `firework-${i % 6} 0.8s ease-out forwards`
                }}
              />
            </div>
          ))}
          
          {/* Central Burst */}
          <div className="absolute inset-0 bg-white opacity-50 rounded-lg animate-ping" />
        </div>
      )}

      <style jsx>{`
        @keyframes firework-0 { to { transform: translate(-40px, -40px) scale(0); opacity: 0; } }
        @keyframes firework-1 { to { transform: translate(40px, -40px) scale(0); opacity: 0; } }
        @keyframes firework-2 { to { transform: translate(-40px, 40px) scale(0); opacity: 0; } }
        @keyframes firework-3 { to { transform: translate(40px, 40px) scale(0); opacity: 0; } }
        @keyframes firework-4 { to { transform: translate(-60px, 0) scale(0); opacity: 0; } }
        @keyframes firework-5 { to { transform: translate(60px, 0) scale(0); opacity: 0; } }
      `}</style>
    </div>
  );
};