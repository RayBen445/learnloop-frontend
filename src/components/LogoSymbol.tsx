'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface LogoSymbolProps {
  size?: number;
  className?: string;
}

export default function LogoSymbol({ size = 32, className = '' }: LogoSymbolProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate dot positions for a perfect circle
  const dotCount = 8;
  const radius = size * 0.35; // 35% of size for the ring radius
  const dotRadius = size * 0.06; // 6% of size for each dot
  
  const dots = Array.from({ length: dotCount }, (_, i) => {
    const angle = (i * 2 * Math.PI) / dotCount;
    return {
      // Final position (assembled)
      x: Math.cos(angle) * radius + size / 2,
      y: Math.sin(angle) * radius + size / 2,
      // Initial position (scattered - slightly away from center)
      initialX: Math.cos(angle) * radius * 1.5 + size / 2,
      initialY: Math.sin(angle) * radius * 1.5 + size / 2,
      // Stagger delay for animation
      delay: i * 0.05,
    };
  });

  return (
    <div
      className={`inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="LearnLoop logo"
      >
        {dots.map((dot, index) => (
          <motion.circle
            key={index}
            r={dotRadius}
            fill="currentColor"
            initial={{
              cx: dot.initialX,
              cy: dot.initialY,
              opacity: 0.3,
            }}
            animate={{
              cx: dot.x,
              cy: dot.y,
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
              delay: dot.delay,
              ease: [0.25, 0.1, 0.25, 1], // easeOut
            }}
            // Replay animation on hover
            {...(isHovered && {
              animate: {
                cx: [dot.x, dot.initialX, dot.x],
                cy: [dot.y, dot.initialY, dot.y],
                opacity: [1, 0.3, 1],
              },
              transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              },
            })}
          />
        ))}
      </svg>
    </div>
  );
}
