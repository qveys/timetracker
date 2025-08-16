import React from 'react';
import { STATUS_ICONS } from '@/constants/projects';

export function ProjectListEmpty() {
  return (
    <div className="text-center py-12">
      <STATUS_ICONS.all className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No projects found</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new project.</p>
    </div>
  );
} 