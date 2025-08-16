import React from 'react';
import { MoreVertical } from 'lucide-react';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { TimeEntryActionsProps } from '@/types/time';
import { useTimeEntryActions } from '@/hooks/useTimeEntryActions';

export function EntriesItemActions({
  isMenuOpen,
  isArchived,
  entryId,
  onActionMenuOpen,
  onAction
}: TimeEntryActionsProps) {
  const { options } = useTimeEntryActions(onAction, [entryId], isArchived);

  return (
    <div className="relative" onClick={e => e.stopPropagation()}>
      <button
        onClick={() => onActionMenuOpen(isMenuOpen ? null : entryId)}
        className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Menu actions"
        aria-haspopup="menu"
        {...(isMenuOpen ? {'aria-expanded': true} : {})}
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      <DropdownMenu isOpen={isMenuOpen} options={options} />
    </div>
  );
}
