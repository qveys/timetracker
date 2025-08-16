import React from 'react';
import { useTimeEntries } from '@/hooks/useTimeEntries';
import { LoadingState, ErrorState, EmptyState } from '@/components/core';
import { EntriesActiveCard } from './EntriesActiveCard';

export const EntriesActiveList = React.memo(function EntriesActiveList() {
  const { 
    entries: activeEntries,
    loading,
    error,
    elapsedTimes,
    handleStopTracking,
    handleRetry
  } = useTimeEntries();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={handleRetry} />;
  if (activeEntries.length === 0) return <EmptyState />;

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Active Timers
      </h2>
      <div className="space-y-4">
        {activeEntries.map(entry => (
          <EntriesActiveCard
            key={entry.id}
            entry={entry}
            elapsedTime={elapsedTimes[entry.id] || 0}
            onStop={handleStopTracking}
          />
        ))}
      </div>
    </div>
  );
});
