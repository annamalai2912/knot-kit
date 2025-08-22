import React, { useState } from 'react';

interface BouncyToggleProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BouncyToggle: React.FC<BouncyToggleProps> = ({
  defaultChecked = false,
  onChange,
  label,
  size = 'md'
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  const [isAnimating, setIsAnimating] = useState(false);

  const sizes = {
    sm: { container: 'w-10 h-6', toggle: 'w-4 h-4', translate: 'translate-x-4' },
    md: { container: 'w-12 h-7', toggle: 'w-5 h-5', translate: 'translate-x-5' },
    lg: { container: 'w-14 h-8', toggle: 'w-6 h-6', translate: 'translate-x-6' }
  };

  const currentSize = sizes[size];

  const handleToggle = () => {
    setIsAnimating(true);
    const newChecked = !checked;
    setChecked(newChecked);
    onChange?.(newChecked);
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={handleToggle}
        className={`
          relative inline-flex items-center ${currentSize.container} rounded-full 
          transition-all duration-300 ease-out focus:outline-none focus:ring-2 
          focus:ring-indigo-500 focus:ring-offset-2
          ${checked ? 'bg-indigo-600' : 'bg-gray-300'}
          ${isAnimating ? 'scale-110' : 'scale-100'}
        `}
      >
        <span
          className={`
            ${currentSize.toggle} bg-white rounded-full shadow-lg transform transition-all 
            duration-300 ease-out flex items-center justify-center
            ${checked ? currentSize.translate : 'translate-x-1'}
            ${isAnimating ? 'animate-bounce scale-110' : ''}
          `}
        >
          {/* Inner glow effect */}
          <div className={`
            w-2 h-2 rounded-full transition-all duration-300
            ${checked ? 'bg-indigo-400 opacity-60' : 'bg-gray-400 opacity-30'}
          `} />
        </span>

        {/* Ripple effect */}
        {isAnimating && (
          <div className={`
            absolute inset-0 rounded-full border-2 animate-ping
            ${checked ? 'border-indigo-400' : 'border-gray-400'}
          `} />
        )}
      </button>

      {label && (
        <label 
          onClick={handleToggle}
          className="text-gray-700 cursor-pointer select-none font-medium"
        >
          {label}
        </label>
      )}
    </div>
  );
};