import { WorkSchedule } from './common';
import { STAT_ITEMS } from '@/constants/projects';

// Domain Types
export type ProjectStatus = 'active' | 'completed' | 'archived' | 'all';

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  created_at: string;
  work_schedule?: WorkSchedule;
  syncing?: boolean;
  last_updated?: string;
  last_status_change?: string;
}

export interface ProjectStats {
  total: number;
  active: number;
  completed: number;
  archived: number;
}

// List Component Types
export interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  onStatusChange: (id: string, status: Project['status']) => void;
}

export interface ProjectListItemProps {
  project: Project;
  onStatusChange: (id: string, status: Project['status']) => void;
}

// Stats Component Types
export interface ProjectStatsProps {
  stats: ProjectStats;
  currentFilter: typeof STAT_ITEMS[number]['filter'];
  onFilterChange: (filter: typeof STAT_ITEMS[number]['filter']) => void;
}

export interface ProjectStatsButtonProps {
  item: typeof STAT_ITEMS[number];
  isSelected: boolean;
  value: number;
  onFilterChange: (filter: typeof STAT_ITEMS[number]['filter']) => void;
}

// Modal Component Types
export interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ProjectModalCloseButtonProps {
  onClose: () => void;
  ref?: React.RefObject<HTMLButtonElement>;
}

export interface ProjectModalOverlayProps {
  onClose: () => void;
}

export interface ProjectFormProps {
  onClose: () => void;
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  loading: boolean;
  error: string | null;
  handleSubmit: (e: React.FormEvent) => void;
}
