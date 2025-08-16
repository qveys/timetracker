import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ className = '', label, ...props }: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-offset-gray-800 ${className}`}
        {...props}
      />
      {label && (
        <label className="ml-2 block text-sm text-gray-900 dark:text-white">
          {label}
        </label>
      )}
    </div>
  );
} 