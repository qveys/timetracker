import { User } from "./user";

// Authentication Types
export interface Auth {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

// Form Props
export interface EmailFormProps {
  email: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onEmailChange: (email: string) => void;
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
