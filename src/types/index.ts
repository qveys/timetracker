export type UserRole = 'backend_dev' | 'frontend_dev' | 'fullstack_dev' | 'ux_designer';

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

export const DEFAULT_WORK_SCHEDULE: WorkSchedule = {
  monday: [{ start: '09:00', end: '17:00' }],
  tuesday: [{ start: '09:00', end: '17:00' }],
  wednesday: [{ start: '09:00', end: '17:00' }],
  thursday: [{ start: '09:00', end: '17:00' }],
  friday: [{ start: '09:00', end: '17:00' }],
  saturday: [],
  sunday: [],
};

export interface Auth {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}