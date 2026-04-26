import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SetupSection from "./components/SetupSection";
import Footer from "./components/Footer";
import DemoGraphsPage from "./components/DemoG";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Landing page - preserve existing */}
          <Route path="/" element={
            <>
              <Navbar />
              <HeroSection />
              <DemoGraphsPage />
              <Footer />
            </>
          } />
          
          {/* Auth page */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Onboarding page */}
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* Dashboard and other pages with layout */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
