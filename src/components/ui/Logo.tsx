import React from 'react';
import { Clock } from "lucide-react";

export const Logo = () => {
  return (
    <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
      <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400"/>
      <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">KERN Timesheet</span>
    </div>
  );
}