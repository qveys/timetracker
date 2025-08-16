import React, { useCallback } from 'react';
import { EntryHistoryItemProps } from '@/types/entry';
import { EntriesItemContent } from './EntriesItemContent';
import { EntriesItemActions } from './EntriesItemActions';
import { TIME_ENTRY_STYLES } from '@/constants/styles';

export const EntriesHistoryItem = React.memo(function EntriesHistoryItem({
  entry,
  isSelected,
  isMenuOpen,
  onToggleSelection,
  onActionMenuOpen,
  onAction
}: EntryHistoryItemProps) {
  const containerClass = entry.isArchived ? TIME_ENTRY_STYLES.ARCHIVED_CONTAINER : TIME_ENTRY_STYLES.DEFAULT_CONTAINER;
  
  const handleToggle = useCallback(() => {
    onToggleSelection(entry.id);
  }, [entry.id, onToggleSelection]);

  const handleCheckboxChange = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSelection(entry.id);
  }, [entry.id, onToggleSelection]);

  return (
    <li className={`${containerClass} transition-colors`}>
      <div 
        className="p-4 flex items-center cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex-shrink-0 mr-4" onClick={handleCheckboxChange}>
          <input
            type="checkbox"
            className={TIME_ENTRY_STYLES.CHECKBOX}
            checked={isSelected}
            onChange={handleToggle}
            aria-label={`Select entry ${entry.description}`}
          />
        </div>
        
        <EntriesItemContent entry={entry} isArchived={entry.isArchived} />

        <div className="flex items-center gap-4">
          <EntriesItemActions
            isMenuOpen={isMenuOpen}
            isArchived={entry.isArchived}
            entryId={entry.id}
            onActionMenuOpen={onActionMenuOpen}
            onAction={onAction}
          />
        </div>
      </div>
    </li>
  );
});
