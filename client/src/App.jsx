import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SetupSection from "./components/SetupSection";
import DemoGraphsPage from "./components/DemoG";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";

const Home = () => {
  return (
    <>
      <HeroSection />
      <SetupSection />
      <DemoGraphsPage />
    </>
  );
};

const App = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        }
      />

      {/* Dashboard (No Navbar/Footer) */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;