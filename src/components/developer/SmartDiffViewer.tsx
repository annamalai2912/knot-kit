import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Copy, Download } from 'lucide-react';

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged' | 'modified';
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
  highlight?: boolean;
}

interface SmartDiffViewerProps {
  oldContent: string;
  newContent: string;
  language?: 'json' | 'sql' | 'text' | 'javascript';
  title?: string;
}

export const SmartDiffViewer: React.FC<SmartDiffViewerProps> = ({
  oldContent,
  newContent,
  language = 'text',
  title = "Diff Viewer"
}) => {
  const [viewMode, setViewMode] = useState<'unified' | 'split'>('unified');
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [collapsedSections, setCollapsedSections] = useState<Set<number>>(new Set());

  const diffLines = useMemo(() => {
    const oldLines = oldContent.split('\n');
    const newLines = newContent.split('\n');
    const lines: DiffLine[] = [];

    // Simple diff algorithm (in production, use a proper diff library)
    let oldIndex = 0;
    let newIndex = 0;

    while (oldIndex < oldLines.length || newIndex < newLines.length) {
      const oldLine = oldLines[oldIndex];
      const newLine = newLines[newIndex];

      if (oldIndex >= oldLines.length) {
        // Only new lines left
        lines.push({
          type: 'added',
          newLineNumber: newIndex + 1,
          content: newLine
        });
        newIndex++;
      } else if (newIndex >= newLines.length) {
        // Only old lines left
        lines.push({
          type: 'removed',
          oldLineNumber: oldIndex + 1,
          content: oldLine
        });
        oldIndex++;
      } else if (oldLine === newLine) {
        // Lines are the same
        lines.push({
          type: 'unchanged',
          oldLineNumber: oldIndex + 1,
          newLineNumber: newIndex + 1,
          content: oldLine
        });
        oldIndex++;
        newIndex++;
      } else {
        // Lines are different - check if it's a modification or add/remove
        const nextOldLine = oldLines[oldIndex + 1];
        const nextNewLine = newLines[newIndex + 1];

        if (nextOldLine === newLine) {
          // Old line was removed
          lines.push({
            type: 'removed',
            oldLineNumber: oldIndex + 1,
            content: oldLine
          });
          oldIndex++;
        } else if (nextNewLine === oldLine) {
          // New line was added
          lines.push({
            type: 'added',
            newLineNumber: newIndex + 1,
            content: newLine
          });
          newIndex++;
        } else {
          // Line was modified
          lines.push({
            type: 'removed',
            oldLineNumber: oldIndex + 1,
            content: oldLine
          });
          lines.push({
            type: 'added',
            newLineNumber: newIndex + 1,
            content: newLine
          });
          oldIndex++;
          newIndex++;
        }
      }
    }

    return lines;
  }, [oldContent, newContent]);

  const stats = useMemo(() => {
    const added = diffLines.filter(line => line.type === 'added').length;
    const removed = diffLines.filter(line => line.type === 'removed').length;
    const modified = Math.min(added, removed);
    
    return { added: added - modified, removed: removed - modified, modified };
  }, [diffLines]);

  const toggleSection = (lineIndex: number) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(lineIndex)) {
      newCollapsed.delete(lineIndex);
    } else {
      newCollapsed.add(lineIndex);
    }
    setCollapsedSections(newCollapsed);
  };

  const getLineStyles = (type: DiffLine['type']) => {
    switch (type) {
      case 'added':
        return 'bg-green-50 border-l-4 border-green-400 text-green-800';
      case 'removed':
        return 'bg-red-50 border-l-4 border-red-400 text-red-800';
      case 'modified':
        return 'bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800';
      default:
        return 'bg-white hover:bg-gray-50';
    }
  };

  const copyDiff = () => {
    const diffText = diffLines
      .map(line => {
        const prefix = line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' ';
        return `${prefix} ${line.content}`;
      })
      .join('\n');
    
    navigator.clipboard.writeText(diffText);
  };

  const downloadDiff = () => {
    const diffText = diffLines
      .map(line => {
        const prefix = line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' ';
        return `${prefix} ${line.content}`;
      })
      .join('\n');
    
    const blob = new Blob([diffText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diff.patch';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <div className="flex items-center space-x-4 mt-1 text-sm">
              <span className="text-green-600">+{stats.added} additions</span>
              <span className="text-red-600">-{stats.removed} deletions</span>
              {stats.modified > 0 && (
                <span className="text-yellow-600">{stats.modified} modifications</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex rounded-md overflow-hidden border">
              <button
                onClick={() => setViewMode('unified')}
                className={`px-3 py-1 text-sm ${
                  viewMode === 'unified' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Unified
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1 text-sm ${
                  viewMode === 'split' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Split
              </button>
            </div>
            
            <button
              onClick={() => setShowLineNumbers(!showLineNumbers)}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              {showLineNumbers ? 'Hide' : 'Show'} Numbers
            </button>
            
            <button
              onClick={copyDiff}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
            >
              <Copy className="w-4 h-4" />
            </button>
            
            <button
              onClick={downloadDiff}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Diff Content */}
      <div className="font-mono text-sm">
        {viewMode === 'unified' ? (
          <div className="divide-y divide-gray-100">
            {diffLines.map((line, index) => (
              <div
                key={index}
                className={`flex items-center ${getLineStyles(line.type)} transition-colors`}
              >
                {showLineNumbers && (
                  <div className="flex-shrink-0 w-20 px-2 py-1 text-xs text-gray-500 bg-gray-100 border-r">
                    <span className="inline-block w-8 text-right">
                      {line.oldLineNumber || ''}
                    </span>
                    <span className="inline-block w-8 text-right ml-1">
                      {line.newLineNumber || ''}
                    </span>
                  </div>
                )}
                
                <div className="flex-1 px-4 py-1 overflow-x-auto">
                  <span className="inline-block w-4 text-center">
                    {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                  </span>
                  <span>{line.content}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 divide-x divide-gray-200">
            {/* Old Content */}
            <div className="divide-y divide-gray-100">
              <div className="px-4 py-2 bg-red-50 text-red-800 font-medium text-center">
                Original
              </div>
              {diffLines
                .filter(line => line.type === 'removed' || line.type === 'unchanged')
                .map((line, index) => (
                  <div key={index} className={`flex items-center ${getLineStyles(line.type)}`}>
                    {showLineNumbers && (
                      <div className="flex-shrink-0 w-12 px-2 py-1 text-xs text-gray-500 bg-gray-100 border-r">
                        {line.oldLineNumber}
                      </div>
                    )}
                    <div className="flex-1 px-4 py-1 overflow-x-auto">
                      {line.content}
                    </div>
                  </div>
                ))}
            </div>
            
            {/* New Content */}
            <div className="divide-y divide-gray-100">
              <div className="px-4 py-2 bg-green-50 text-green-800 font-medium text-center">
                Modified
              </div>
              {diffLines
                .filter(line => line.type === 'added' || line.type === 'unchanged')
                .map((line, index) => (
                  <div key={index} className={`flex items-center ${getLineStyles(line.type)}`}>
                    {showLineNumbers && (
                      <div className="flex-shrink-0 w-12 px-2 py-1 text-xs text-gray-500 bg-gray-100 border-r">
                        {line.newLineNumber}
                      </div>
                    )}
                    <div className="flex-1 px-4 py-1 overflow-x-auto">
                      {line.content}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};