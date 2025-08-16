import React from 'react';
import { ProjectModalOverlayProps } from '@/types/project';

export function ProjectModalOverlay({ onClose }: ProjectModalOverlayProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/25 dark:bg-gray-900/75 transition-opacity" 
      onClick={onClose}
      aria-hidden="true"
    />
  );
} 