import React from 'react';
import { format } from 'date-fns';
import { Clock, CheckCircle2, Archive } from 'lucide-react';
import { Project } from '@/types';
import { supabase } from '@/lib/supabase';

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  onProjectUpdated: () => void;
}

export function ProjectList({ projects, loading, onProjectUpdated }: ProjectListProps) {
  const updateProjectStatus = async (projectId: string, newStatus: Project['status']) => {
    const { error } = await supabase
      .from('projects')
      .update({ status: newStatus })
      .eq('id', projectId);

    if (error) {
      console.error('Error updating project status:', error);
      return;
    }

    onProjectUpdated();
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'archived':
        return <Archive className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadgeColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800';
      case 'completed':
        return 'bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800';
      case 'archived':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No projects found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new project.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                {getStatusIcon(project.status)}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{project.name}</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={project.status}
                  onChange={(e) => updateProjectStatus(project.id, e.target.value as Project['status'])}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
      ))}
    </div>
  );
}