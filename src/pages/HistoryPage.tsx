import React from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout.tsx";
import { useTimeHistory } from "@/hooks/useTimeHistory.ts";
import { History } from "lucide-react";
import { formatDuration } from "@/utils/timeFormatters";
import { format } from "date-fns";

export default function HistoryPage() {
  const { entries, loading, error, refetch: fetchEntries } = useTimeHistory();

  if (loading) {
    return (
        <DashboardLayout>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 dark:bg-gray-800 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-700 dark:bg-gray-800 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-white dark:text-white mb-8">Time History</h1>
        {error ? (
            <div className="bg-red-900/50 border border-red-800 rounded-lg p-4">
              <p className="text-sm text-red-400">{error}</p>
              <button
                  onClick={fetchEntries}
                  className="mt-2 text-sm text-red-400 hover:text-red-300 font-medium"
              >
                Try again
              </button>
            </div>
        ) : entries.length === 0 ? (
            <div className="text-center py-12">
              <History className="mx-auto h-12 w-12 text-gray-600 dark:text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-white dark:text-white">No completed time entries</h3>
              <p className="mt-1 text-sm text-gray-400 dark:text-gray-400">
                Start tracking time to see your history here.
              </p>
            </div>
        ) : (
            <div className="bg-gray-800 dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-700 dark:divide-gray-700">
                {entries.map((entry) => (
                    <li key={entry.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white dark:text-white truncate">
                              {entry.description}
                            </p>
                            <p className="text-sm text-gray-400 dark:text-gray-400">
                              {entry.project.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-white dark:text-white">
                              {formatDuration(entry.duration)}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-400">
                              {format(new Date(entry.start_time), 'MMM d, HH:mm')} -{' '}
                              {format(new Date(entry.end_time), 'MMM d, HH:mm')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                ))}
              </ul>
            </div>
        )}
      </div>
    </DashboardLayout>
  );
}