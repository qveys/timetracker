import React from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout.tsx";
import { EntriesActiveList, EntriesTracker } from "@/components/entries";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col">
        {/* Sticky TimeTracker */}
        <div className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10 px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto">
            <EntriesTracker />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <EntriesActiveList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}