import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'paper';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const base = "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-[4px] ";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-[#962f26] focus:ring-accent border border-accent",
    secondary: "bg-charcoal text-paper hover:bg-[#2a2a30] focus:ring-charcoal border border-charcoal",
    ghost: "bg-transparent text-ink hover:bg-ink/5 border border-border-paper",
    paper: "bg-paper text-ink hover:bg-[#ddd8cc] border border-border-paper",
  };

  const sizes = {
    sm: "px-4 py-2 text-[13px] h-9",
    md: "px-6 py-3 text-[14px] h-11",
    lg: "px-8 py-4 text-[15px] h-12",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
