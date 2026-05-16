import React from 'react';
import Navbar from '../../components/common/Navbar.jsx';
import HeroSection from '../../components/home/HeroSection.jsx';
import SetupSection from '../../components/home/SetupSection.jsx';
import Footer from '../../components/common/Footer.jsx';
import DemoGraphsPage from '../../pages/DemoG.jsx';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <section id="demo">
        <DemoGraphsPage />
      </section>
      <SetupSection />
      <Footer />
    </div>
  );
};

export default Home;
