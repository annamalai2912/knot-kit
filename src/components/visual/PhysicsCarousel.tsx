import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
  id: string;
  title: string;
  image: string;
  description: string;
}

interface PhysicsCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
}

export const PhysicsCarousel: React.FC<PhysicsCarouselProps> = ({
  items,
  autoPlay = false,
  interval = 4000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [momentum, setMomentum] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isDragging) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, isDragging]);

  // Physics animation
  useEffect(() => {
    if (momentum !== 0) {
      const animate = () => {
        setMomentum(prev => {
          const newMomentum = prev * 0.95; // Friction
          if (Math.abs(newMomentum) < 0.1) return 0;
          
          setDragOffset(prevOffset => {
            const newOffset = prevOffset + newMomentum;
            
            // Snap to nearest slide when momentum is low
            if (Math.abs(newMomentum) < 2) {
              const slideWidth = 300;
              const targetIndex = Math.round(-newOffset / slideWidth);
              const clampedIndex = Math.max(0, Math.min(items.length - 1, targetIndex));
              
              if (clampedIndex !== currentIndex) {
                setCurrentIndex(clampedIndex);
              }
              
              return -clampedIndex * slideWidth;
            }
            
            return newOffset;
          });
          
          return newMomentum;
        });
        
        if (momentum !== 0) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [momentum, currentIndex, items.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setMomentum(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const diff = e.clientX - dragStart;
    setDragOffset(diff);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const diff = e.clientX - dragStart;
    const velocity = diff * 0.1;
    setMomentum(velocity);
    
    // Determine if we should change slides
    if (Math.abs(diff) > 100) {
      if (diff > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    
    setDragOffset(0);
  };

  const getCardStyle = (index: number) => {
    const offset = index - currentIndex;
    const baseTransform = offset * 320 + (isDragging ? dragOffset : 0);
    const scale = Math.max(0.8, 1 - Math.abs(offset) * 0.1);
    const rotateY = offset * -15;
    const opacity = Math.max(0.3, 1 - Math.abs(offset) * 0.3);
    const zIndex = items.length - Math.abs(offset);

    return {
      transform: `translateX(${baseTransform}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      transition: isDragging ? 'none' : 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    };
  };

  return (
    <div className="relative w-full h-96 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg">
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ perspective: '1000px' }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="absolute w-72 h-80 bg-white rounded-xl shadow-lg overflow-hidden"
            style={getCardStyle(index)}
          >
            <div className="h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                draggable={false}
              />
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {item.description}
              </p>
            </div>

            {/* Card glow effect */}
            {index === currentIndex && (
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 rounded-xl pointer-events-none" />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg transition-all duration-200 z-10"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg transition-all duration-200 z-10"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-white shadow-lg scale-125'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Current Slide Info */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-10">
        {currentIndex + 1} / {items.length}
      </div>
    </div>
  );
};