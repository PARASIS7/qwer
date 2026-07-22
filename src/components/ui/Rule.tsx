import React from 'react';

interface RuleProps {
  variant?: 'single' | 'double' | 'dark' | 'double-dark' | 'accent';
  className?: string;
  vertical?: boolean;
}

const Rule: React.FC<RuleProps> = ({ variant = 'single', className = '', vertical = false }) => {
  if (vertical) {
    const map: Record<string, string> = {
      single: 'w-px bg-border-paper',
      double: 'w-1 border-r border-l border-border-paper',
      dark: 'w-px bg-border-dark',
      'double-dark': 'w-1 border-r border-l border-border-dark',
      accent: 'w-px bg-accent',
    };
    return <div className={`${map[variant]} self-stretch ${className}`} />;
  }
  const map: Record<string, string> = {
    single: 'h-px bg-border-paper w-full',
    double: 'h-1 border-t border-b border-border-paper w-full',
    dark: 'h-px bg-border-dark w-full',
    'double-dark': 'h-1 border-t border-b border-border-dark w-full',
    accent: 'h-px bg-accent w-full',
  };
  return <div className={`${map[variant]} ${className}`} />;
};

export default Rule;
