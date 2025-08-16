import React, { memo } from 'react';
import { format } from 'date-fns';
import { ProjectListItemProps } from '@/types/project';
import { Project } from '@/types/project';
import { STATUS_ICONS, STATUS_COLORS } from '@/constants/projects';

export const ProjectListItem = memo(({ project, onStatusChange }: ProjectListItemProps) => {
  const StatusIcon = STATUS_ICONS[project.status];
  const colors = STATUS_COLORS[project.status];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <StatusIcon className={`w-5 h-5 ${colors.text}`} />
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{project.name}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
              <div className="mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors.badge}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={project.status}
              onChange={(e) => onStatusChange(project.id, e.target.value as Project['status'])}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              aria-label="Change project status"
            >
              <option value="active" className="bg-white dark:bg-gray-700">Active</option>
              <option value="completed" className="bg-white dark:bg-gray-700">Completed</option>
              <option value="archived" className="bg-white dark:bg-gray-700">Archived</option>
            </select>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Created on {format(new Date(project.created_at), 'dd/MM/yyyy, HH:mm:ss')}
        </div>
      </div>
    </div>
  );
});

ProjectListItem.displayName = 'ProjectItem'; 