import { useState } from 'react';
import { Project } from '@/types/project';
import { useTimeStore } from '@/store/timeStore';
import { useWorkingHours } from '@/hooks/useWorkingHours';
import { User } from '@/types/user';

export function useTimeTracking(user: User | null) {
  const { startTracking } = useTimeStore();
  const { isWithinWorkingHours, getNextWorkPeriodEnd } = useWorkingHours(user?.work_schedule);

  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [autoStopEnabled, setAutoStopEnabled] = useState(true);

  const startTimeEntry = async (project: Project, autoStopTime: Date | undefined = undefined) => {
    await startTracking(description, projectId, project.name, autoStopTime);
    setDescription('');
    setProjectId('');
    setShowConfirmation(false);
  };

  const handleStartTracking = async (project: Project | undefined) => {
    if (!project) return;

    if (!user?.work_schedule || isWithinWorkingHours(user.work_schedule)) {
      const autoStopTime = autoStopEnabled && user?.work_schedule ? getNextWorkPeriodEnd(user.work_schedule) : undefined;
      await startTimeEntry(project, autoStopTime || undefined);
    } else {
      if (autoStopEnabled) {
        const nextEndTime = getNextWorkPeriodEnd(user.work_schedule);
        await startTimeEntry(project, nextEndTime || undefined);
      } else {
        setShowConfirmation(true);
      }
    }
  };

  return {
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
  };
} 