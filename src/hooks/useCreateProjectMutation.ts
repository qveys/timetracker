import { useProjects } from './useProjects';
import { useProjectForm } from './useProjectForm';

export function useCreateProjectMutation(onSuccess: () => void) {
  const { createProject } = useProjects();
  const form = useProjectForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.setLoading(true);
    form.setError(null);

    try {
      await createProject(form.name, form.description);
      form.reset();
      onSuccess();
    } catch (err: unknown) {
      form.setError(
        err instanceof Error
          ? err.message
          : 'Failed to create project. Please try again.'
      );
    } finally {
      form.setLoading(false);
    }
  };

  return {
    ...form,
    handleSubmit
  };
}