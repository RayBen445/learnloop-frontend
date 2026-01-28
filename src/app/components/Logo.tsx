interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className={`inline-flex items-baseline gap-0 ${className}`}>
      <span className={`font-light tracking-tight ${sizeClasses[size]}`} style={{ fontFamily: 'var(--font-primary)' }}>
        Learn
      </span>
      <span className={`font-semibold tracking-tight ${sizeClasses[size]}`} style={{ fontFamily: 'var(--font-primary)' }}>
        Loop
      </span>
      <svg 
        className="ml-0.5 mb-0.5" 
        width={size === 'sm' ? '6' : size === 'md' ? '8' : '10'} 
        height={size === 'sm' ? '6' : size === 'md' ? '8' : '10'} 
        viewBox="0 0 8 8" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="4" cy="4" r="3.5" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      </svg>
    </div>
  );
}
