import { TimeEntryActionType, ActionOption } from '@/types';

export function createActionOptions(
    action: (action: TimeEntryActionType, entryIds: string[]) => void,
    entryIds: string[],
    isArchived?: boolean
): ActionOption[] {
  return [
    {
      label: 'Duplicate',
      icon: 'Copy',
      action: () => action('duplicate', entryIds)
    },
    {
      label: isArchived ? 'Unarchive' : 'Archive',
      icon: 'Archive',
      action: () => action('archive', entryIds)
    },
    {
      label: 'Delete',
      icon: 'Trash2',
      action: () => action('delete', entryIds),
      className: 'text-red-600 dark:text-red-400'
    }
  ];
}