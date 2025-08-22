import React, { useState, useEffect, useRef } from 'react';
import { Heart, Zap, Star, Smile, ThumbsUp, Siren as Fire } from 'lucide-react';

interface Reaction {
  id: string;
  type: string;
  x: number;
  y: number;
  velocity: { x: number; y: number };
  life: number;
  maxLife: number;
}

interface ReactionMatrixProps {
  width?: number;
  height?: number;
  maxReactions?: number;
}

export const ReactionMatrix: React.FC<ReactionMatrixProps> = ({
  width = 400,
  height = 300,
  maxReactions = 20
}) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const reactionTypes = [
    { icon: Heart, color: '#ef4444', name: 'heart' },
    { icon: Zap, color: '#eab308', name: 'zap' },
    { icon: Star, color: '#8b5cf6', name: 'star' },
    { icon: Smile, color: '#10b981', name: 'smile' },
    { icon: ThumbsUp, color: '#3b82f6', name: 'thumbs' },
    { icon: Fire, color: '#f97316', name: 'fire' }
  ];

  const createReaction = (x: number, y: number) => {
    const reactionType = reactionTypes[Math.floor(Math.random() * reactionTypes.length)];
    const newReaction: Reaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: reactionType.name,
      x,
      y,
      velocity: {
        x: (Math.random() - 0.5) * 4,
        y: -Math.random() * 3 - 2
      },
      life: 100,
      maxLife: 100
    };

    setReactions(prev => {
      const updated = [...prev, newReaction];
      return updated.slice(-maxReactions);
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createReaction(x, y);
  };

  useEffect(() => {
    const animate = () => {
      setReactions(prev => prev
        .map(reaction => ({
          ...reaction,
          x: reaction.x + reaction.velocity.x,
          y: reaction.y + reaction.velocity.y,
          velocity: {
            x: reaction.velocity.x * 0.98,
            y: reaction.velocity.y + 0.1
          },
          life: reaction.life - 1
        }))
        .filter(reaction => reaction.life > 0 && reaction.y < height + 50)
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [height]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        onClick={handleClick}
        className="relative border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 transition-colors bg-gradient-to-br from-blue-50 to-purple-50"
        style={{ width, height }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 pointer-events-none">
          <div className="text-center">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-sm">Click anywhere to create reactions!</p>
          </div>
        </div>

        {reactions.map(reaction => {
          const reactionType = reactionTypes.find(r => r.name === reaction.type);
          if (!reactionType) return null;
          
          const Icon = reactionType.icon;
          const opacity = reaction.life / reaction.maxLife;
          const scale = 0.5 + (reaction.life / reaction.maxLife) * 0.5;

          return (
            <div
              key={reaction.id}
              className="absolute pointer-events-none"
              style={{
                left: reaction.x,
                top: reaction.y,
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity,
                color: reactionType.color
              }}
            >
              <Icon className="w-6 h-6" />
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">Active reactions: {reactions.length}</p>
      </div>
    </div>
  );
};