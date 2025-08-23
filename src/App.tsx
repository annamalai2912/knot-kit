import React, { useState } from 'react';
import { Search, Copy, Check, Code, Palette, Gamepad2, Wrench, Sparkles, Zap } from 'lucide-react';

// Import all components
import { ConfettiCheckbox } from './components/playful/ConfettiCheckbox';
import { EmojiMoodSlider } from './components/playful/EmojiMoodSlider';
import { CelebrationButton } from './components/playful/CelebrationButton';
import { ReactionMatrix } from './components/playful/ReactionMatrix';
import { BouncyToggle } from './components/playful/BouncyToggle';
import { RandomFactLoader } from './components/playful/RandomFactLoader';

import { PasswordFieldPro } from './components/practical/PasswordFieldPro';
import { NotificationCenter } from './components/practical/NotificationCenter';
import { UndoRedoTimeline } from './components/practical/UndoRedoTimeline';
import { ClipboardManager } from './components/practical/ClipboardManager';
import { MultiStepFormNavigator } from './components/practical/MultiStepFormNavigator';

import { APIResponseViewer } from './components/developer/APIResponseViewer';
import { SmartDiffViewer } from './components/developer/SmartDiffViewer';
import { LiveCodePreview } from './components/developer/LiveCodePreview';

import { XPProgressBar } from './components/gamified/XPProgressBar';
import { LeaderboardTable } from './components/gamified/LeaderboardTable';
import { AchievementBadges } from './components/gamified/AchievementBadges';
import { StreakTracker } from './components/gamified/StreakTracker';

import { GenerativeGradientBackground } from './components/visual/GenerativeGradientBackground';
import { StoryCardScroller } from './components/visual/StoryCardScroller';
import { PhysicsCarousel } from './components/visual/PhysicsCarousel';
import { InteractiveRoadmap } from './components/visual/InteractiveRoadmap';

import { sampleAPIData, sampleDiffData, sampleLeaderboard, sampleAchievements, sampleRoadmapItems } from './data/sampleData';

interface ComponentInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  component: React.ReactNode;
  code: string;
}

const categories = [
  { id: 'all', name: 'All Components', icon: Sparkles, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { id: 'playful', name: 'Playful & Fun', icon: Gamepad2, color: 'bg-gradient-to-r from-green-400 to-blue-500' },
  { id: 'practical', name: 'Practical UI', icon: Wrench, color: 'bg-gradient-to-r from-blue-500 to-indigo-600' },
  { id: 'developer', name: 'Developer Tools', icon: Code, color: 'bg-gradient-to-r from-gray-700 to-gray-900' },
  { id: 'gamified', name: 'Gamified', icon: Zap, color: 'bg-gradient-to-r from-yellow-400 to-orange-500' },
  { id: 'visual', name: 'Visual & Creative', icon: Palette, color: 'bg-gradient-to-r from-pink-500 to-rose-500' },
];

const components: ComponentInfo[] = [
  // Playful & Fun Components
  {
    id: 'confetti-checkbox',
    name: 'Confetti Checkbox',
    description: 'Checkbox that explodes confetti when checked',
    category: 'playful',
    component: <ConfettiCheckbox />,
    code: `import { ConfettiCheckbox } from './components/playful/ConfettiCheckbox';

<ConfettiCheckbox />`
  },
  {
    id: 'emoji-mood-slider',
    name: 'Emoji Mood Slider',
    description: 'Interactive slider that changes emoji faces based on value',
    category: 'playful',
    component: <EmojiMoodSlider />,
    code: `import { EmojiMoodSlider } from './components/playful/EmojiMoodSlider';

<EmojiMoodSlider />`
  },
  {
    id: 'celebration-button',
    name: 'Celebration Button',
    description: 'Button that creates fireworks animation on success',
    category: 'playful',
    component: <CelebrationButton />,
    code: `import { CelebrationButton } from './components/playful/CelebrationButton';

<CelebrationButton />`
  },
  {
    id: 'reaction-matrix',
    name: 'Reaction Matrix',
    description: 'Click to spawn floating animated reactions with physics',
    category: 'playful',
    component: <ReactionMatrix />,
    code: `import { ReactionMatrix } from './components/playful/ReactionMatrix';

<ReactionMatrix />`
  },
  {
    id: 'bouncy-toggle',
    name: 'Bouncy Toggle',
    description: 'Physics-based toggle switch with bounce animations',
    category: 'playful',
    component: <BouncyToggle />,
    code: `import { BouncyToggle } from './components/playful/BouncyToggle';

<BouncyToggle />`
  },
  {
    id: 'random-fact-loader',
    name: 'Random Fact Loader',
    description: 'Entertaining loader showing fun facts while waiting',
    category: 'playful',
    component: <RandomFactLoader />,
    code: `import { RandomFactLoader } from './components/playful/RandomFactLoader';

<RandomFactLoader />`
  },

  // Practical UI Components
  {
    id: 'password-field-pro',
    name: 'Password Field Pro',
    description: 'Advanced password input with strength meter and suggestions',
    category: 'practical',
    component: <PasswordFieldPro />,
    code: `import { PasswordFieldPro } from './components/practical/PasswordFieldPro';

<PasswordFieldPro />`
  },
  {
    id: 'notification-center',
    name: 'Notification Center',
    description: 'Grouped, snoozable, priority-based notifications',
    category: 'practical',
    component: <NotificationCenter />,
    code: `import { NotificationCenter } from './components/practical/NotificationCenter';

<NotificationCenter />`
  },
  {
    id: 'undo-redo-timeline',
    name: 'Undo/Redo Timeline',
    description: 'Visual history navigation with draggable timeline',
    category: 'practical',
    component: <UndoRedoTimeline />,
    code: `import { UndoRedoTimeline } from './components/practical/UndoRedoTimeline';

<UndoRedoTimeline />`
  },
  {
    id: 'clipboard-manager',
    name: 'Clipboard Manager',
    description: 'Smart clipboard history with type detection',
    category: 'practical',
    component: <ClipboardManager />,
    code: `import { ClipboardManager } from './components/practical/ClipboardManager';

<ClipboardManager />`
  },
  {
    id: 'multi-step-form',
    name: 'Multi-Step Form Navigator',
    description: 'Complex form progress with branching steps',
    category: 'practical',
    component: <MultiStepFormNavigator />,
    code: `import { MultiStepFormNavigator } from './components/practical/MultiStepFormNavigator';

<MultiStepFormNavigator />`
  },

  // Developer Tools
  {
    id: 'api-response-viewer',
    name: 'API Response Viewer',
    description: 'Pretty-print JSON with filters and search',
    category: 'developer',
    component: <APIResponseViewer data={sampleAPIData} />,
    code: `import { APIResponseViewer } from './components/developer/APIResponseViewer';

const sampleData = {
  users: [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
  ],
  meta: { total: 2, page: 1 }
};

<APIResponseViewer data={sampleData} />`
  },
  {
    id: 'smart-diff-viewer',
    name: 'Smart Diff Viewer',
    description: 'Advanced JSON/SQL/text comparison with highlights',
    category: 'developer',
    component: <SmartDiffViewer {...sampleDiffData} />,
    code: `import { SmartDiffViewer } from './components/developer/SmartDiffViewer';

<SmartDiffViewer 
  oldContent="const greeting = 'Hello World';"
  newContent="const greeting = 'Hello Universe';"
  language="javascript"
/>`
  },
  {
    id: 'live-code-preview',
    name: 'Live Code Preview',
    description: 'Interactive code editor with live execution',
    category: 'developer',
    component: <LiveCodePreview />,
    code: `import { LiveCodePreview } from './components/developer/LiveCodePreview';

<LiveCodePreview />`
  },

  // Gamified Components
  {
    id: 'xp-progress-bar',
    name: 'XP Progress Bar',
    description: 'Gamified progress meter with levels and animations',
    category: 'gamified',
    component: <XPProgressBar currentXP={750} level={5} />,
    code: `import { XPProgressBar } from './components/gamified/XPProgressBar';

<XPProgressBar currentXP={750} level={5} />`
  },
  {
    id: 'leaderboard-table',
    name: 'Leaderboard Table',
    description: 'Styled leaderboard with animated rank changes',
    category: 'gamified',
    component: <LeaderboardTable data={sampleLeaderboard} />,
    code: `import { LeaderboardTable } from './components/gamified/LeaderboardTable';

const leaderboardData = [
  { id: 1, name: "Alex Chen", score: 2450, rank: 1, change: 0 },
  { id: 2, name: "Sarah Johnson", score: 2380, rank: 2, change: 1 }
];

<LeaderboardTable data={leaderboardData} />`
  },
  {
    id: 'achievement-badges',
    name: 'Achievement Badges',
    description: 'Dynamic achievement system with unlock animations',
    category: 'gamified',
    component: <AchievementBadges achievements={sampleAchievements} />,
    code: `import { AchievementBadges } from './components/gamified/AchievementBadges';

const achievements = [
  { id: 1, name: "First Steps", description: "Complete your first task", unlocked: true, rarity: "common" },
  { id: 2, name: "Speed Demon", description: "Complete 10 tasks in one day", unlocked: false, rarity: "rare" }
];

<AchievementBadges achievements={achievements} />`
  },
  {
    id: 'streak-tracker',
    name: 'Streak Tracker',
    description: 'Visual habit tracking with motivational messages',
    category: 'gamified',
    component: <StreakTracker />,
    component: <StreakTracker streakData={sampleStreakData} />,
    code: `import { StreakTracker } from './components/gamified/StreakTracker';

const streakData = {
  currentStreak: 7,
  longestStreak: 15,
  weekData: [
    { day: 'Mon', completed: true, date: '2024-01-15' },
    { day: 'Tue', completed: true, date: '2024-01-16' }
  ]
};

<StreakTracker streakData={streakData} />`
  },

  // Visual & Creative Components
  {
    id: 'generative-gradient',
    name: 'Generative Gradient Background',
    description: 'Animated unique gradient generator with controls',
    category: 'visual',
    component: <GenerativeGradientBackground />,
    code: `import { GenerativeGradientBackground } from './components/visual/GenerativeGradientBackground';

<GenerativeGradientBackground />`
  },
  {
    id: 'story-card-scroller',
    name: 'Story Card Scroller',
    description: 'Instagram/TikTok-like story UI component',
    category: 'visual',
    component: <StoryCardScroller />,
    code: `import { StoryCardScroller } from './components/visual/StoryCardScroller';

<StoryCardScroller />`
  },
  {
    id: 'physics-carousel',
    name: '3D Physics Carousel',
    description: 'Interactive carousel with 3D transforms and momentum',
    category: 'visual',
    component: <PhysicsCarousel />,
    code: `import { PhysicsCarousel } from './components/visual/PhysicsCarousel';

<PhysicsCarousel />`
  },
  {
    id: 'interactive-roadmap',
    name: 'Interactive Roadmap',
    description: 'Draggable project timeline with multiple views',
    category: 'visual',
    component: <InteractiveRoadmap data={sampleRoadmapItems} />,
    component: <InteractiveRoadmap items={sampleRoadmapItems} />,
    code: `import { InteractiveRoadmap } from './components/visual/InteractiveRoadmap';

const roadmapItems = [
  { id: 1, title: "Project Setup", status: "completed", startDate: "2024-01-01", endDate: "2024-01-15" },
  { id: 2, title: "Development Phase", status: "in-progress", startDate: "2024-01-16", endDate: "2024-03-01" }
];

<InteractiveRoadmap items={roadmapItems} />`
  }
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredComponents = components.filter(component => {
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyCode = async (code: string, componentId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(componentId);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    UI Component Library
                  </h1>
                  <p className="text-sm text-gray-500">25+ Interactive Components</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="sticky top-16 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? `${category.color} text-white shadow-lg transform scale-105`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                  {category.id !== 'all' && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isActive ? 'bg-white/20' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {components.filter(c => c.category === category.id).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Components</p>
                <p className="text-2xl font-bold text-gray-900">{components.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interactive</p>
                <p className="text-2xl font-bold text-gray-900">100%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Copy Ready</p>
                <p className="text-2xl font-bold text-gray-900">✓</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Component Preview */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-200/50">
                <div className="flex items-center justify-center min-h-[200px]">
                  {component.component}
                </div>
              </div>
              
              {/* Component Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {component.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {component.description}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    categories.find(cat => cat.id === component.category)?.color || 'bg-gray-100'
                  } text-white`}>
                    {categories.find(cat => cat.id === component.category)?.name}
                  </span>
                </div>
                
                {/* Code Section */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Usage Code</span>
                    <button
                      onClick={() => copyCode(component.code, component.id)}
                      className="flex items-center space-x-1 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
                    >
                      {copiedCode === component.id ? (
                        <>
                          <Check className="w-3 h-3 text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                    <code>{component.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No components found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Built with React, TypeScript, and Tailwind CSS • Ready for production use
            </p>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <span className="text-sm text-gray-500">25+ Interactive Components</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">Copy-Paste Ready</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">TypeScript Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;