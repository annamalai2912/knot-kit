import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, AlertCircle, Users, Target } from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned' | 'blocked';
  startDate: Date;
  endDate: Date;
  assignees: string[];
  dependencies: string[];
  progress: number;
}

interface InteractiveRoadmapProps {
  items: RoadmapItem[];
  onItemClick?: (item: RoadmapItem) => void;
  onItemDrag?: (itemId: string, newDate: Date) => void;
}

export const InteractiveRoadmap: React.FC<InteractiveRoadmapProps> = ({
  items,
  onItemClick,
  onItemDrag
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'kanban'>('timeline');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const getStatusColor = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'planned': return 'bg-gray-400';
      case 'blocked': return 'bg-red-500';
    }
  };

  const getStatusIcon = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'planned': return Target;
      case 'blocked': return AlertCircle;
    }
  };

  const getMonthsInRange = () => {
    const months = [];
    const start = new Date();
    start.setDate(1);
    
    for (let i = 0; i < 12; i++) {
      const month = new Date(start);
      month.setMonth(start.getMonth() + i);
      months.push(month);
    }
    
    return months;
  };

  const getItemPosition = (item: RoadmapItem) => {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const startOffset = (item.startDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
    const duration = (item.endDate.getTime() - item.startDate.getTime()) / (1000 * 60 * 60 * 24);
    
    return {
      left: `${(startOffset / 365) * 100}%`,
      width: `${(duration / 365) * 100}%`
    };
  };

  const handleItemClick = (item: RoadmapItem) => {
    setSelectedItem(selectedItem === item.id ? null : item.id);
    onItemClick?.(item);
  };

  const months = getMonthsInRange();

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-indigo-500" />
            <span>Project Roadmap</span>
          </h3>
          
          <div className="flex items-center space-x-4">
            <div className="flex rounded-md overflow-hidden border">
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1 text-sm ${
                  viewMode === 'timeline' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Timeline
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1 text-sm ${
                  viewMode === 'kanban' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Kanban
              </button>
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'timeline' ? (
        <div className="p-6">
          {/* Timeline Header */}
          <div className="flex border-b border-gray-200 mb-6">
            {months.map((month, index) => (
              <div key={index} className="flex-1 text-center py-2 text-sm font-medium text-gray-600">
                {month.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
              </div>
            ))}
          </div>

          {/* Timeline Items */}
          <div className="space-y-4">
            {items.map((item, index) => {
              const StatusIcon = getStatusIcon(item.status);
              const position = getItemPosition(item);
              const isSelected = selectedItem === item.id;

              return (
                <div key={item.id} className="relative">
                  <div className="flex items-center mb-2">
                    <div className="w-48 pr-4">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <StatusIcon className={`w-3 h-3 text-white`} />
                        <span className="text-xs text-gray-500 capitalize">
                          {item.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 relative h-8">
                      <div
                        className={`
                          absolute h-6 rounded-md cursor-pointer transition-all duration-200 flex items-center px-2
                          ${getStatusColor(item.status)} ${isSelected ? 'ring-2 ring-indigo-300 scale-105' : 'hover:scale-102'}
                        `}
                        style={position}
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="flex items-center justify-between w-full text-white text-xs">
                          <span className="truncate">{item.title}</span>
                          <span>{item.progress}%</span>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-30 rounded-b-md">
                          <div
                            className="h-full bg-white rounded-b-md transition-all duration-300"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isSelected && (
                    <div className="ml-48 bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-700 mb-3">{item.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Start Date:</span>
                          <span className="ml-2">{item.startDate.toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">End Date:</span>
                          <span className="ml-2">{item.endDate.toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Progress:</span>
                          <span className="ml-2">{item.progress}%</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Assignees:</span>
                          <span className="ml-2">{item.assignees.length}</span>
                        </div>
                      </div>

                      {item.assignees.length > 0 && (
                        <div className="mt-3">
                          <span className="text-sm font-medium text-gray-600">Team:</span>
                          <div className="flex items-center space-x-2 mt-1">
                            {item.assignees.slice(0, 3).map((assignee, i) => (
                              <div
                                key={i}
                                className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium"
                              >
                                {assignee.charAt(0).toUpperCase()}
                              </div>
                            ))}
                            {item.assignees.length > 3 && (
                              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
                                +{item.assignees.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-6">
          {/* Kanban View */}
          <div className="grid grid-cols-4 gap-6">
            {(['planned', 'in-progress', 'completed', 'blocked'] as const).map(status => (
              <div key={status} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-4 capitalize flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
                  <span>{status.replace('-', ' ')}</span>
                  <span className="text-sm text-gray-500">
                    ({items.filter(item => item.status === status).length})
                  </span>
                </h4>
                
                <div className="space-y-3">
                  {items
                    .filter(item => item.status === status)
                    .map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className="bg-white p-3 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <h5 className="font-medium text-gray-900 text-sm mb-1">
                          {item.title}
                        </h5>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {item.assignees.length}
                            </span>
                          </div>
                          
                          <div className="text-xs text-gray-500">
                            {item.progress}%
                          </div>
                        </div>
                        
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                          <div
                            className={`h-1 rounded-full ${getStatusColor(item.status)}`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};