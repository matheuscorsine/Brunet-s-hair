import { clsx } from 'clsx';
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-brown mb-2">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'w-full px-4 py-3 bg-cream border border-rose rounded-soft text-brown placeholder:text-brown/50',
          'focus:outline-none focus:ring-2 focus:ring-pink/50 focus:border-pink',
          'transition-all duration-200',
          error && 'border-red-400 focus:ring-red-200',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextArea({ label, className, ...props }: TextAreaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-brown mb-2">
          {label}
        </label>
      )}
      <textarea
        className={clsx(
          'w-full px-4 py-3 bg-cream border border-rose rounded-soft text-brown placeholder:text-brown/50',
          'focus:outline-none focus:ring-2 focus:ring-pink/50 focus:border-pink',
          'transition-all duration-200 resize-none min-h-[100px]',
          className
        )}
        {...props}
      />
    </div>
  );
}