import React, { useState } from 'react';
import { Undo, Redo, RotateCcw, Clock } from 'lucide-react';
import { HistoryItem } from '../../types';

interface UndoRedoTimelineProps {
  history: HistoryItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  maxVisible?: number;
}

export const UndoRedoTimeline: React.FC<UndoRedoTimelineProps> = ({
  history,
  currentIndex,
  onNavigate,
  maxVisible = 10
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const handleUndo = () => {
    if (canUndo) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      onNavigate(currentIndex + 1);
    }
  };

  const handleTimelineClick = (index: number) => {
    onNavigate(index);
  };

  const visibleHistory = history.slice(
    Math.max(0, currentIndex - Math.floor(maxVisible / 2)),
    Math.min(history.length, currentIndex + Math.ceil(maxVisible / 2))
  );

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create': return '✨';
      case 'edit': return '✏️';
      case 'delete': return '🗑️';
      case 'move': return '📦';
      case 'copy': return '📋';
      default: return '⚡';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>History Timeline</span>
        </h3>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            className={`p-2 rounded-lg transition-colors ${
              canUndo 
                ? 'text-indigo-600 hover:bg-indigo-50' 
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <Undo className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            className={`p-2 rounded-lg transition-colors ${
              canRedo 
                ? 'text-indigo-600 hover:bg-indigo-50' 
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <Redo className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onNavigate(0)}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {visibleHistory.map((item, index) => {
            const actualIndex = history.indexOf(item);
            const isCurrent = actualIndex === currentIndex;
            const isPast = actualIndex < currentIndex;
            
            return (
              <div key={item.id} className="flex items-center space-x-2">
                <button
                  onClick={() => handleTimelineClick(actualIndex)}
                  className={`
                    relative flex-shrink-0 w-10 h-10 rounded-full border-2 
                    transition-all duration-200 flex items-center justify-center
                    ${isCurrent 
                      ? 'border-indigo-500 bg-indigo-100 scale-110' 
                      : isPast 
                        ? 'border-green-400 bg-green-50 hover:scale-105' 
                        : 'border-gray-300 bg-gray-50 hover:scale-105'
                    }
                  `}
                >
                  <span className="text-sm">
                    {getActionIcon(item.action)}
                  </span>
                  
                  {isCurrent && (
                    <div className="absolute -inset-1 border-2 border-indigo-300 rounded-full animate-pulse" />
                  )}
                </button>
                
                {index < visibleHistory.length - 1 && (
                  <div className={`
                    w-8 h-0.5 transition-colors duration-200
                    ${actualIndex < currentIndex ? 'bg-green-400' : 'bg-gray-300'}
                  `} />
                )}
              </div>
            );
          })}
        </div>

        {/* Current action details */}
        {history[currentIndex] && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  {history[currentIndex].action}
                </p>
                <p className="text-sm text-gray-600">
                  {history[currentIndex].timestamp.toLocaleString()}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                Step {currentIndex + 1} of {history.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};