import React from 'react';
import { UI_STYLES } from '@/constants/styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ className = '', label, error, ...props }: InputProps) {
  return (
    <div>
      {label && <label className="block text-base text-gray-900 dark:text-white my-2">{label}</label>}
      <input
        className={`${UI_STYLES.INPUT.BASE} ${UI_STYLES.INPUT.DEFAULT} ${UI_STYLES.INPUT.FOCUS} ${UI_STYLES.INPUT.TEXT} ${className}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
} 