import React from 'react';
import { ChevronDown } from 'lucide-react';
import { TimeEntryBulkActionProps  } from '@/types';
import { TIME_ENTRY_ACTIONS } from '@/constants/actions';
import { BUTTON_BASE_CLASS } from '@/constants/styles';
import { ACTION_ICONS } from '@/constants/icons';
import { IconType } from '@/types';

export const EntriesBulkActions = React.memo(function EntriesBulkActions({
  isOpen,
  selectedEntryIds,
  onToggleMenu,
  onAction,
  onClearSelection
}: TimeEntryBulkActionProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggleMenu}
        className="inline-flex items-center px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-gray-800"
      >
        Actions
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
          {TIME_ENTRY_ACTIONS.map(({ action, label, icon, className }) => (
            <button
              key={action}
              onClick={() => {
                onAction(action, selectedEntryIds);
                onClearSelection();
              }}
              className={`${BUTTON_BASE_CLASS} ${className || ''}`}
            >
              {React.createElement(ACTION_ICONS[icon as IconType], { className: 'w-4 h-4 mr-2' })}
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}); 