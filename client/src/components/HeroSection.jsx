import LightRays from "./LightRays";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 text-center">
        <h1 className="mt-15 font-bold lg:text-8xl text-5xl mb-4">
          Welcome to SolarIQ
        </h1>
        <p className="font-bold text-lg text-grey">
          Empowering innovation through Insights and Predictions
        </p>
        <div className="mt-15 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="rounded-full border text-lg text-white hover:bg-cyan-400 hover:text-black font-semibold px-10 py-3 shadow-lg shadow-cyan-500/20 transition-all duration-300">
            Start
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
