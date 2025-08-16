import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Project, ProjectStatus } from '@/types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus>('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return;
    }

    setProjects(data || []);
    setLoading(false);
  };

  const updateProjectStatus = async (projectId: string, newStatus: Project['status']) => {
    const originalStatus = projects.find(p => p.id === projectId)?.status;
    
    // Mise à jour optimiste immédiate
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId ? { ...project, status: newStatus } : project
      )
    );

    // Mise à jour dans Supabase
    const { error } = await supabase
      .from('projects')
      .update({ status: newStatus })
      .eq('id', projectId);

    if (error) {
      console.error('Error updating project status:', error);
      // Recharger les projets en cas d'erreur
      fetchProjects();
      return false;
    }

    // Journalisation du changement de statut
    await trackStatusChange(projectId, originalStatus, newStatus);

    return true;
  };

  const trackStatusChange = async (
    projectId: string,
    fromStatus: Project['status'] | undefined,
    toStatus: Project['status']
  ) => {
    const { error } = await supabase
      .from('status_changes')
      .insert({
        project_id: projectId,
        from_status: fromStatus,
        to_status: toStatus,
        changed_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error tracking status change:', error);
    }
  };

  const createProject = async (name: string, description: string) => {
    const { error } = await supabase
      .from('projects')
      .insert([
        {
          name,
          description,
          status: 'active'
        }
      ]);

    if (error) throw error;
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    archived: projects.filter(p => p.status === 'archived').length,
  };

  return {
    projects: filteredProjects,
    stats,
    loading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    createProject,
    updateProjectStatus,
  };
}
