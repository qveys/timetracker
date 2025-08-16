import React, { Suspense, useEffect } from 'react';
import { MinTimeSuspense } from './components/core/MinTimeSuspense';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { LoadingLayout } from "./layouts/LoadingLayout";
import { useThemeStore, updateThemeClass } from './store/themeStore';
import { AuthPage } from "./pages/AuthPage";
import { useAuthStore } from "./store/authStore";

// Lazy load components
const DashboardPage = React.lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.default })));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.default })));
const HistoryPage = React.lazy(() => import('./pages/HistoryPage').then(m => ({ default: m.default })));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage').then(m => ({ default: m.default })));

const App: React.FC = () => {
  const { initialize, loading, user } = useAuthStore();
  const theme = useThemeStore(state => state.theme);

  useEffect(() => {
    initialize();
  }, [initialize]);

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
        <MinTimeSuspense fallback={<LoadingLayout/>} minTime={1000}>
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <AuthPage/>}/>
            <Route path="/dashboard" element={user ? <DashboardPage/> : <Navigate to="/login" />}/>
            <Route path="/history" element={user ? <HistoryPage/> : <Navigate to="/login" />}/>
            <Route path="/projects" element={user ? <ProjectsPage/> : <Navigate to="/login" />}/>
            <Route path="/settings" element={user ? <SettingsPage/> : <Navigate to="/login" />}/>
            <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"}/>}/>
          </Routes>
        </MinTimeSuspense>
      </Router>
  );
};

export default App;
