import React from 'react';
import { StatusMessagesProps } from '@/types';

export function StatusMessages({ success, error }: StatusMessagesProps) {
  return (
    <>
      {success && (
        <div className="fixed bottom-4 right-4 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-sm text-green-600 dark:text-green-400">Changes saved successfully!</p>
        </div>
      )}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
    </>
  );
}
