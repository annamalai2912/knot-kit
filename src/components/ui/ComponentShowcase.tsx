import React, { useState } from 'react';
import { Code, ExternalLink, Heart } from 'lucide-react';

interface ComponentShowcaseProps {
  title: string;
  description: string;
  category: string;
  children: React.ReactNode;
  codeExample?: string;
}

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({
  title,
  description,
  category,
  children,
  codeExample
}) => {
  const [showCode, setShowCode] = useState(false);
  const [liked, setLiked] = useState(false);

  const categoryColors = {
    playful: 'bg-pink-100 text-pink-800',
    practical: 'bg-blue-100 text-blue-800',
    developer: 'bg-purple-100 text-purple-800',
    gamified: 'bg-green-100 text-green-800',
    visual: 'bg-yellow-100 text-yellow-800',
    ai: 'bg-indigo-100 text-indigo-800'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'
            }`}>
              {category}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-lg transition-colors ${
                liked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            </button>
            {codeExample && (
              <button
                onClick={() => setShowCode(!showCode)}
                className={`p-2 rounded-lg transition-colors ${
                  showCode ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <Code className="w-5 h-5" />
              </button>
            )}
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Component Demo */}
      <div className="p-6 bg-gray-50">
        <div className="flex items-center justify-center min-h-32">
          {children}
        </div>
      </div>

      {/* Code Example */}
      {showCode && codeExample && (
        <div className="border-t border-gray-200">
          <div className="p-4 bg-gray-900 text-gray-100 overflow-x-auto">
            <pre className="text-sm">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};