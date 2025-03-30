import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { AppearanceSettingsProps } from "@/types";

export function AppearanceSettings({ theme, setTheme }: AppearanceSettingsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Theme Preferences</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Choose how KERN Timesheet looks to you. Select a theme below.
      </p>
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => setTheme('light')}
          className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
            theme === 'light'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <Sun className={`w-6 h-6 mb-3 ${theme === 'light' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
          <span className={`text-sm font-medium ${theme === 'light' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
            Light
          </span>
        </button>

        <button
          onClick={() => setTheme('dark')}
          className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
            theme === 'dark'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <Moon className={`w-6 h-6 mb-3 ${theme === 'dark' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
            Dark
          </span>
        </button>

        <button
          onClick={() => setTheme('system')}
          className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
            theme === 'system'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <Monitor className={`w-6 h-6 mb-3 ${theme === 'system' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
          <span className={`text-sm font-medium ${theme === 'system' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
            System
          </span>
        </button>
      </div>
    </div>
  );
}