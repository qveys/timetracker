import React from 'react';
import { Clock } from 'lucide-react';
import { LoadingState } from '@/components/core/states/LoadingState';
import { ErrorState } from '@/components/core/states/ErrorState';
import { OutOfHoursWarning } from '@/components/core/alerts/OutOfHoursWarning';
import { ConfirmationDialog } from '@/components/core/alerts/ConfirmationDialog';
import { EntryForm } from '@/forms/EntryForm';
import { CardHeader } from '@/components/ui/CardHeader';
import { useAuthStore } from '@/store/authStore';
import { useProjects } from '@/hooks/useProjects';
import { useTimeEntries } from '@/hooks/useTimeEntries';
import { useTimeTracking } from '@/hooks/useTimeTracking';
import { useWorkingHours } from '@/hooks/useWorkingHours';
import { useConfirmation } from '@/hooks/useConfirmation';
import { TIME_ENTRY_TEXTS } from '@/constants/timeEntry';

export function EntriesTracker() {
  const { user } = useAuthStore();
  const { projects, loading } = useProjects();
  const { error, handleRetry } = useTimeEntries();
  const { outOfHoursWarning } = useWorkingHours(user?.work_schedule);
  const {
    description,
    setDescription,
    projectId,
    setProjectId,
    showConfirmation,
    setShowConfirmation,
    autoStopEnabled,
    setAutoStopEnabled,
    handleStartTracking,
    startTimeEntry
  } = useTimeTracking(user);

  const { isOpen, handleConfirm, handleCancel } = useConfirmation({
    onConfirm: () => {
      const project = projects.find(p => p.id === projectId);
      if (project) startTimeEntry(project);
    }
  });

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={handleRetry} />;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <CardHeader title={TIME_ENTRY_TEXTS.title} icon={Clock} />

      {outOfHoursWarning && !showConfirmation && <OutOfHoursWarning />}

      <EntryForm
        description={description}
        projectId={projectId}
        projects={projects}
        autoStopEnabled={autoStopEnabled}
        onDescriptionChange={setDescription}
        onProjectChange={setProjectId}
        onAutoStopChange={setAutoStopEnabled}
        onSubmit={() => handleStartTracking(projects.find(p => p.id === projectId))}
        disabled={!description || !projectId}
      />

      {isOpen && (
        <ConfirmationDialog
          title={TIME_ENTRY_TEXTS.confirmation.title}
          message={TIME_ENTRY_TEXTS.confirmation.message}
          confirmText={TIME_ENTRY_TEXTS.confirmation.confirm}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
