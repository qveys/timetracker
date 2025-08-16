import React from 'react';
import { format } from 'date-fns';
import { Square } from 'lucide-react';
import { TimeEntry } from '@/types/time';
import { Project } from '@/types/project';
import { EntriesDuration } from './EntriesDuration';
import type { EntriesActiveCardProps } from '@/types/entry';

export const EntriesActiveCard = React.memo(({ 
  entry, 
  elapsedTime, 
  onStop 
}: EntriesActiveCardProps) => {
  return (
    <div className="bg-white dark:bg-blue-900/50 rounded-lg shadow p-4 border border-gray-200 dark:border-blue-800">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{entry.description}</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{entry.project.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Started: {format(new Date(entry.start_time), 'dd/MM/yyyy, HH:mm:ss')}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <EntriesDuration 
            elapsedTime={elapsedTime} 
            autoStopTime={entry.auto_stop}
          />
          <button
            onClick={() => onStop(entry.id)}
            className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 rounded-full hover:bg-red-50 dark:hover:bg-red-900/50"
            title="Stop tracking"
          >
            <Square className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});
