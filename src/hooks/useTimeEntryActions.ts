import { useMemo, createElement } from 'react';
import { ACTION_ICONS } from '@/constants/icons';
import { createActionOptions } from '@/utils/timeEntryActions';
import { ActionOption, TimeEntryActionType } from '@/types';

export function useTimeEntryActions(
  onAction: (action: TimeEntryActionType, ids: string[]) => void,
  entryIds: string[],
  isArchived?: boolean
) {
  const options = useMemo(() => {
    return createActionOptions(onAction, entryIds, isArchived).map((option: ActionOption) => ({
      ...option,
      action: () => onAction(option.action as TimeEntryActionType, entryIds),
      icon: createElement(ACTION_ICONS[option.icon], { className: 'w-4 h-4' })
    }));
  }, [onAction, entryIds, isArchived]);

  return { options };
}