import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashboardPage from "./pages/DashboardPage.tsx";

const App: React.FC = () => {
  return (
      <Router>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Router>
  );
};

export default App;