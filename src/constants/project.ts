import { Clock, CheckCircle2, Archive, Boxes } from 'lucide-react';
import { ProjectStatus } from '@/types/project';

export const STATUS_ICONS = {
  active: Clock,
  completed: CheckCircle2,
  archived: Archive,
  all: Boxes,
} as const;

export const STATUS_COLORS = {
  active: {
    text: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/50',
    badge: 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800',
  },
  completed: {
    text: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/50',
    badge: 'bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800',
  },
  archived: {
    text: 'text-gray-600 dark:text-gray-400',
    bg: 'bg-gray-100 dark:bg-gray-800',
    badge: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',
  },
  all: {
    text: 'text-gray-600 dark:text-gray-400',
    bg: 'bg-gray-100 dark:bg-gray-800',
    badge: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',
  },
} as const;

export const STAT_ITEMS = [
  {
    name: 'All Projects',
    filter: 'all' as ProjectStatus,
  },
  {
    name: 'Active',
    filter: 'active' as ProjectStatus,
  },
  {
    name: 'Completed',
    filter: 'completed' as ProjectStatus,
  },
  {
    name: 'Archived',
    filter: 'archived' as ProjectStatus,
  },
] as const; 