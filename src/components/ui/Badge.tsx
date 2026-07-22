import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'charcoal' | 'paper' | 'success' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'paper', size = 'sm', className = '' }) => {
  const variants = {
    accent: "bg-accent text-white border-accent",
    charcoal: "bg-charcoal text-paper border-charcoal",
    paper: "bg-paper text-ink border-border-paper",
    success: "bg-success text-white border-success",
    outline: "bg-transparent text-muted border-border-paper",
  };
  const sizes = {
    sm: "px-2.5 py-0.5 text-[11px]",
    md: "px-3 py-1 text-[12px]",
  };
  return (
    <span className={`inline-flex items-center font-bold tracking-wider border rounded-[4px] ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
