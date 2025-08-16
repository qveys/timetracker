import React from 'react';
import { Timer } from 'lucide-react';
import { format } from 'date-fns';
import { formatDuration } from '@/utils/timeFormatters';

interface EntriesDurationProps {
  readonly elapsedTime: number;
  readonly autoStopTime?: string | null;
}

export const EntriesDuration = React.memo(function EntriesDuration({ 
  elapsedTime, 
  autoStopTime 
}: EntriesDurationProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        {formatDuration(elapsedTime)}
      </span>
      {autoStopTime && (
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/50 border border-amber-200 dark:border-amber-800/50">
          <Timer className="w-3 h-3 text-amber-600 dark:text-amber-400" />
          <span className="text-xs text-amber-600 dark:text-amber-400">
            Auto-stop at {format(new Date(autoStopTime), 'HH:mm')}
          </span>
        </div>
      )}
    </div>
  );
});
