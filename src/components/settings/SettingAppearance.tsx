import React from 'react';
import type { ThemeState } from "@/types/common";
import { THEME_OPTIONS } from "@/constants/theme";

export function SettingAppearance({ theme, setTheme }: ThemeState) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Theme Preferences</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Choose how KERN Timesheet looks to you. Select a theme below.
      </p>
      <div className="grid grid-cols-3 gap-4">
        {THEME_OPTIONS.map(({ id, label, Icon, iconClass, textClass }) => (
          <button
            key={id}
            onClick={() => setTheme(id)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
              theme === id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <Icon className={`w-6 h-6 mb-3 ${iconClass(theme)}`} />
            <span className={`text-sm font-medium ${textClass(theme)}`}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}