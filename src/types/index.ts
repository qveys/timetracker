// Imports
import { Dispatch, SetStateAction } from "react";

// Types simples
export type DaysOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type UserRole = 'admin' | 'manager' | 'frontend_dev' | 'backend_dev' | 'designer' | 'fullstack_dev' | 'ux_designer';
export type ProjectStatus = 'all' | 'active' | 'completed' | 'archived';
export type Theme = 'light' | 'dark' | 'system';
export type SettingsTab = 'account' | 'appearance' | 'notifications' | 'user-preferences';
export type UserPreferencesSubTab = 'profile' | 'schedule';

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
export type AppearanceSettingsProps = ThemeState;

export interface StatusMessagesProps {
  success?: boolean;
  error?: string | null | undefined;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  work_schedule: WorkSchedule;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
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

// Interfaces pour le temps de travail
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

export interface WorkScheduleSettingsProps {
  schedule: WorkSchedule;
  onChange: (schedule: WorkSchedule) => void;
}

export interface ProjectStatsProps {
  stats: {
    total: number;
    active: number;
    completed: number;
    archived: number;
  };
  onFilterChange: (filter: ProjectStatus) => void;
  currentFilter: ProjectStatus;
}

export interface MainTabsProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<SettingsTab>>
}

export interface AccountSettingsProps {
  userEmail: string;
}

export interface PasswordFormProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
}

export interface NotificationSettingsProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

export interface ProfileFormProps {
  profile: Profile;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onProfileChange: (profile: Profile) => void;
}


export interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
}

export interface EmailFormProps {
  email: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onEmailChange: (email: string) => void;
}

export interface DayScheduleProps {
  day: DaysOfWeek;
  dayLabel: string;
  slots: WorkingHours[];
  errors: Record<string, string>;
  isToday: boolean;
  onAddTimeSlot: (day: DaysOfWeek) => void;
  onRemoveTimeSlot: (day: DaysOfWeek, index: number) => void;
  onTimeSlotChange: (day: DaysOfWeek, index: number, field: 'start' | 'end', value: string) => void;
}

// Constantes
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