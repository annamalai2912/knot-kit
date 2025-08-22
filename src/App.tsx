'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';

import ComponentShowcase from './components/ui/ComponentShowcase';

// Playful
import ConfettiCheckbox from './components/playful/ConfettiCheckbox';
import EmojiMoodSlider from './components/playful/EmojiMoodSlider';
import CelebrationButton from './components/playful/CelebrationButton';
import ReactionMatrix from './components/playful/ReactionMatrix';
import BouncyToggle from './components/playful/BouncyToggle';
import RandomFactLoader from './components/playful/RandomFactLoader';

// Practical
import PasswordFieldPro from './components/practical/PasswordFieldPro';
import NotificationCenter from './components/practical/NotificationCenter';
import UndoRedoTimeline from './components/practical/UndoRedoTimeline';
import ClipboardManager from './components/practical/ClipboardManager';
import MultiStepFormNavigator from './components/practical/MultiStepFormNavigator';

// Developer
import APIResponseViewer from './components/developer/APIResponseViewer';
import SmartDiffViewer from './components/developer/SmartDiffViewer';
import LiveCodePreview from './components/developer/LiveCodePreview';

// Gamified
import XPProgressBar from './components/gamified/XPProgressBar';
import LeaderboardTable from './components/gamified/LeaderboardTable';
import AchievementBadges from './components/gamified/AchievementBadges';
import StreakTracker from './components/gamified/StreakTracker';

// Visual
import GenerativeGradientBackground from './components/visual/GenerativeGradientBackground';
import StoryCardScroller from './components/visual/StoryCardScroller';
import PhysicsCarousel from './components/visual/PhysicsCarousel';
import InteractiveRoadmap from './components/visual/InteractiveRoadmap';

// Sample data
import { leaderboardData, apiResponse, diffData, roadmapData } from './data/sampleData';

// Reusable showcase wrapper
const Showcase = ({ title, component, code }: { title: string; component: JSX.Element; code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-2xl shadow-md bg-white p-6 flex flex-col items-start gap-4"
    >
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="w-full flex justify-center items-center min-h-[120px]">{component}</div>
      <button
        onClick={copyCode}
        className="flex items-center gap-2 px-3 py-1 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm"
      >
        <Copy size={16} /> {copied ? 'Copied!' : 'Copy Code'}
      </button>
    </motion.div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero */}
      <header className="text-center py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow">
        <h1 className="text-4xl font-bold mb-4">✨ Interactive UI Component Library</h1>
        <p className="text-lg opacity-80">42+ production-ready React components with physics, animations & Apple-level design.</p>
      </header>

      {/* Sections */}
      <main className="px-6 md:px-16 py-12 space-y-20">
        {/* Playful */}
        <section>
          <h2 className="text-2xl font-bold mb-6">🎉 Playful Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Showcase title="Confetti Checkbox" component={<ConfettiCheckbox />} code={`<ConfettiCheckbox />`} />
            <Showcase title="Emoji Mood Slider" component={<EmojiMoodSlider />} code={`<EmojiMoodSlider />`} />
            <Showcase title="Celebration Button" component={<CelebrationButton />} code={`<CelebrationButton />`} />
            <Showcase title="Reaction Matrix" component={<ReactionMatrix />} code={`<ReactionMatrix />`} />
            <Showcase title="Bouncy Toggle" component={<BouncyToggle />} code={`<BouncyToggle />`} />
            <Showcase title="Random Fact Loader" component={<RandomFactLoader />} code={`<RandomFactLoader />`} />
          </div>
        </section>

        {/* Practical */}
        <section>
          <h2 className="text-2xl font-bold mb-6">🛠 Practical Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Showcase title="Password Field Pro" component={<PasswordFieldPro />} code={`<PasswordFieldPro />`} />
            <Showcase title="Notification Center" component={<NotificationCenter />} code={`<NotificationCenter />`} />
            <Showcase title="Undo/Redo Timeline" component={<UndoRedoTimeline />} code={`<UndoRedoTimeline />`} />
            <Showcase title="Clipboard Manager" component={<ClipboardManager />} code={`<ClipboardManager />`} />
            <Showcase title="Multi-Step Form Navigator" component={<MultiStepFormNavigator />} code={`<MultiStepFormNavigator />`} />
          </div>
        </section>

        {/* Developer */}
        <section>
          <h2 className="text-2xl font-bold mb-6">💻 Developer Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Showcase title="API Response Viewer" component={<APIResponseViewer data={apiResponse} />} code={`<APIResponseViewer data={apiResponse} />`} />
            <Showcase title="Smart Diff Viewer" component={<SmartDiffViewer diffs={diffData} />} code={`<SmartDiffViewer diffs={diffData} />`} />
            <Showcase title="Live Code Preview" component={<LiveCodePreview />} code={`<LiveCodePreview />`} />
          </div>
        </section>

        {/* Gamified */}
        <section>
          <h2 className="text-2xl font-bold mb-6">🏆 Gamified Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Showcase title="XP Progress Bar" component={<XPProgressBar progress={65} />} code={`<XPProgressBar progress={65} />`} />
            <Showcase title="Leaderboard Table" component={<LeaderboardTable data={leaderboardData} />} code={`<LeaderboardTable data={leaderboardData} />`} />
            <Showcase title="Achievement Badges" component={<AchievementBadges />} code={`<AchievementBadges />`} />
            <Showcase title="Streak Tracker" component={<StreakTracker days={12} />} code={`<StreakTracker days={12} />`} />
          </div>
        </section>

        {/* Visual */}
        <section>
          <h2 className="text-2xl font-bold mb-6">🌈 Visual Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Showcase title="Generative Gradient Background" component={<GenerativeGradientBackground />} code={`<GenerativeGradientBackground />`} />
            <Showcase title="Story Card Scroller" component={<StoryCardScroller />} code={`<StoryCardScroller />`} />
            <Showcase title="Physics Carousel" component={<PhysicsCarousel />} code={`<PhysicsCarousel />`} />
            <Showcase title="Interactive Roadmap" component={<InteractiveRoadmap data={roadmapData} />} code={`<InteractiveRoadmap data={roadmapData} />`} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        Built with ❤️ using React, TypeScript, and Framer Motion · © 2025
      </footer>
    </div>
  );
}




