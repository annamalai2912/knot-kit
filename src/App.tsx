import React, { useState } from 'react';
import { Palette, Code, Gamepad2, Wand2, Eye, Cpu, Menu, X, Sparkles } from 'lucide-react';
import { ComponentShowcase } from './components/ui/ComponentShowcase';
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
import { 
  sampleNotifications, 
  sampleLeaderboard, 
  sampleStories, 
  sampleAPIData,
  sampleHistoryData,
  sampleAchievements,
  sampleStreakData,
  sampleCarouselItems,
  sampleRoadmapItems,
  sampleFormSteps
} from './data/sampleData';
import { useLocalStorage } from './hooks/useLocalStorage';

const categories = [
  { id: 'all', name: 'All Components', icon: Eye, color: 'text-gray-600' },
  { id: 'playful', name: 'Playful & Fun', icon: Palette, color: 'text-pink-600' },
  { id: 'practical', name: 'Practical UI', icon: Code, color: 'text-blue-600' },
  { id: 'developer', name: 'Developer Tools', icon: Cpu, color: 'text-purple-600' },
  { id: 'gamified', name: 'Gamified', icon: Gamepad2, color: 'text-green-600' },
  { id: 'visual', name: 'Visual & Creative', icon: Wand2, color: 'text-yellow-600' },
  { id: 'physics', name: 'Physics & Motion', icon: Sparkles, color: 'text-indigo-600' }
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(2);
  const [currentFormStep, setCurrentFormStep] = useState('preferences');
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

  const handleHistoryNavigate = (index: number) => {
    setCurrentHistoryIndex(index);
  };

  const handleFormStepChange = (stepId: string) => {
    setCurrentFormStep(stepId);
  };

  const toggleLoading = () => {
    setIsLoading(!isLoading);

  const components = [
    {
      id: 'confetti-checkbox',
      category: 'playful',
      title: 'Confetti Checkbox',
      description: 'Interactive checkbox that explodes with confetti particles when checked',
      component: <ConfettiCheckbox label="Check me for confetti!" />,
      code: `import { ConfettiCheckbox } from './components/playful/ConfettiCheckbox';

<ConfettiCheckbox 
  label="Check me for confetti!" 
  onChange={(checked) => console.log(checked)}
/>`
    },
    {
      id: 'emoji-mood-slider',
      category: 'playful',
      title: 'Emoji Mood Slider',
      description: 'Expressive slider that changes emoji faces based on the selected value',
      component: <EmojiMoodSlider defaultValue={2} />,
      code: `import { EmojiMoodSlider } from './components/playful/EmojiMoodSlider';

<EmojiMoodSlider 
  defaultValue={2}
  onChange={(value, mood) => console.log(value, mood)}
/>`
    },
    {
      id: 'celebration-button',
      category: 'playful',
      title: 'Celebration Button',
      description: 'Button with fireworks animation that triggers on successful actions',
      component: <CelebrationButton variant="primary">🎉 Celebrate!</CelebrationButton>,
      code: `import { CelebrationButton } from './components/playful/CelebrationButton';

<CelebrationButton 
  variant="primary"
  onClick={() => console.log('Celebrated!')}
>
  🎉 Celebrate!
</CelebrationButton>`
    },
    {
      id: 'reaction-matrix',
      category: 'playful',
      title: 'Reaction Matrix',
      description: 'Interactive area that spawns floating animated reactions on click',
      component: <ReactionMatrix width={350} height={200} />,
      code: `import { ReactionMatrix } from './components/playful/ReactionMatrix';

<ReactionMatrix 
  width={400}
  height={300}
  maxReactions={20}
/>`
    },
    {
      id: 'bouncy-toggle',
      category: 'playful',
      title: 'Bouncy Toggle Switch',
      description: 'Toggle switch with physics-based bounce animation',
      component: <BouncyToggle label="Enable notifications" size="lg" />,
      code: `import { BouncyToggle } from './components/playful/BouncyToggle';

<BouncyToggle 
  label="Enable notifications"
  size="lg"
  onChange={(checked) => console.log(checked)}
/>`
    },
    {
      id: 'random-fact-loader',
      category: 'playful',
      title: 'Random Fact Loader',
      description: 'Entertaining loader that shows fun facts and jokes while waiting',
      component: (
        <div className="space-y-4">
          <button 
            onClick={toggleLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {isLoading ? 'Stop Loading' : 'Start Loading'}
          </button>
          <RandomFactLoader isLoading={isLoading} duration={3000} />
        </div>
      ),
      code: `import { RandomFactLoader } from './components/playful/RandomFactLoader';

<RandomFactLoader 
  isLoading={true}
  duration={3000}
/>`
    },
    {
      id: 'password-field-pro',
      category: 'practical',
      title: 'Password Field Pro',
      description: 'Advanced password input with strength meter and real-time suggestions',
      component: <PasswordFieldPro value={password} onChange={setPassword} />,
      code: `import { PasswordFieldPro } from './components/practical/PasswordFieldPro';

<PasswordFieldPro 
  value={password}
  onChange={setPassword}
  showStrengthMeter={true}
  showSuggestions={true}
/>`
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
      ),
      code: `import { NotificationCenter } from './components/practical/NotificationCenter';

<NotificationCenter
  notifications={notifications}
  onMarkAsRead={(id) => markAsRead(id)}
  onSnooze={(id, minutes) => snoozeNotification(id, minutes)}
  onDelete={(id) => deleteNotification(id)}
/>`
    },
    {
      id: 'undo-redo-timeline',
      category: 'practical',
      title: 'Undo/Redo Timeline',
      description: 'Visual timeline for navigating through action history with undo/redo functionality',
      component: (
        <UndoRedoTimeline
          history={sampleHistoryData}
          currentIndex={currentHistoryIndex}
          onNavigate={handleHistoryNavigate}
        />
      ),
      code: `import { UndoRedoTimeline } from './components/practical/UndoRedoTimeline';

<UndoRedoTimeline
  history={historyItems}
  currentIndex={currentIndex}
  onNavigate={(index) => setCurrentIndex(index)}
/>`
    },
    {
      id: 'clipboard-manager',
      category: 'practical',
      title: 'Clipboard Manager',
      description: 'Smart clipboard history manager with pinning and type detection',
      component: <ClipboardManager maxItems={10} />,
      code: `import { ClipboardManager } from './components/practical/ClipboardManager';

<ClipboardManager maxItems={10} />`
    },
    {
      id: 'multi-step-form',
      category: 'practical',
      title: 'Multi-Step Form Navigator',
      description: 'Visual progress tracker for complex forms with branching steps',
      component: (
        <MultiStepFormNavigator
          steps={sampleFormSteps}
          currentStepId={currentFormStep}
          onStepChange={handleFormStepChange}
        />
      ),
      code: `import { MultiStepFormNavigator } from './components/practical/MultiStepFormNavigator';

<MultiStepFormNavigator
  steps={formSteps}
  currentStepId={currentStep}
  onStepChange={(stepId) => setCurrentStep(stepId)}
  allowSkip={false}
/>`
    },
    {
      id: 'api-response-viewer',
      category: 'developer',
      title: 'API Response Viewer',
      description: 'Interactive JSON viewer with search, filtering, and collapsible tree structure',
      component: <APIResponseViewer data={sampleAPIData} title="User API Response" />,
      code: `import { APIResponseViewer } from './components/developer/APIResponseViewer';

<APIResponseViewer 
  data={apiResponse}
  title="API Response"
/>`
    },
    {
      id: 'smart-diff-viewer',
      category: 'developer',
      title: 'Smart Diff Viewer',
      description: 'Advanced diff viewer for JSON, SQL, and text with collapsible sections',
      component: (
        <SmartDiffViewer
          oldContent={`{
  "name": "John Doe",
  "age": 30,
  "city": "New York"
}`}
          newContent={`{
  "name": "John Smith",
  "age": 31,
  "city": "San Francisco",
  "country": "USA"
}`}
          language="json"
          title="Configuration Changes"
        />
      ),
      code: `import { SmartDiffViewer } from './components/developer/SmartDiffViewer';

<SmartDiffViewer
  oldContent={oldCode}
  newContent={newCode}
  language="json"
  title="Code Changes"
/>`
    },
    {
      id: 'live-code-preview',
      category: 'developer',
      title: 'Live Code Preview',
      description: 'Interactive code editor with live preview and execution',
      component: (
        <LiveCodePreview
          initialCode="console.log('Hello, World!');"
          language="javascript"
        />
      ),
      code: `import { LiveCodePreview } from './components/developer/LiveCodePreview';

<LiveCodePreview
  initialCode="console.log('Hello!');"
  language="javascript"
  theme="light"
/>`
    },
    {
      id: 'xp-progress-bar',
      category: 'gamified',
      title: 'XP Progress Bar',
      description: 'Gamified progress indicator with levels, ranks, and animated counters',
      component: <XPProgressBar currentXP={7500} targetXP={10000} level={15} />,
      code: `import { XPProgressBar } from './components/gamified/XPProgressBar';

<XPProgressBar 
  currentXP={7500}
  targetXP={10000}
  level={15}
  showAnimation={true}
/>`
    },
    {
      id: 'leaderboard-table',
      category: 'gamified',
      title: 'Leaderboard Table UI',
      description: 'Dynamic leaderboard with rank changes, avatars, and achievement highlights',
      component: <LeaderboardTable entries={sampleLeaderboard} currentUserId="3" />,
      code: `import { LeaderboardTable } from './components/gamified/LeaderboardTable';

<LeaderboardTable 
  entries={leaderboardData}
  currentUserId="user123"
  showChange={true}
/>`
    },
    {
      id: 'achievement-badges',
      category: 'gamified',
      title: 'Achievement Badges',
      description: 'Dynamic achievement system with rarity levels and unlock animations',
      component: <AchievementBadges achievements={sampleAchievements} showProgress={true} />,
      code: `import { AchievementBadges } from './components/gamified/AchievementBadges';

<AchievementBadges 
  achievements={achievements}
  onAchievementClick={(achievement) => showDetails(achievement)}
  showProgress={true}
/>`
    },
    {
      id: 'streak-tracker',
      category: 'gamified',
      title: 'Streak Tracker',
      description: 'Visual streak counter for habits and daily activities with motivational messages',
      component: <StreakTracker streakData={sampleStreakData} title="Daily Coding" />,
      code: `import { StreakTracker } from './components/gamified/StreakTracker';

<StreakTracker 
  streakData={streakData}
  title="Daily Streak"
  onActivityToggle={(date) => toggleActivity(date)}
/>`
    },
    {
      id: 'gradient-background',
      category: 'visual',
      title: 'Generative Gradient Background',
      description: 'AI-powered gradient generator with customizable patterns and export options',
      component: <GenerativeGradientBackground />,
      code: `import { GenerativeGradientBackground } from './components/visual/GenerativeGradientBackground';

<GenerativeGradientBackground 
  autoChange={true}
  interval={5000}
/>`
    },
    {
      id: 'story-card-scroller',
      category: 'visual',
      title: 'Story Card Scroller',
      description: 'Instagram/TikTok-style story viewer with auto-play and progress indicators',
      component: <StoryCardScroller stories={sampleStories} autoPlay={true} />,
      code: `import { StoryCardScroller } from './components/visual/StoryCardScroller';

<StoryCardScroller 
  stories={stories}
  autoPlay={true}
  onStoryChange={(story, index) => handleStoryChange(story, index)}
/>`
    },
    {
      id: 'physics-carousel',
      category: 'physics',
      title: '3D Physics Carousel',
      description: 'Interactive carousel with 3D transforms, physics-based dragging, and momentum',
      component: <PhysicsCarousel items={sampleCarouselItems} autoPlay={false} />,
      code: `import { PhysicsCarousel } from './components/visual/PhysicsCarousel';

<PhysicsCarousel 
  items={carouselItems}
  autoPlay={false}
  interval={4000}
/>`
    },
    {
      id: 'interactive-roadmap',
      category: 'visual',
      title: 'Interactive Roadmap',
      description: 'Draggable project timeline with Gantt-style visualization and Kanban view',
      component: <InteractiveRoadmap items={sampleRoadmapItems} />,
      code: `import { InteractiveRoadmap } from './components/visual/InteractiveRoadmap';

<InteractiveRoadmap 
  items={roadmapItems}
  onItemClick={(item) => showDetails(item)}
  onItemDrag={(itemId, newDate) => updateItem(itemId, newDate)}
/>`
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>42 Production-Ready Components</span>
          </div>
          
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Beautiful, Interactive<br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              UI Components
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            A comprehensive collection of production-ready React components featuring physics-based animations, 
            AI-powered interactions, and modern design patterns. Copy, paste, and customize for your projects.
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>TypeScript Ready</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Fully Responsive</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Copy-Paste Ready</span>
            </div>
          </div>
        </div>

        {/* Component Grid */}
        <div className="space-y-16">
          {filteredComponents.map((component) => (
            <ComponentShowcase
              key={component.id}
              title={component.title}
              description={component.description}
              category={component.category}
              codeExample={component.code}
            >
              {component.component}
            </ComponentShowcase>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No components found</h3>
            <p className="text-gray-600">Try selecting a different category or view all components.</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-24 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-lg inline-block mb-4">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Copy any component code and start building amazing user interfaces. All components are production-ready 
              and fully customizable.
            </p>
            <div className="bg-gray-900 rounded-lg p-6 text-left max-w-lg mx-auto mb-8">
              <code className="text-green-400 text-sm">
                # Copy any component from above<br/>
                # Paste into your React project<br/>
                # Customize and enjoy! 🎉
              </code>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Copy & Paste</h4>
                <p className="text-sm text-gray-600">Click the code button on any component to copy the implementation</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Customize</h4>
                <p className="text-sm text-gray-600">Modify colors, animations, and behavior to match your design system</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Ship Fast</h4>
                <p className="text-sm text-gray-600">Production-ready components that work out of the box</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;