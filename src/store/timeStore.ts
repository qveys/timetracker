import { create } from 'zustand';

interface TimeEntry {
  id: string;
  description: string; 
  projectId: string;
  projectName: string;
  startTime: Date;
  endTime?: Date;
}

interface TimeStore {
  timeEntries: TimeEntry[];
  startTracking: (
    description: string,
    projectId: string,
    projectName: string, 
    autoStopTime?: Date
  ) => Promise<void>;
}

export const useTimeStore = create<TimeStore>((set) => ({
  timeEntries: [],
  startTracking: async (description, projectId, projectName, autoStopTime) => {
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      description,
      projectId,
      projectName,
      startTime: new Date(),
      endTime: autoStopTime
    };
    set((state) => ({
      timeEntries: [...state.timeEntries, newEntry]
    }));
  }
}));