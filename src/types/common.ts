// Theme and UI Types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Settings Types
export type SettingsTab = 'account' | 'appearance' | 'notifications' | 'user-preferences';
export type UserPreferencesSubTab = 'profile' | 'schedule';

export interface SubTabsProps {
  activeTab: SettingsTab;
  activeSubTab: UserPreferencesSubTab;
  setActiveSubTab: (tab: UserPreferencesSubTab) => void;
}

export interface StatusMessagesProps {
  success?: boolean;
  error?: string | null | undefined;
}

// User Role Types
export type UserRole = 'admin' | 'manager' | 'frontend_dev' | 'backend_dev' | 'designer' | 'fullstack_dev' | 'ux_designer';

// Schedule Types
export type DaysOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

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

export interface DayScheduleProps {
  day: DaysOfWeek;
  dayLabel: string;
  slots: WorkingHours[];
  errors: Record<DaysOfWeek, string | null>;
  isToday: boolean;
  onAddTimeSlot: (day: DaysOfWeek) => void;
  onRemoveTimeSlot: (day: DaysOfWeek, index: number) => void;
  onTimeSlotChange: (day: DaysOfWeek, index: number, field: keyof WorkingHours, value: string) => void;
}

export interface SettingWorkScheduleProps {
  schedule: WorkSchedule;
  onChange: (schedule: WorkSchedule) => void;
}

// Warning Component Types
export interface WarningProps {
  title?: string;
  message: string;
  icon?: React.ElementType;
  variant?: keyof typeof import('../constants/theme').WARNING_COLORS;
  className?: string;
}

export interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
}
