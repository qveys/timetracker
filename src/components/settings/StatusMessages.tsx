import React from 'react';
import type { StatusMessagesProps } from '@/types/common';

const messageStyles = {
  success: {
    container: 'bg-green-50 dark:bg-green-900/50 border-green-200 dark:border-green-800',
    text: 'text-green-600 dark:text-green-400'
  },
  error: {
    container: 'bg-red-50 dark:bg-red-900/50 border-red-200 dark:border-red-800',
    text: 'text-red-600 dark:text-red-400'
  }
};

export function StatusMessages({ success, error }: StatusMessagesProps) {
  return (
    <>
      {success && (
        <div className={`fixed bottom-4 right-4 border rounded-lg p-4 ${messageStyles.success.container}`}>
          <p className={`text-sm ${messageStyles.success.text}`}>Changes saved successfully!</p>
        </div>
      )}
      {error && (
        <div className={`fixed bottom-4 right-4 border rounded-lg p-4 ${messageStyles.error.container}`}>
          <p className={`text-sm ${messageStyles.error.text}`}>{error}</p>
        </div>
      )}
    </>
  );
}
