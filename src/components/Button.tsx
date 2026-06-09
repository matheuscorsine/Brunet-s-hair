import { clsx } from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className,
  children,
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-soft transition-all duration-200 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-pink text-white hover:bg-pink-light shadow-soft hover:shadow-soft-lg',
    secondary: 'bg-rose text-brown hover:bg-rose-light',
    outline: 'border-2 border-pink text-pink hover:bg-pink/10',
    ghost: 'text-brown hover:bg-rose/30',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}