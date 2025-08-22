import React, { useState } from 'react';
import { Flame, Calendar, Target, TrendingUp } from 'lucide-react';

interface StreakData {
  current: number;
  longest: number;
  total: number;
  lastActivity: Date;
  weekData: boolean[];
}

interface StreakTrackerProps {
  streakData: StreakData;
  title?: string;
  onActivityToggle?: (date: Date) => void;
}

export const StreakTracker: React.FC<StreakTrackerProps> = ({
  streakData,
  title = "Daily Streak",
  onActivityToggle
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'from-purple-500 to-pink-500';
    if (streak >= 14) return 'from-orange-500 to-red-500';
    if (streak >= 7) return 'from-yellow-500 to-orange-500';
    if (streak >= 3) return 'from-green-500 to-yellow-500';
    return 'from-blue-500 to-green-500';
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '🔥';
    if (streak >= 14) return '⚡';
    if (streak >= 7) return '🌟';
    if (streak >= 3) return '✨';
    return '💫';
  };

  const getDaysOfWeek = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    return days.map((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return { day, date, active: streakData.weekData[index] };
    });
  };

  const getMotivationalMessage = (streak: number) => {
    if (streak === 0) return "Start your streak today!";
    if (streak === 1) return "Great start! Keep it going!";
    if (streak < 7) return "Building momentum!";
    if (streak < 14) return "You're on fire!";
    if (streak < 30) return "Incredible dedication!";
    return "Legendary streak!";
  };

  const weekDays = getDaysOfWeek();
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
          <Flame className="w-6 h-6 text-orange-500" />
          <span>{title}</span>
        </h3>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {streakData.current}
          </div>
          <div className="text-sm text-gray-600">day streak</div>
        </div>
      </div>

      {/* Main Streak Display */}
      <div className="text-center mb-8">
        <div className={`
          inline-flex items-center justify-center w-32 h-32 rounded-full 
          bg-gradient-to-br ${getStreakColor(streakData.current)} 
          text-white shadow-lg mb-4 relative overflow-hidden
        `}>
          <div className="text-center">
            <div className="text-4xl mb-1">{getStreakEmoji(streakData.current)}</div>
            <div className="text-2xl font-bold">{streakData.current}</div>
            <div className="text-sm opacity-90">days</div>
          </div>
          
          {/* Animated rings */}
          {streakData.current > 0 && (
            <>
              <div className="absolute inset-0 border-4 border-white opacity-20 rounded-full animate-ping" />
              <div className="absolute inset-2 border-2 border-white opacity-30 rounded-full animate-pulse" />
            </>
          )}
        </div>
        
        <p className="text-lg font-medium text-gray-700 mb-2">
          {getMotivationalMessage(streakData.current)}
        </p>
        
        {streakData.lastActivity && (
          <p className="text-sm text-gray-500">
            Last activity: {streakData.lastActivity.toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Week View */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>This Week</span>
        </h4>
        
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map(({ day, date, active }, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedDate(date);
                onActivityToggle?.(date);
              }}
              className={`
                p-3 rounded-lg text-center transition-all duration-200 border-2
                ${active 
                  ? 'bg-green-500 text-white border-green-500 shadow-md' 
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }
                ${isToday(date) ? 'ring-2 ring-indigo-300' : ''}
              `}
            >
              <div className="text-xs font-medium mb-1">{day}</div>
              <div className="text-lg font-bold">{date.getDate()}</div>
              {active && <div className="text-xs mt-1">✓</div>}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{streakData.current}</div>
          <div className="text-sm text-gray-600">Current</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{streakData.longest}</div>
          <div className="text-sm text-gray-600">Best</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{streakData.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
      </div>

      {/* Progress towards next milestone */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Next Milestone</span>
          <span className="text-sm text-gray-600">
            {Math.max(0, Math.ceil(streakData.current / 7) * 7 - streakData.current)} days to go
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${getStreakColor(streakData.current)} transition-all duration-500`}
            style={{ 
              width: `${(streakData.current % 7) * (100 / 7)}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};