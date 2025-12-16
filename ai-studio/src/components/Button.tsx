import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'danger-ghost';
  size?: 'lg' | 'md' | 'sm';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'lg', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center rounded-hw-lg";
  
  const sizeStyles = {
    lg: "h-14 px-6 text-lg",
    md: "h-11 px-4 text-base",
    sm: "h-9 px-3 text-sm",
  };

  const variants = {
    primary: "bg-hw-fg text-white hover:opacity-90 shadow-sm",
    secondary: "bg-white text-hw-fg border border-hw-border hover:bg-zinc-50 shadow-sm",
    ghost: "bg-transparent text-hw-muted hover:text-hw-fg hover:bg-zinc-100",
    'danger-ghost': "bg-transparent text-red-400 hover:text-red-600 hover:bg-red-50",
    link: "bg-transparent text-hw-muted hover:text-hw-fg underline underline-offset-4 px-0 h-auto rounded-none active:scale-100 justify-start",
  };

  const appliedSize = variant === 'link' ? '' : sizeStyles[size];

  return (
    <button 
      className={`${baseStyles} ${appliedSize} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;