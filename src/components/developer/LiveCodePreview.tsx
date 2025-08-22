import React, { useState, useEffect } from 'react';
import { Play, Code, Eye, Copy, Download, RefreshCw } from 'lucide-react';

interface LiveCodePreviewProps {
  initialCode?: string;
  language?: 'html' | 'css' | 'javascript' | 'react';
  theme?: 'light' | 'dark';
}

export const LiveCodePreview: React.FC<LiveCodePreviewProps> = ({
  initialCode = '<div>Hello World!</div>',
  language = 'html',
  theme = 'light'
}) => {
  const [code, setCode] = useState(initialCode);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const runCode = () => {
    setIsRunning(true);
    setError('');
    
    try {
      if (language === 'html') {
        setOutput(code);
      } else if (language === 'javascript') {
        // Create a safe execution environment
        const logs: string[] = [];
        const mockConsole = {
          log: (...args: any[]) => logs.push(args.join(' ')),
          error: (...args: any[]) => logs.push(`Error: ${args.join(' ')}`),
          warn: (...args: any[]) => logs.push(`Warning: ${args.join(' ')}`)
        };
        
        // Execute code in isolated context
        const func = new Function('console', code);
        func(mockConsole);
        
        setOutput(logs.join('\n') || 'Code executed successfully');
      } else if (language === 'css') {
        setOutput(`<div style="${code}">Styled Element</div>`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
    
    setTimeout(() => setIsRunning(false), 500);
  };

  useEffect(() => {
    if (language === 'html') {
      runCode();
    }
  }, [code, language]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = () => {
    const extension = language === 'javascript' ? 'js' : language;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetCode = () => {
    setCode(initialCode);
    setError('');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-medium text-gray-900">Live Code Preview</h3>
          <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
            {language.toUpperCase()}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {isRunning ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>Run</span>
          </button>
          
          <button
            onClick={copyCode}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
          
          <button
            onClick={downloadCode}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
          
          <button
            onClick={resetCode}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'code'
              ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white'
              : 'text-gray-600 hover:text-gray-800 bg-gray-50'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Code</span>
        </button>
        
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'preview'
              ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white'
              : 'text-gray-600 hover:text-gray-800 bg-gray-50'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Preview</span>
        </button>
      </div>

      {/* Content */}
      <div className="h-96">
        {activeTab === 'code' ? (
          <div className="h-full flex flex-col">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`flex-1 w-full p-4 font-mono text-sm resize-none border-none focus:outline-none ${
                theme === 'dark' ? 'bg-gray-900 text-green-400' : 'bg-white text-gray-800'
              }`}
              placeholder={`Enter your ${language} code here...`}
            />
            
            {error && (
              <div className="px-4 py-2 bg-red-50 border-t border-red-200 text-red-700 text-sm">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>
        ) : (
          <div className="h-full p-4 overflow-auto">
            {language === 'html' || language === 'css' ? (
              <div
                className="w-full h-full border border-gray-200 rounded"
                dangerouslySetInnerHTML={{ __html: output }}
              />
            ) : (
              <pre className="w-full h-full bg-gray-100 p-4 rounded font-mono text-sm overflow-auto">
                {output || 'Run the code to see output'}
              </pre>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
        <div className="flex items-center justify-between">
          <span>Lines: {code.split('\n').length} | Characters: {code.length}</span>
          <span>Language: {language.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};