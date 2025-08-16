import React from 'react';
import { ProjectStats as ProjectStatsType, ProjectStatsProps } from '@/types/project';
import { STAT_ITEMS } from '@/constants/projects';
import { ProjectStatsButton } from './ProjectStatsButton';

export function ProjectStats({ stats, onFilterChange, currentFilter }: ProjectStatsProps) {
  return (
    <div 
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      role="group"
      aria-label="Project statistics and filters"
    >
      {STAT_ITEMS.map((item) => (
        <ProjectStatsButton
          key={item.name}
          item={item}
          isSelected={currentFilter === item.filter}
          value={item.filter === 'all' ? stats.total : stats[item.filter as keyof ProjectStatsType]}
          onFilterChange={onFilterChange}
        />
      ))}
    </div>
  );
}
