import React from 'react';
import { Clock, CheckCircle2, Archive, Boxes } from 'lucide-react';
import { ProjectStatsProps } from "@/types";

export function ProjectStats({ stats, onFilterChange, currentFilter }: ProjectStatsProps) {
  const statItems = [
    {
      name: 'All Projects',
      value: stats.total,
      icon: Boxes,
      filter: 'all' as const,
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
    },
    {
      name: 'Active',
      value: stats.active,
      icon: Clock,
      filter: 'active' as const,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/50',
    },
    {
      name: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      filter: 'completed' as const,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/50',
    },
    {
      name: 'Archived',
      value: stats.archived,
      icon: Archive,
      filter: 'archived' as const,
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => {
        const isSelected = currentFilter === item.filter;
        return (
          <button
            key={item.name}
            onClick={() => onFilterChange(item.filter)}
            className={`relative bg-white dark:bg-gray-800 pt-5 px-4 pb-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
              isSelected ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex items-center">
              <div className={`${item.bgColor} rounded-md p-3`}>
                <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
              </div>
              <div className="flex-1 ml-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{item.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{item.value}</dd>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}