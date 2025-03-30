// Types
import { Dispatch, SetStateAction } from "react";

export type UserRole = 'backend_dev' | 'frontend_dev' | 'fullstack_dev' | 'ux_designer';
export type SettingsTab = 'account' | 'appearance' | 'notifications' | 'user-preferences';
export type UserPreferencesSubTab = 'profile' | 'schedule';

// Interfaces
export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  created_at: string;
  work_schedule?: WorkSchedule;
}

export interface TimeEntry {
  id: string;
  user_id: string;
  project_id: string;
  description: string;
  start_time: string;
  end_time: string;
  duration: number;
  created_at: string;
  auto_stop: boolean;
  is_archived: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  created_at: string;
}

export interface WorkingHours {
  start: string;
  end: string;
}

export interface WorkSchedule {
  monday: WorkingHours[];
  tuesday: WorkingHours[];
  wednesday: WorkingHours[];
  thursday: WorkingHours[];
  friday: WorkingHours[];
  saturday: WorkingHours[];
  sunday: WorkingHours[];
}

export interface Auth {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export interface ActiveTimeEntry {
  id: string;
  description: string;
  projectId: string;
  projectName: string;
  startTime: Date;
  elapsedTime: number;
  autoStopTime: Date | null;
}

export interface TimeState {
  activeEntry: ActiveTimeEntry | null;
  startTracking: (description: string, projectId: string, projectName: string, autoStopTime?: Date | null) => Promise<void>;
  stopTracking: () => Promise<void>;
  updateElapsedTime: () => void;
}

export interface UseSupabaseOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
  successDuration?: number;
  errorDuration?: number;
}

export interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: () => void;
}

export interface ProjectStatsProps {
  stats: {
    total: number;
    active: number;
    completed: number;
    archived: number;
  };
  onFilterChange: (filter: 'all' | 'active' | 'completed' | 'archived') => void;
  currentFilter: 'all' | 'active' | 'completed' | 'archived';
}

export interface MainTabsProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<SettingsTab>>
}
// Constants
export const DEFAULT_WORK_SCHEDULE: WorkSchedule = {
  monday: [{ start: '09:00', end: '17:00' }],
  tuesday: [{ start: '09:00', end: '17:00' }],
  wednesday: [{ start: '09:00', end: '17:00' }],
  thursday: [{ start: '09:00', end: '17:00' }],
  friday: [{ start: '09:00', end: '17:00' }],
  saturday: [],
  sunday: [],
};

export interface SubTabsProps {
  activeTab: SettingsTab;
  setActiveSubTab: (tab: UserPreferencesSubTab) => void;
  activeSubTab: UserPreferencesSubTab;
}