import React, { useState, useEffect } from 'react';
import { Lightbulb, Smile, Zap } from 'lucide-react';

interface RandomFactLoaderProps {
  isLoading: boolean;
  duration?: number;
}

const facts = [
  "Honey never spoils! Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  "A group of flamingos is called a 'flamboyance' - how fitting!",
  "Octopuses have three hearts and blue blood. Two hearts pump blood to the gills, while the third pumps blood to the rest of the body.",
  "Bananas are berries, but strawberries aren't! Botanically speaking, berries must have seeds inside their flesh.",
  "A single cloud can weigh more than a million pounds, yet it floats in the sky!",
  "Wombat poop is cube-shaped! This helps prevent it from rolling away and marks their territory effectively.",
  "The shortest war in history lasted only 38-45 minutes between Britain and Zanzibar in 1896.",
  "A shrimp's heart is in its head, and it has 10 legs but walks on only 6 of them.",
  "Bubble wrap was originally invented as wallpaper, not packaging material!",
  "A group of pugs is called a 'grumble' - which perfectly describes their personality!"
];

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "Why don't eggs tell jokes? They'd crack each other up!",
  "What do you call a fake noodle? An impasta!",
  "Why did the scarecrow win an award? He was outstanding in his field!",
  "What do you call a bear with no teeth? A gummy bear!",
  "Why don't skeletons fight each other? They don't have the guts!",
  "What's the best thing about Switzerland? I don't know, but the flag is a big plus!"
];

export const RandomFactLoader: React.FC<RandomFactLoaderProps> = ({
  isLoading,
  duration = 3000
}) => {
  const [currentContent, setCurrentContent] = useState('');
  const [contentType, setContentType] = useState<'fact' | 'joke'>('fact');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    // Set random content
    const isFact = Math.random() > 0.5;
    setContentType(isFact ? 'fact' : 'joke');
    const content = isFact ? facts[Math.floor(Math.random() * facts.length)] : jokes[Math.floor(Math.random() * jokes.length)];
    setCurrentContent(content);

    // Animate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading, duration]);

  if (!isLoading) return null;

  const Icon = contentType === 'fact' ? Lightbulb : Smile;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="relative">
          <Icon className={`w-6 h-6 ${contentType === 'fact' ? 'text-yellow-500' : 'text-green-500'}`} />
          <div className="absolute -inset-1 bg-current opacity-20 rounded-full animate-ping" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {contentType === 'fact' ? 'Fun Fact' : 'Quick Joke'}
        </h3>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">
        {currentContent}
      </p>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Loading...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-100 ease-out rounded-full ${
              contentType === 'fact' ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                contentType === 'fact' ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{
                animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};