import React from 'react';
import { LayoutDashboard, History, FolderKanban, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";

export const Nav = () => {
  const location = useLocation();

  const isActivePath = (path: string) => location.pathname === path;

  const getNavLinkClasses = (path: string) => {
    const baseClasses = "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors";
    const activeClasses = "bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100";
    const inactiveClasses = "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100";

    return `${baseClasses} ${isActivePath(path) ? activeClasses : inactiveClasses}`;
  };

  return (
      <nav className="flex-1 px-4 py-4 space-y-1">
        <a href="/dashboard" className={getNavLinkClasses('/dashboard')}>
          <LayoutDashboard className="w-5 h-5 mr-3"/>
          Active Timers
        </a>
        <a href="/history" className={getNavLinkClasses('/history')}>
          <History className="w-5 h-5 mr-3"/>
          Time History
        </a>
        <a href="/projects" className={getNavLinkClasses('/projects')}>
          <FolderKanban className="w-5 h-5 mr-3"/>
          Projects
        </a>
        <a href="/settings" className={getNavLinkClasses('/settings')}>
          <Settings className="w-5 h-5 mr-3"/>
          Settings
        </a>
      </nav>
  );
}