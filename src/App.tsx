import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { LoadingLayout } from "./layouts/LoadingLayout.tsx";
import { useThemeStore, updateThemeClass } from './store/themeStore';
import { AuthPage } from "./pages/AuthPage.tsx";

// Lazy load components
const DashboardPage = React.lazy(() => import('./pages/DashboardPage.tsx').then(m => ({ default: m.default })));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.default })));
const HistoryPage = React.lazy(() => import('./pages/HistoryPage').then(m => ({ default: m.default })));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage').then(m => ({ default: m.default })));

const App: React.FC = () => {
  let [loading] = React.useState(false);
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

  if (loading) {
    return <LoadingLayout/>;
  }

  return (
      <Router>
        <Suspense fallback={<LoadingLayout/>}>
          <Routes>
            <Route path="/login" element={<AuthPage/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/history" element={<HistoryPage/>}/>
            <Route path="/projects" element={<ProjectsPage/>}/>
            <Route path="/settings" element={<SettingsPage/>}/>
            <Route path="/" element={<Navigate to={"/dashboard"}/>}/>
          </Routes>
        </Suspense>
      </Router>
  );
};

export default App;