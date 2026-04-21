import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SetupSection from "./components/SetupSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <SetupSection/>
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

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* Dashboard (No Navbar/Footer) */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;