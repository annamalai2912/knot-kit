import { useEffect, useState } from 'react';

export function useAnimation(duration: number = 1000) {
  const [isAnimating, setIsAnimating] = useState(false);

  const trigger = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), duration);
  };

  return { isAnimating, trigger };
}

export function useCounterAnimation(target: number, duration: number = 1000) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const increment = target / (duration / 16);
    let currentValue = 0;

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= target) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(currentValue));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return current;
}