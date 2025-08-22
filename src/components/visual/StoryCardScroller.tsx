import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  image: string;
  content: string;
  duration?: number;
}

interface StoryCardScrollerProps {
  stories: Story[];
  autoPlay?: boolean;
  onStoryChange?: (story: Story, index: number) => void;
}

export const StoryCardScroller: React.FC<StoryCardScrollerProps> = ({
  stories,
  autoPlay = false,
  onStoryChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<NodeJS.Timeout>();

  const currentStory = stories[currentIndex];
  const duration = currentStory?.duration || 5000;

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % stories.length;
    setCurrentIndex(nextIndex);
    setProgress(0);
    onStoryChange?.(stories[nextIndex], nextIndex);
  };

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? stories.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setProgress(0);
    onStoryChange?.(stories[prevIndex], prevIndex);
  };

  const goToStory = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    onStoryChange?.(stories[index], index);
  };

  useEffect(() => {
    if (isPlaying && stories.length > 1) {
      progressRef.current = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (duration / 100));
          if (newProgress >= 100) {
            goToNext();
            return 0;
          }
          return newProgress;
        });
      }, 100);
    } else {
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    }

    return () => {
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    };
  }, [isPlaying, currentIndex, duration, stories.length]);

  if (stories.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
        No stories available
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg bg-black group">
      {/* Main Story Display */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${currentStory.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Progress Bars */}
      <div className="absolute top-4 left-4 right-4 flex space-x-1 z-30">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Story Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
        <h3 className="text-xl font-bold text-white mb-2">{currentStory.title}</h3>
        <p className="text-gray-200 line-clamp-3">{currentStory.content}</p>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
        <button
          onClick={goToPrevious}
          className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>

        <button
          onClick={goToNext}
          className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Story Thumbnails */}
      <div 
        ref={scrollRef}
        className="absolute bottom-20 left-0 right-0 flex space-x-2 px-6 overflow-x-auto scrollbar-hide"
      >
        {stories.map((story, index) => (
          <button
            key={story.id}
            onClick={() => goToStory(index)}
            className={`flex-shrink-0 w-12 h-12 rounded-full border-2 overflow-hidden transition-all duration-200 ${
              index === currentIndex 
                ? 'border-white scale-110' 
                : 'border-white border-opacity-50 hover:border-opacity-100'
            }`}
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Story Counter */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm z-30">
        {currentIndex + 1} / {stories.length}
      </div>
    </div>
  );
};