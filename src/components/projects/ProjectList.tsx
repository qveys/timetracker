import React from 'react';
import { ProjectListProps } from '@/types';
import { ProjectListLoading } from './ProjectListLoading';
import { ProjectListEmpty } from './ProjectListEmpty';
import { ProjectListItem } from './ProjectListItem';

export function ProjectList({ projects, loading, onStatusChange }: ProjectListProps) {
  if (loading) return <ProjectListLoading />;
  if (projects.length === 0) return <ProjectListEmpty />;

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectListItem 
          key={project.id} 
          project={project} 
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
