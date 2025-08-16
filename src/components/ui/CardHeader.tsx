import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardHeaderProps {
  title: string;
  icon: LucideIcon;
}

export function CardHeader({ title, icon: Icon }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
      <Icon className="w-6 h-6 text-gray-400" />
    </div>
  );
} 