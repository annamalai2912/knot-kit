import React, { useState, useEffect } from 'react';
import { Copy, Clipboard, Trash2, Pin, Clock } from 'lucide-react';

interface ClipboardItem {
  id: string;
  content: string;
  timestamp: Date;
  pinned: boolean;
  type: 'text' | 'url' | 'email' | 'code';
}

interface ClipboardManagerProps {
  maxItems?: number;
}

export const ClipboardManager: React.FC<ClipboardManagerProps> = ({
  maxItems = 10
}) => {
  const [items, setItems] = useState<ClipboardItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const detectType = (content: string): ClipboardItem['type'] => {
    if (content.includes('http://') || content.includes('https://')) return 'url';
    if (content.includes('@') && content.includes('.')) return 'email';
    if (content.includes('{') || content.includes('function') || content.includes('const ')) return 'code';
    return 'text';
  };

  const addToClipboard = async (content: string) => {
    const newItem: ClipboardItem = {
      id: Date.now().toString(),
      content: content.trim(),
      timestamp: new Date(),
      pinned: false,
      type: detectType(content)
    };

    setItems(prev => {
      const filtered = prev.filter(item => item.content !== content);
      const updated = [newItem, ...filtered];
      return updated.slice(0, maxItems);
    });

    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // Move to top of list
      setItems(prev => {
        const item = prev.find(i => i.content === content);
        if (!item) return prev;
        
        const filtered = prev.filter(i => i.content !== content);
        return [{ ...item, timestamp: new Date() }, ...filtered];
      });
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const togglePin = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, pinned: !item.pinned } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getTypeIcon = (type: ClipboardItem['type']) => {
    switch (type) {
      case 'url': return '🔗';
      case 'email': return '📧';
      case 'code': return '💻';
      default: return '📝';
    }
  };

  const formatContent = (content: string, type: ClipboardItem['type']) => {
    if (content.length > 100) {
      return content.substring(0, 100) + '...';
    }
    return content;
  };

  const sortedItems = [...items].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors relative"
      >
        <Clipboard className="w-6 h-6" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Clipboard History</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="mt-3">
              <input
                type="text"
                placeholder="Add to clipboard..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const target = e.target as HTMLInputElement;
                    if (target.value.trim()) {
                      addToClipboard(target.value);
                      target.value = '';
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {sortedItems.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Clipboard className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No clipboard history yet</p>
              </div>
            ) : (
              sortedItems.map(item => (
                <div
                  key={item.id}
                  className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    item.pinned ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm">{getTypeIcon(item.type)}</span>
                        <span className="text-xs text-gray-500 capitalize">{item.type}</span>
                        {item.pinned && <Pin className="w-3 h-3 text-blue-500" />}
                      </div>
                      
                      <p className="text-sm text-gray-900 break-words font-mono">
                        {formatContent(item.content, item.type)}
                      </p>
                      
                      <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{item.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 ml-2">
                      <button
                        onClick={() => togglePin(item.id)}
                        className={`p-1 rounded transition-colors ${
                          item.pinned ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'
                        }`}
                      >
                        <Pin className="w-3 h-3" />
                      </button>
                      
                      <button
                        onClick={() => copyToClipboard(item.content)}
                        className="p-1 text-gray-400 hover:text-green-500 rounded transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};