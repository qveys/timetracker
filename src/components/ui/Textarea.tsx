import React from 'react';
import { UI_STYLES } from '@/constants/styles';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ className = '', label, error, ...props }: TextareaProps) {
  return (
    <div>
      {label && <label className="block text-base text-gray-900 dark:text-white mb-2">{label}</label>}
      <textarea
        className={`${UI_STYLES.INPUT.BASE} ${UI_STYLES.INPUT.DEFAULT} ${UI_STYLES.INPUT.FOCUS} ${UI_STYLES.INPUT.TEXT} ${className}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
} 