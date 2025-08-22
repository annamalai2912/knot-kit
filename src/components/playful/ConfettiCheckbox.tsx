import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface ConfettiCheckboxProps {
  label?: string;
  onChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
}

export const ConfettiCheckbox: React.FC<ConfettiCheckboxProps> = ({
  label = "Check me!",
  onChange,
  defaultChecked = false
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange?.(newChecked);

    if (newChecked) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }
  };

  return (
    <div className="relative inline-flex items-center space-x-3">
      <div className="relative">
        <button
          onClick={handleClick}
          className={`w-6 h-6 rounded border-2 transition-all duration-200 flex items-center justify-center ${
            checked 
              ? 'bg-indigo-600 border-indigo-600 scale-110' 
              : 'border-gray-300 hover:border-indigo-400'
          }`}
        >
          <Check 
            className={`w-4 h-4 text-white transition-opacity duration-200 ${
              checked ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </button>
        
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'][i],
                  left: '50%',
                  top: '50%',
                  animation: `confetti-${i} 1s ease-out forwards`
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      {label && (
        <label 
          onClick={handleClick}
          className="text-gray-700 cursor-pointer select-none"
        >
          {label}
        </label>
      )}

      <style jsx>{`
        @keyframes confetti-0 { to { transform: translate(-20px, -30px) rotate(180deg); opacity: 0; } }
        @keyframes confetti-1 { to { transform: translate(20px, -25px) rotate(270deg); opacity: 0; } }
        @keyframes confetti-2 { to { transform: translate(-15px, -20px) rotate(90deg); opacity: 0; } }
        @keyframes confetti-3 { to { transform: translate(25px, -35px) rotate(360deg); opacity: 0; } }
        @keyframes confetti-4 { to { transform: translate(-25px, -15px) rotate(45deg); opacity: 0; } }
        @keyframes confetti-5 { to { transform: translate(15px, -30px) rotate(135deg); opacity: 0; } }
        @keyframes confetti-6 { to { transform: translate(-30px, -25px) rotate(225deg); opacity: 0; } }
        @keyframes confetti-7 { to { transform: translate(30px, -20px) rotate(315deg); opacity: 0; } }
      `}</style>
    </div>
  );
};