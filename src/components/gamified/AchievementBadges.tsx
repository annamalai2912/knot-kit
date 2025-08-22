import React, { useState, useEffect } from 'react';
import { Trophy, Star, Crown, Zap, Target, Award } from 'lucide-react';
import { Achievement } from '../../types';

interface AchievementBadgesProps {
  achievements: Achievement[];
  onAchievementClick?: (achievement: Achievement) => void;
  showProgress?: boolean;
}

export const AchievementBadges: React.FC<AchievementBadgesProps> = ({
  achievements,
  onAchievementClick,
  showProgress = true
}) => {
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([]);

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-yellow-600';
    }
  };

  const getRarityBorder = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-300';
      case 'epic': return 'border-purple-300';
      case 'legendary': return 'border-yellow-300';
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return Trophy;
      case 'star': return Star;
      case 'crown': return Crown;
      case 'zap': return Zap;
      case 'target': return Target;
      default: return Award;
    }
  };

  useEffect(() => {
    // Check for newly unlocked achievements
    const recentlyUnlocked = achievements
      .filter(achievement => 
        achievement.unlocked && 
        achievement.unlockedAt && 
        Date.now() - achievement.unlockedAt.getTime() < 5000
      )
      .map(achievement => achievement.id);

    if (recentlyUnlocked.length > 0) {
      setNewlyUnlocked(recentlyUnlocked);
      setTimeout(() => setNewlyUnlocked([]), 5000);
    }
  }, [achievements]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progress = (unlockedCount / totalCount) * 100;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <span>Achievements</span>
        </h3>
        
        {showProgress && (
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">
              {unlockedCount} / {totalCount} unlocked
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements.map(achievement => {
          const Icon = getIcon(achievement.icon);
          const isNewlyUnlocked = newlyUnlocked.includes(achievement.id);
          
          return (
            <div
              key={achievement.id}
              onClick={() => onAchievementClick?.(achievement)}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer group
                ${achievement.unlocked 
                  ? `${getRarityBorder(achievement.rarity)} bg-gradient-to-br ${getRarityColor(achievement.rarity)} text-white shadow-lg hover:shadow-xl transform hover:scale-105` 
                  : 'border-gray-200 bg-gray-50 text-gray-400 hover:bg-gray-100'
                }
                ${isNewlyUnlocked ? 'animate-pulse ring-4 ring-yellow-300' : ''}
              `}
            >
              {/* Rarity Indicator */}
              {achievement.unlocked && (
                <div className="absolute top-2 right-2">
                  <div className={`w-2 h-2 rounded-full bg-white opacity-75`} />
                </div>
              )}

              {/* Icon */}
              <div className="flex justify-center mb-3">
                <div className={`
                  p-3 rounded-full transition-all duration-300
                  ${achievement.unlocked 
                    ? 'bg-white bg-opacity-20 group-hover:bg-opacity-30' 
                    : 'bg-gray-200'
                  }
                `}>
                  <Icon className={`w-6 h-6 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`} />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h4 className={`font-semibold text-sm mb-1 ${
                  achievement.unlocked ? 'text-white' : 'text-gray-600'
                }`}>
                  {achievement.name}
                </h4>
                
                <p className={`text-xs leading-tight ${
                  achievement.unlocked ? 'text-white text-opacity-90' : 'text-gray-500'
                }`}>
                  {achievement.description}
                </p>

                {achievement.unlocked && achievement.unlockedAt && (
                  <div className="mt-2 text-xs text-white text-opacity-75">
                    {achievement.unlockedAt.toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Rarity Label */}
              <div className="absolute bottom-1 left-1 right-1">
                <div className={`
                  text-xs font-medium text-center py-1 rounded capitalize
                  ${achievement.unlocked 
                    ? 'bg-white bg-opacity-20 text-white' 
                    : 'bg-gray-200 text-gray-500'
                  }
                `}>
                  {achievement.rarity}
                </div>
              </div>

              {/* Unlock Animation */}
              {isNewlyUnlocked && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                      style={{
                        left: '50%',
                        top: '50%',
                        animationDelay: `${i * 0.1}s`,
                        transform: `translate(-50%, -50%) translate(${Math.cos(i * 45 * Math.PI / 180) * 30}px, ${Math.sin(i * 45 * Math.PI / 180) * 30}px)`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-4 gap-4 text-center">
          {(['common', 'rare', 'epic', 'legendary'] as const).map(rarity => {
            const count = achievements.filter(a => a.rarity === rarity && a.unlocked).length;
            const total = achievements.filter(a => a.rarity === rarity).length;
            
            return (
              <div key={rarity} className="space-y-1">
                <div className={`text-lg font-bold bg-gradient-to-r ${getRarityColor(rarity)} bg-clip-text text-transparent`}>
                  {count}
                </div>
                <div className="text-xs text-gray-600 capitalize">{rarity}</div>
                <div className="text-xs text-gray-500">of {total}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};