import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import DashboardPage from "./pages/DashboardPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import { useThemeStore, updateThemeClass } from './store/themeStore';

const App: React.FC = () => {
  const theme = useThemeStore(state => state.theme);
  // Apply theme class and listen for system theme changes
  useEffect(() => {
    updateThemeClass(theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => updateThemeClass('system');
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  return (
      <Router>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Router>
  );
};

export default App;