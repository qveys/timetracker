import React from "react";
import { MainTabsProps } from "@/types";

type SettingsTab = 'account' | 'appearance' | 'notifications' | 'user-preferences';

export const MainTabs = ({ activeTab, setActiveTab }: MainTabsProps) => {
  return (
      <div className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1 mb-8">
        {(['account', 'appearance', 'notifications', 'user-preferences'] as SettingsTab[]).map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab as SettingsTab)}
                className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
            </button>
        ))}
      </div>
  );
}
