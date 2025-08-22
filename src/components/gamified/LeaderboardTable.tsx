import React from 'react';
import { Crown, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LeaderboardEntry } from '../../types';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
  showChange?: boolean;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  entries,
  currentUserId,
  showChange = true
}) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <div className="w-5 h-5 rounded-full bg-gray-400" />;
      case 3: return <div className="w-5 h-5 rounded-full bg-amber-600" />;
      default: return <span className="text-gray-600 font-medium">{rank}</span>;
    }
  };

  const getChangeIcon = (change: LeaderboardEntry['change']) => {
    switch (change) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600';
    return 'bg-gray-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Crown className="w-6 h-6" />
          <span>Leaderboard</span>
        </h2>
      </div>

      <div className="divide-y divide-gray-200">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className={`px-6 py-4 transition-all duration-200 hover:bg-gray-50 ${
              entry.id === currentUserId ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Rank */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  entry.rank <= 3 ? getRankColor(entry.rank) : 'bg-gray-100'
                }`}>
                  {getRankIcon(entry.rank)}
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  {entry.avatar ? (
                    <img
                      src={entry.avatar}
                      alt={entry.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                      {entry.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Name */}
                <div>
                  <h3 className={`font-medium ${
                    entry.id === currentUserId ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {entry.name}
                    {entry.id === currentUserId && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        You
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Rank #{entry.rank}
                  </p>
                </div>
              </div>

              {/* Score and Change */}
              <div className="flex items-center space-x-4">
                {showChange && (
                  <div className="flex items-center space-x-1">
                    {getChangeIcon(entry.change)}
                  </div>
                )}
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {entry.score.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">points</div>
                </div>
              </div>
            </div>

            {/* Achievement Badges for Top 3 */}
            {entry.rank <= 3 && (
              <div className="mt-3 flex items-center justify-center">
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  entry.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                  entry.rank === 2 ? 'bg-gray-100 text-gray-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {entry.rank === 1 ? '🏆 Champion' :
                   entry.rank === 2 ? '🥈 Runner-up' :
                   '🥉 Third Place'}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="px-6 py-12 text-center text-gray-500">
          <Crown className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No entries yet. Be the first to make the leaderboard!</p>
        </div>
      )}
    </div>
  );
};