import React, { useState } from 'react';
import { Palette, Code, Gamepad2, Wand2, Eye, Cpu, Menu, X } from 'lucide-react';
import { ComponentShowcase } from './components/ui/ComponentShowcase';
import { ConfettiCheckbox } from './components/playful/ConfettiCheckbox';
import { EmojiMoodSlider } from './components/playful/EmojiMoodSlider';
import { CelebrationButton } from './components/playful/CelebrationButton';
import { PasswordFieldPro } from './components/practical/PasswordFieldPro';
import { NotificationCenter } from './components/practical/NotificationCenter';
import { APIResponseViewer } from './components/developer/APIResponseViewer';
import { XPProgressBar } from './components/gamified/XPProgressBar';
import { LeaderboardTable } from './components/gamified/LeaderboardTable';
import { GenerativeGradientBackground } from './components/visual/GenerativeGradientBackground';
import { StoryCardScroller } from './components/visual/StoryCardScroller';
import { sampleNotifications, sampleLeaderboard, sampleStories, sampleAPIData } from './data/sampleData';
import { useLocalStorage } from './hooks/useLocalStorage';

const categories = [
  { id: 'all', name: 'All Components', icon: Eye, color: 'text-gray-600' },
  { id: 'playful', name: 'Playful & Fun', icon: Palette, color: 'text-pink-600' },
  { id: 'practical', name: 'Practical UI', icon: Code, color: 'text-blue-600' },
  { id: 'developer', name: 'Developer Tools', icon: Cpu, color: 'text-purple-600' },
  { id: 'gamified', name: 'Gamified', icon: Gamepad2, color: 'text-green-600' },
  { id: 'visual', name: 'Visual & Creative', icon: Wand2, color: 'text-yellow-600' }
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useLocalStorage('notifications', sampleNotifications);

  const handleNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleNotificationSnooze = (id: string, minutes: number) => {
    const snoozeTime = new Date(Date.now() + minutes * 60 * 1000);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, snoozed: snoozeTime } : n));
  };

  const handleNotificationDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const components = [
    {
      id: 'confetti-checkbox',
      category: 'playful',
      title: 'Confetti Checkbox',
      description: 'Interactive checkbox that explodes with confetti particles when checked',
      component: <ConfettiCheckbox label="Check me for confetti!" />
    },
    {
      id: 'emoji-mood-slider',
      category: 'playful',
      title: 'Emoji Mood Slider',
      description: 'Expressive slider that changes emoji faces based on the selected value',
      component: <EmojiMoodSlider defaultValue={2} />
    },
    {
      id: 'celebration-button',
      category: 'playful',
      title: 'Celebration Button',
      description: 'Button with fireworks animation that triggers on successful actions',
      component: <CelebrationButton variant="primary">🎉 Celebrate!</CelebrationButton>
    },
    {
      id: 'password-field-pro',
      category: 'practical',
      title: 'Password Field Pro',
      description: 'Advanced password input with strength meter and real-time suggestions',
      component: <PasswordFieldPro value={password} onChange={setPassword} />
    },
    {
      id: 'notification-center',
      category: 'practical',
      title: 'Notification Center+',
      description: 'Smart notification system with grouping, snoozing, and priority-based filtering',
      component: (
        <NotificationCenter
          notifications={notifications}
          onMarkAsRead={handleNotificationRead}
          onSnooze={handleNotificationSnooze}
          onDelete={handleNotificationDelete}
        />
      )
    },
    {
      id: 'api-response-viewer',
      category: 'developer',
      title: 'API Response Viewer',
      description: 'Interactive JSON viewer with search, filtering, and collapsible tree structure',
      component: <APIResponseViewer data={sampleAPIData} title="User API Response" />
    },
    {
      id: 'xp-progress-bar',
      category: 'gamified',
      title: 'XP Progress Bar',
      description: 'Gamified progress indicator with levels, ranks, and animated counters',
      component: <XPProgressBar currentXP={7500} targetXP={10000} level={15} />
    },
    {
      id: 'leaderboard-table',
      category: 'gamified',
      title: 'Leaderboard Table UI',
      description: 'Dynamic leaderboard with rank changes, avatars, and achievement highlights',
      component: <LeaderboardTable entries={sampleLeaderboard} currentUserId="3" />
    },
    {
      id: 'gradient-background',
      category: 'visual',
      title: 'Generative Gradient Background',
      description: 'AI-powered gradient generator with customizable patterns and export options',
      component: <GenerativeGradientBackground />
    },
    {
      id: 'story-card-scroller',
      category: 'visual',
      title: 'Story Card Scroller',
      description: 'Instagram/TikTok-style story viewer with auto-play and progress indicators',
      component: <StoryCardScroller stories={sampleStories} autoPlay={true} />
    }
  ];

  const filteredComponents = components.filter(
    component => selectedCategory === 'all' || component.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Component Library</h1>
                <p className="text-sm text-gray-600">25 Production-Ready Components</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${category.color}`} />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${category.color}`} />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Beautiful, Interactive Components
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive collection of 25 production-ready React components designed to elevate your web applications with stunning visuals and seamless interactions.
          </p>
        </div>

        {/* Component Grid */}
        <div className="grid gap-8 md:gap-12">
          {filteredComponents.map((component) => (
            <ComponentShowcase
              key={component.id}
              title={component.title}
              description={component.description}
              category={component.category}
            >
              {component.component}
            </ComponentShowcase>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-gray-200">
          <div className="text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-lg inline-block mb-4">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Install our component library and start building amazing user interfaces with these production-ready components.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 text-left max-w-md mx-auto">
              <code className="text-green-400 text-sm">
                npm install @your-org/ui-components
              </code>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;