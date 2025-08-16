import React, { memo } from 'react';
import { ProjectStatsButtonProps } from '@/types/project';
import { STATUS_ICONS, STATUS_COLORS } from '@/constants/projects';

export const ProjectStatsButton = memo(({
  item, 
  isSelected, 
  value, 
  onFilterChange 
}: ProjectStatsButtonProps) => {
  const Icon = STATUS_ICONS[item.filter];
  const colors = STATUS_COLORS[item.filter];

  return (
    <button
      type="button"
      onClick={() => onFilterChange(item.filter)}
      className={`relative bg-white dark:bg-gray-800 pt-5 px-4 pb-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      {...{ 'aria-pressed': isSelected ? 'true' : 'false' }}
      aria-label={`Filter by ${item.name.toLowerCase()} projects (${value} projects)`}
    >
      <div className="flex items-center">
        <div className={`rounded-md p-3 ${colors.bg}`}>
          <Icon className={`h-6 w-6 ${colors.text}`} aria-hidden="true" />
        </div>
        <div className="flex-1 ml-4">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
            {item.name}
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
            {value}
          </dd>
        </div>
      </div>
    </button>
  );
});

ProjectStatsButton.displayName = 'ProjectStatsButton';
