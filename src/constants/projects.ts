import { LucideIcon } from 'lucide-react';
import { ProjectStatus } from '@/types/project';
import { CheckCircle, Archive, Circle, ListTodo } from 'lucide-react';

export const STATUS_ICONS: Record<ProjectStatus | 'all', LucideIcon> = {
  all: ListTodo,
  active: Circle,
  completed: CheckCircle,
  archived: Archive,
};

export const STATUS_COLORS: Record<ProjectStatus | 'all', { text: string; bg: string; badge: string }> = {
  all: {
    text: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    badge: 'border-blue-400 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900/20 dark:text-blue-400',
  },
  active: {
    text: 'text-green-500',
    bg: 'bg-green-100 dark:bg-green-900/20',
    badge: 'border-green-400 bg-green-50 text-green-700 dark:border-green-500 dark:bg-green-900/20 dark:text-green-400',
  },
  completed: {
    text: 'text-purple-500',
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    badge: 'border-purple-400 bg-purple-50 text-purple-700 dark:border-purple-500 dark:bg-purple-900/20 dark:text-purple-400',
  },
  archived: {
    text: 'text-gray-500',
    bg: 'bg-gray-100 dark:bg-gray-900/20',
    badge: 'border-gray-400 bg-gray-50 text-gray-700 dark:border-gray-500 dark:bg-gray-900/20 dark:text-gray-400',
  },
};

export const STAT_ITEMS = [
  { name: 'All Projects', filter: 'all' },
  { name: 'Active Projects', filter: 'active' },
  { name: 'Completed Projects', filter: 'completed' },
  { name: 'Archived Projects', filter: 'archived' },
] as const; 