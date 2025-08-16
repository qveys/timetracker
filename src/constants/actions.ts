import { TimeEntryActionType } from '@/types';

export const TIME_ENTRY_ACTIONS = [
  {
    action: 'duplicate' as TimeEntryActionType,
    label: 'Duplicate Selected',
    icon: 'Copy',
  },
  {
    action: 'archive' as TimeEntryActionType,
    label: '(Un)archive Selected',
    icon: 'Archive',
  },
  {
    action: 'delete' as TimeEntryActionType,
    label: 'Delete Selected',
    icon: 'Trash2',
    className: 'text-red-600 dark:text-red-400'
  }
];
