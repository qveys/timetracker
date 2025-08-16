import { Sun, Moon, Monitor } from 'lucide-react';

export const WARNING_COLORS = {
  info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400',
  success: 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-400',
  warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400',
  error: 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-400'
} as const;

export const THEME_OPTIONS = [
  {
    id: 'light',
    label: 'Light',
    Icon: Sun,
    iconClass: (theme: string) => theme === 'light' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400',
    textClass: (theme: string) => theme === 'light' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
  },
  {
    id: 'dark',
    label: 'Dark',
    Icon: Moon,
    iconClass: (theme: string) => theme === 'dark' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400',
    textClass: (theme: string) => theme === 'dark' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
  },
  {
    id: 'system',
    label: 'System',
    Icon: Monitor,
    iconClass: (theme: string) => theme === 'system' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400',
    textClass: (theme: string) => theme === 'system' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
  }
] as const;