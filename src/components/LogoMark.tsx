'use client';

import { motion } from 'framer-motion';

interface LogoMarkProps {
  size?: number;
  animate?: boolean;
  showText?: boolean;
  className?: string;
}

export default function LogoMark({ 
  size = 120, 
  animate = true, 
  showText = true,
  className = ''
}: LogoMarkProps) {
  const scale = size / 120; // Base size is 120

  // Animation variants for nodes (circles)
  const nodeVariants = {
    initial: (custom: number) => ({
      x: Math.cos(custom * Math.PI / 3) * 40,
      y: Math.sin(custom * Math.PI / 3) * 40,
      scale: 0.5,
      opacity: 0.3,
    }),
    converge: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96] as any, // Custom easing
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      }
    }
  };

  // Animation variants for connection lines
  const lineVariants = {
    initial: {
      pathLength: 0,
      opacity: 0,
    },
    converge: {
      pathLength: 1,
      opacity: 0.6,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeInOut" as const,
      }
    }
  };

  // Animation for the loop arc
  const loopVariants = {
    initial: {
      pathLength: 0,
      opacity: 0,
      rotate: -90,
    },
    converge: {
      pathLength: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96] as any,
      }
    }
  };

  // Text animation
  const textVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 1.3,
        ease: "easeOut" as const,
      }
    }
  };

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <div className={`inline-flex flex-col items-center gap-4 ${className}`}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="initial"
        animate={animate ? "converge" : "initial"}
        variants={containerVariants}
      >
        <defs>
          {/* Primary gradient definition */}
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" /> {/* indigo */}
            <stop offset="50%" stopColor="#8b5cf6" /> {/* violet */}
            <stop offset="100%" stopColor="#06b6d4" /> {/* cyan */}
          </linearGradient>
          
          {/* Glow filter for nodes */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Center point */}
        <g transform="translate(60, 60)">
          {/* Connection lines - forming a network */}
          <motion.path
            d="M -25 -15 L 0 0"
            stroke="url(#primaryGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={lineVariants}
          />
          <motion.path
            d="M 25 -15 L 0 0"
            stroke="url(#primaryGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={lineVariants}
          />
          <motion.path
            d="M 0 25 L 0 0"
            stroke="url(#primaryGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={lineVariants}
          />

          {/* Outer loop arc - representing the "loop" in LearnLoop */}
          <motion.path
            d="M -30 0 A 30 30 0 1 1 30 0 A 30 30 0 1 1 -30 0"
            stroke="url(#primaryGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            variants={loopVariants}
            style={{ transformOrigin: 'center' }}
          />

          {/* Network nodes - representing connections */}
          <motion.circle
            cx={-25}
            cy={-15}
            r="4"
            fill="url(#primaryGradient)"
            filter="url(#glow)"
            custom={0}
            variants={nodeVariants}
          />
          <motion.circle
            cx={25}
            cy={-15}
            r="4"
            fill="url(#primaryGradient)"
            filter="url(#glow)"
            custom={1}
            variants={nodeVariants}
          />
          <motion.circle
            cx={0}
            cy={25}
            r="4"
            fill="url(#primaryGradient)"
            filter="url(#glow)"
            custom={2}
            variants={nodeVariants}
          />

          {/* Central node - the convergence point */}
          <motion.circle
            cx={0}
            cy={0}
            r="6"
            fill="url(#primaryGradient)"
            filter="url(#glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={animate ? { 
              scale: 1, 
              opacity: 1,
            } : { scale: 0, opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.9,
              ease: "backOut",
            }}
          />
        </g>
      </motion.svg>

      {/* LearnLoop text */}
      {showText && (
        <motion.div
          initial="initial"
          animate={animate ? "show" : "initial"}
          variants={textVariants}
          className="text-xl font-bold tracking-tight text-gradient-primary"
        >
          LearnLoop
        </motion.div>
      )}
    </div>
  );
}
