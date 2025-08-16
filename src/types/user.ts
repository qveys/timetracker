import { UserRole, WorkSchedule } from './common';

// Domain Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  work_schedule: WorkSchedule;
}

export interface Profile {
  fullName: string;
  jobTitle: string;
  bio: string;
}

// Component Props
export interface ProfileFormProps {
  profile: Profile;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onProfileChange: (profile: Profile) => void;
}

export interface SettingUserProfileProps {
  userId: string;
  initialProfile: Profile;
  onSuccess: () => void;
  onError: (message: string) => void;
  onProfileUpdate: () => Promise<void>;
}

export interface SettingNotificationProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}
