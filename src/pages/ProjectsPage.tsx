import { useState } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout.tsx";
import { Plus } from "lucide-react";
import { CreateProjectModal } from "../components/CreateProjectModal.tsx";
import { supabase } from "../lib/supabase.ts";
import { Project } from "../types";

export default function ProjectsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

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
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-gray-900"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </button>
        </div>

        <CreateProjectModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onProjectCreated={fetchProjects}
        />
      </div>
    </DashboardLayout>
  );
}