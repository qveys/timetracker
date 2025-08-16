import React, { useCallback } from 'react';
import { EntriesHistoryItem } from './EntriesHistoryItem';
import { Clock } from 'lucide-react';
import { EntriesBulkActions } from './EntriesBulkActions';
import { VirtualizedList } from '@/components/ui/VirtualizedList';
import type { TimeEntry, Project, TimeEntryListProps } from '@/types';

export const EntriesCompletedList = React.memo(function EntriesCompletedList({
  entries,
  selectedEntries,
  actionMenuOpen,
  onToggleSelection,
  onToggleAll,
  onActionMenuOpen,
  onAction
}: TimeEntryListProps) {
  const handleBulkMenuToggle = useCallback(() => {
    onActionMenuOpen(actionMenuOpen === 'bulk' ? null : 'bulk');
  }, [actionMenuOpen, onActionMenuOpen]);

  const handleClearSelection = useCallback(() => {
    onToggleSelection('');
  }, [onToggleSelection]);

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No completed time entries</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Start tracking time to see your history here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden flex flex-col h-full rounded-lg">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 bg-white dark:bg-gray-800 z-10">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-gray-800"
            checked={selectedEntries.size === entries.length}
            onChange={onToggleAll}
          />
          <span className="mx-4 my-2 text-sm text-gray-500 dark:text-gray-400">{selectedEntries.size} entries selected</span>
          {selectedEntries.size > 0 && (
            <EntriesBulkActions
              isOpen={actionMenuOpen === 'bulk'}
              onToggleMenu={handleBulkMenuToggle}
              onAction={onAction}
              selectedEntryIds={Array.from(selectedEntries)}
              onClearSelection={handleClearSelection}
            />
          )}
        </label>
      </div>
      <div className="flex-1 overflow-y-auto">
        <VirtualizedList<TimeEntry & { project: Project }>
          items={entries}
          itemHeight={72}
          renderItem={(entry) => (
            <EntriesHistoryItem
              key={entry.id}
              entry={entry}
              isSelected={selectedEntries.has(entry.id)}
              isMenuOpen={actionMenuOpen === entry.id}
              onToggleSelection={onToggleSelection}
              onActionMenuOpen={onActionMenuOpen}
              onAction={onAction}
            />
          )}
        />
      </div>
    </div>
  );
});