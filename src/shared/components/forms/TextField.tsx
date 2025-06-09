import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, helperText, className, leftIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative w-full">
          {leftIcon && (
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10"
              style={{ height: 24, width: 24 }}
            >
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={twMerge(
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all',
              error ? 'border-red-500' : 'border-gray-300',
              leftIcon && 'pl-11',
              className,
            )}
            {...props}
          />
        </div>
        {(error || helperText) && (
          <span className={`text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
