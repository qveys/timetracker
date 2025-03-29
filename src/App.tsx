import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashboardPage from "./pages/DashboardPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";

const App: React.FC = () => {
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