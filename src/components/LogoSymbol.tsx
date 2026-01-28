'use client';

import { motion } from 'framer-motion';

interface LogoSymbolProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export default function LogoSymbol({ size = 32, className = '', animated = false }: LogoSymbolProps) {
  const scale = size / 60; // Base size is 60

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="LearnLoop logo"
    >
      <defs>
        {/* Primary gradient for the logo */}
        <linearGradient id={`logoGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" /> {/* indigo */}
          <stop offset="50%" stopColor="#8b5cf6" /> {/* violet */}
          <stop offset="100%" stopColor="#06b6d4" /> {/* cyan */}
        </linearGradient>
      </defs>

      {/* Center point */}
      <g transform="translate(30, 30)">
        {/* Connection lines */}
        <path
          d="M -12 -8 L 0 0"
          stroke={`url(#logoGradient-${size})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 12 -8 L 0 0"
          stroke={`url(#logoGradient-${size})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 0 12 L 0 0"
          stroke={`url(#logoGradient-${size})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Outer loop arc */}
        <path
          d="M -15 0 A 15 15 0 1 1 15 0 A 15 15 0 1 1 -15 0"
          stroke={`url(#logoGradient-${size})`}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Network nodes */}
        <circle cx={-12} cy={-8} r="2.5" fill={`url(#logoGradient-${size})`} />
        <circle cx={12} cy={-8} r="2.5" fill={`url(#logoGradient-${size})`} />
        <circle cx={0} cy={12} r="2.5" fill={`url(#logoGradient-${size})`} />

        {/* Central node */}
        <circle cx={0} cy={0} r="3.5" fill={`url(#logoGradient-${size})`} />
      </g>
    </svg>
  );
}
