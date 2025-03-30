import React from 'react';
import { SubTabsProps, UserPreferencesSubTab } from "@/types";

export const SubTabs = ({ activeTab, setActiveSubTab, activeSubTab } : SubTabsProps ) => {
  return (
      activeTab === 'user-preferences' && (
          <div className="mb-6">
            <div className="px-6 border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8">
                {['profile', 'schedule'].map((subTab) => (
                    <button
                        key={subTab}
                        onClick={() => setActiveSubTab(subTab as UserPreferencesSubTab)}
                        className={`py-2 px-3 border-b-2 text-sm font-medium ${
                            activeSubTab === subTab
                                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                        }`}
                    >
                        {subTab === 'profile' ? 'Profile' : 'Work Schedule'}
                    </button>
                ))}
              </nav>
            </div>
          </div>
      )
  );
}