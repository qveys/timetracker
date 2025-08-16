import React from 'react';
import { X } from 'lucide-react';
import { ProjectModalCloseButtonProps } from '@/types/project';

export function ProjectModalCloseButton({ onClose, ref }: ProjectModalCloseButtonProps) {
  return (
    <button
      type="button"
      ref={ref}
      onClick={onClose}
      className="rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Close dialog"
    >
      <X className="h-6 w-6" aria-hidden="true"/>
    </button>
  );
} 