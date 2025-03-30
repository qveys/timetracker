import React from "react";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex">
        <aside className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0">
        </aside>
        <main className="flex-1 overflow-auto bg-white dark:bg-gray-900">
          {children}
        </main>
      </div>
  );
};