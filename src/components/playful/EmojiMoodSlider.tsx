import React, { useState } from 'react';

interface EmojiMoodSliderProps {
  onChange?: (value: number, mood: string) => void;
  defaultValue?: number;
}

const moods = [
  { emoji: '😢', label: 'Very Sad', color: '#ef4444' },
  { emoji: '😕', label: 'Sad', color: '#f97316' },
  { emoji: '😐', label: 'Neutral', color: '#eab308' },
  { emoji: '🙂', label: 'Happy', color: '#22c55e' },
  { emoji: '😄', label: 'Very Happy', color: '#10b981' }
];

export const EmojiMoodSlider: React.FC<EmojiMoodSliderProps> = ({
  onChange,
  defaultValue = 2
}) => {
  const [value, setValue] = useState(defaultValue);
  const currentMood = moods[value];

  const handleChange = (newValue: number) => {
    setValue(newValue);
    onChange?.(newValue, moods[newValue].label);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <div 
          className="text-6xl mb-2 transition-all duration-300 transform hover:scale-110"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
        >
          {currentMood.emoji}
        </div>
        <p className="text-lg font-medium" style={{ color: currentMood.color }}>
          {currentMood.label}
        </p>
      </div>

      <div className="relative">
        <input
          type="range"
          min="0"
          max="4"
          step="1"
          value={value}
          onChange={(e) => handleChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, 
              #ef4444 0%, #ef4444 20%, 
              #f97316 20%, #f97316 40%, 
              #eab308 40%, #eab308 60%, 
              #22c55e 60%, #22c55e 80%, 
              #10b981 80%, #10b981 100%)`
          }}
        />
        
        <div className="flex justify-between mt-3">
          {moods.map((mood, index) => (
            <button
              key={index}
              onClick={() => handleChange(index)}
              className={`text-2xl transition-all duration-200 hover:scale-125 ${
                index === value ? 'scale-125' : 'opacity-50'
              }`}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 3px solid ${currentMood.color};
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.2s;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};