import React from 'react';
import { UI_STYLES } from '@/constants/styles';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
}

export function Select({ className = '', label, options, ...props }: SelectProps) {
  return (
    <div className="relative">
      {label && <label className="block text-base text-gray-900 dark:text-white mb-2">{label}</label>}
      <div className="relative">
        <select
          className={`${UI_STYLES.SELECT.BASE} ${UI_STYLES.SELECT.DEFAULT} ${UI_STYLES.SELECT.FOCUS} ${UI_STYLES.INPUT.TEXT} ${className}`}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value} className="bg-gray-100 dark:bg-gray-700">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}