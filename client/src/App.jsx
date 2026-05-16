import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Home from './pages/home/Home.jsx';
import Auth from './pages/auth/Auth.jsx';
import Onboarding from './pages/onboarding/Onboarding.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Analytics from './pages/analytics/Analytics.jsx';
import Alerts from './pages/alerts/Alerts.jsx';
import Settings from './pages/settings/Settings.jsx';
import Admin from './pages/admin/Admin.jsx';

// Protected Route Component
const ProtectedRoute = ({ element, requiredRole = null }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-slate-500 dark:text-slate-400">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />

          {/* Protected Routes */}
          <Route path="/onboarding" element={<ProtectedRoute element={<Onboarding />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/dashboard/:panelId" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/analytics" element={<ProtectedRoute element={<Analytics />} />} />
          <Route path="/alerts" element={<ProtectedRoute element={<Alerts />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
          <Route path="/admin" element={<ProtectedRoute element={<Admin />} requiredRole="admin" />} />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
