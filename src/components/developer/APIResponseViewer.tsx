import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Search, Copy, Download } from 'lucide-react';

interface APIResponseViewerProps {
  data: any;
  title?: string;
}

export const APIResponseViewer: React.FC<APIResponseViewerProps> = ({
  data,
  title = "API Response"
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [view, setView] = useState<'tree' | 'raw'>('tree');

  const jsonString = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return filterObject(data, searchTerm.toLowerCase());
  }, [data, searchTerm]);

  const toggleExpanded = (key: string) => {
    const newExpanded = new Set(expandedKeys);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedKeys(newExpanded);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString);
  };

  const downloadJSON = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'api-response.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderValue = (value: any, key: string, path: string = '') => {
    const currentPath = path ? `${path}.${key}` : key;

    if (value === null) {
      return <span className="text-gray-400">null</span>;
    }

    if (typeof value === 'boolean') {
      return <span className={value ? 'text-green-600' : 'text-red-600'}>{String(value)}</span>;
    }

    if (typeof value === 'number') {
      return <span className="text-blue-600">{value}</span>;
    }

    if (typeof value === 'string') {
      return <span className="text-green-700">"{value}"</span>;
    }

    if (Array.isArray(value)) {
      const isExpanded = expandedKeys.has(currentPath);
      return (
        <div>
          <button
            onClick={() => toggleExpanded(currentPath)}
            className="flex items-center text-purple-600 hover:text-purple-800"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            Array[{value.length}]
          </button>
          {isExpanded && (
            <div className="ml-6 mt-2 space-y-1">
              {value.map((item, index) => (
                <div key={index} className="flex">
                  <span className="text-gray-500 mr-2">{index}:</span>
                  {renderValue(item, String(index), currentPath)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (typeof value === 'object') {
      const isExpanded = expandedKeys.has(currentPath);
      const keys = Object.keys(value);
      
      return (
        <div>
          <button
            onClick={() => toggleExpanded(currentPath)}
            className="flex items-center text-purple-600 hover:text-purple-800"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            Object {keys.length > 0 && `{${keys.length}}`}
          </button>
          {isExpanded && (
            <div className="ml-6 mt-2 space-y-1">
              {keys.map(objKey => (
                <div key={objKey} className="flex">
                  <span className="text-indigo-600 mr-2 font-medium">"{objKey}":</span>
                  {renderValue(value[objKey], objKey, currentPath)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return <span>{String(value)}</span>;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="flex items-center space-x-2">
            <div className="flex rounded-md overflow-hidden border">
              <button
                onClick={() => setView('tree')}
                className={`px-3 py-1 text-sm ${
                  view === 'tree' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Tree
              </button>
              <button
                onClick={() => setView('raw')}
                className={`px-3 py-1 text-sm ${
                  view === 'raw' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Raw
              </button>
            </div>
            <button
              onClick={copyToClipboard}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={downloadJSON}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {view === 'tree' && (
          <div className="mt-3 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search keys and values..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {view === 'tree' ? (
          <div className="font-mono text-sm space-y-1">
            {Object.keys(filteredData).map(key => (
              <div key={key} className="flex">
                <span className="text-indigo-600 mr-2 font-medium">"{key}":</span>
                {renderValue(filteredData[key], key)}
              </div>
            ))}
          </div>
        ) : (
          <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto bg-gray-50 p-4 rounded">
            {jsonString}
          </pre>
        )}
      </div>
    </div>
  );
};

function filterObject(obj: any, searchTerm: string): any {
  if (typeof obj !== 'object' || obj === null) {
    return String(obj).toLowerCase().includes(searchTerm) ? obj : undefined;
  }

  if (Array.isArray(obj)) {
    const filtered = obj.map(item => filterObject(item, searchTerm)).filter(item => item !== undefined);
    return filtered.length > 0 ? filtered : undefined;
  }

  const filtered: any = {};
  let hasMatch = false;

  for (const [key, value] of Object.entries(obj)) {
    if (key.toLowerCase().includes(searchTerm)) {
      filtered[key] = value;
      hasMatch = true;
    } else {
      const filteredValue = filterObject(value, searchTerm);
      if (filteredValue !== undefined) {
        filtered[key] = filteredValue;
        hasMatch = true;
      }
    }
  }

  return hasMatch ? filtered : undefined;
}