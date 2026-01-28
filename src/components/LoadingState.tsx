'use client';

import { motion } from 'framer-motion';

interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingState({ 
  size = 'md',
  className = ''
}: LoadingStateProps) {
  // Size mapping
  const sizeMap = {
    sm: 40,
    md: 80,
    lg: 120,
  };
  
  const dotSize = {
    sm: 8,
    md: 12,
    lg: 16,
  };
  
  const baseSize = sizeMap[size];
  const dot = dotSize[size];
  const radius = baseSize / 3;
  
  // Create 6 nodes arranged in a circle
  const nodes = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    angle: (i * Math.PI * 2) / 6,
    x: Math.cos((i * Math.PI * 2) / 6) * radius,
    y: Math.sin((i * Math.PI * 2) / 6) * radius,
  }));
  
  // Gradient colors
  const gradientColors = [
    '#6366f1', // indigo
    '#8b5cf6', // violet
    '#06b6d4', // cyan
  ];

  // Animation variants for nodes with staggered timing
  const nodeVariants = {
    initial: { 
      scale: 0.5, 
      opacity: 0.3,
    },
    animate: (custom: number) => ({
      scale: [0.5, 1, 0.5],
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: custom * 0.15, // Stagger the animation
      }
    })
  };

  // Connection line animation
  const connectionVariants = {
    initial: { 
      pathLength: 0,
      opacity: 0,
    },
    animate: {
      pathLength: [0, 1, 0],
      opacity: [0, 0.4, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      }
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={baseSize}
        height={baseSize}
        viewBox={`0 0 ${baseSize} ${baseSize}`}
        className="overflow-visible"
      >
        {/* Define gradient */}
        <defs>
          <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientColors[0]} />
            <stop offset="50%" stopColor={gradientColors[1]} />
            <stop offset="100%" stopColor={gradientColors[2]} />
          </linearGradient>
          
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor={gradientColors[1]} stopOpacity="0.8" />
            <stop offset="100%" stopColor={gradientColors[1]} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center point */}
        <g transform={`translate(${baseSize / 2}, ${baseSize / 2})`}>
          {/* Connection lines between adjacent nodes */}
          {nodes.map((node, i) => {
            const nextNode = nodes[(i + 1) % nodes.length];
            return (
              <motion.line
                key={`line-${i}`}
                x1={node.x}
                y1={node.y}
                x2={nextNode.x}
                y2={nextNode.y}
                stroke="url(#loadingGradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                variants={connectionVariants}
                initial="initial"
                animate="animate"
                style={{ 
                  // Respect reduced motion preference
                  animation: 'var(--animation, running)',
                }}
              />
            );
          })}

          {/* Animated nodes */}
          {nodes.map((node, i) => (
            <g key={`node-${i}`}>
              {/* Glow effect */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={dot * 1.5}
                fill="url(#nodeGlow)"
                variants={nodeVariants}
                initial="initial"
                animate="animate"
                custom={i}
                style={{ 
                  animation: 'var(--animation, running)',
                }}
              />
              
              {/* Main node */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={dot / 2}
                fill="url(#loadingGradient)"
                variants={nodeVariants}
                initial="initial"
                animate="animate"
                custom={i}
                style={{ 
                  animation: 'var(--animation, running)',
                }}
              />
            </g>
          ))}

          {/* Center node */}
          <motion.circle
            cx={0}
            cy={0}
            r={dot / 2}
            fill={gradientColors[1]}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ 
              animation: 'var(--animation, running)',
            }}
          />
        </g>
      </svg>
      
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          svg {
            --animation: paused;
          }
        }
      `}</style>
    </div>
  );
}
