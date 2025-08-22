import React from 'react';
import { Star, Trophy } from 'lucide-react';
import { useCounterAnimation } from '../../hooks/useAnimation';

interface XPProgressBarProps {
  currentXP: number;
  targetXP: number;
  level: number;
  showAnimation?: boolean;
}

export const XPProgressBar: React.FC<XPProgressBarProps> = ({
  currentXP,
  targetXP,
  level,
  showAnimation = true
}) => {
  const animatedXP = useCounterAnimation(currentXP, showAnimation ? 1500 : 0);
  const progress = Math.min((animatedXP / targetXP) * 100, 100);
  const nextLevelXP = targetXP - currentXP;

  const getLevelColor = (level: number) => {
    if (level < 5) return 'from-green-400 to-green-600';
    if (level < 15) return 'from-blue-400 to-blue-600';
    if (level < 30) return 'from-purple-400 to-purple-600';
    if (level < 50) return 'from-orange-400 to-orange-600';
    return 'from-yellow-400 to-yellow-600';
  };

  const getLevelRank = (level: number) => {
    if (level < 5) return { name: 'Novice', icon: Star };
    if (level < 15) return { name: 'Apprentice', icon: Star };
    if (level < 30) return { name: 'Expert', icon: Trophy };
    if (level < 50) return { name: 'Master', icon: Trophy };
    return { name: 'Legend', icon: Trophy };
  };

  const rank = getLevelRank(level);
  const Icon = rank.icon;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Level and Rank Display */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-full bg-gradient-to-r ${getLevelColor(level)}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Level {level}</h3>
            <p className="text-sm text-gray-600">{rank.name}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">{animatedXP.toLocaleString()}</p>
          <p className="text-sm text-gray-600">XP</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getLevelColor(level)} transition-all duration-1000 ease-out rounded-full relative`}
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
          </div>
        </div>
        
        {/* Progress Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-gray-700 bg-white bg-opacity-90 px-2 py-1 rounded-full shadow-sm">
            {progress.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* XP Details */}
      <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
        <span>{animatedXP.toLocaleString()} / {targetXP.toLocaleString()} XP</span>
        <span>{nextLevelXP.toLocaleString()} XP to next level</span>
      </div>

      {/* Level Milestones */}
      <div className="mt-4 flex justify-between text-xs text-gray-400">
        {[...Array(5)].map((_, i) => {
          const milestoneLevel = Math.floor(level / 5) * 5 + i;
          const isReached = level >= milestoneLevel;
          
          return (
            <div key={i} className="text-center">
              <div className={`w-2 h-2 rounded-full mb-1 mx-auto ${
                isReached ? 'bg-indigo-500' : 'bg-gray-300'
              }`} />
              <span>{milestoneLevel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};