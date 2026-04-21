import LightRays from "./LightRays";

const HeroSection = () => {
  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center bg-white text-[#333333] overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"   // put image in public folder
        alt="Solar Panels"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay (VERY IMPORTANT) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Background effect */}
      <div className="absolute inset-0 opacity-100">
        <LightRays
          raysOrigin="top-center"
          raysColor="#FFC107"   // Solar Yellow ✅
          raysSpeed={1.2}
          lightSpread={1}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.05}
          noiseAmount={0.05}
          distortion={0.02}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        
        <h1 className="font-bold lg:text-7xl text-5xl mb-6 text-white">
          SolarIQ ⚡
        </h1>

        <p className="text-lg max-w-xl mx-auto text-white/80">
          Smart solar insights powered by real-time data, weather forecasting, and performance analytics.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

          <a
            href="#setup"
            className="rounded-full bg-[#FFC107] hover:bg-black text-black hover:text-[#FFC107] font-semibold px-10 py-3 shadow-lg transition-all duration-300 hover:scale-105"
          >
            Get Started →
          </a>

          <a
            href="#setup"
            className="font-semibold rounded-full border bg-black border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
          >
            View Demo
          </a>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;