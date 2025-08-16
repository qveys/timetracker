import React from 'react';
import { TimeEntryContentProps } from '@/types/time';
import { formatDuration, formatTimeRange } from '@/utils/timeFormatters';
import { ARCHIVED_ENTRY_CLASS, TEXT_PRIMARY_CLASS, TEXT_SECONDARY_CLASS } from '@/constants/styles';

export const EntriesItemContent = React.memo(function EntriesItemContent({ entry, isArchived }: TimeEntryContentProps) {
  const archivedClass = isArchived ? ARCHIVED_ENTRY_CLASS : '';

  return (
    <>
      <div className="flex-1 min-w-0">
        <p className={`${TEXT_PRIMARY_CLASS} truncate ${archivedClass}`}>
          {entry.description}
        </p>
        <p className={`${TEXT_SECONDARY_CLASS} ${archivedClass}`}>
          {entry.project.name}
        </p>
      </div>
      <div className="text-right">
        <p className={`${TEXT_PRIMARY_CLASS} ${archivedClass}`}>
          {formatDuration(entry.duration)}
        </p>
        <p className={`text-xs ${TEXT_SECONDARY_CLASS} ${archivedClass}`}>
          {formatTimeRange(entry.start_time, entry.end_time)}
        </p>
      </div>
    </>
  );
});
