"use client";

import { useState, useEffect } from 'react';

interface BirthdayCountdownProps {
  countdownText: string;
}

const AnimatedCounter = ({ value, label }: { value: number; label: string }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    // No animation if the value is 0
    if (value === 0) {
      setCurrentValue(0);
      return;
    }
    
    const animationDuration = 1500; // 1.5 seconds for a smoother feel
    const frameDuration = 1000 / 60; // 60 fps
    const totalFrames = Math.round(animationDuration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // easeOutExpo easing function for a more dramatic effect
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const animatedValue = Math.round(value * easedProgress);
      
      setCurrentValue(animatedValue);

      if (frame === totalFrames) {
        clearInterval(counter);
        setCurrentValue(value); // Ensure it ends on the exact value
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg text-center w-24 h-24">
      <span className="text-3xl font-bold text-primary">{currentValue}</span>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
};

export function BirthdayCountdown({ countdownText }: BirthdayCountdownProps) {
  const parseCountdown = (text: string) => {
    const monthsMatch = text.match(/(\d+)\s+Bulan/);
    const daysMatch = text.match(/(\d+)\s+Hari/);
    
    const months = monthsMatch ? parseInt(monthsMatch[1], 10) : 0;
    const days = daysMatch ? parseInt(daysMatch[1], 10) : 0;
    
    return { months, days };
  };

  const { months, days } = parseCountdown(countdownText);

  return (
    <div className="flex items-center justify-center space-x-4">
      <AnimatedCounter value={months} label="Bulan" />
      <AnimatedCounter value={days} label="Hari" />
    </div>
  );
}
