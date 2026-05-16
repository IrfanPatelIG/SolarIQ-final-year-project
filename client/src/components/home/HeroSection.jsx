import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  const primaryCta = isAuthenticated
    ? { label: 'Open Dashboard', to: '/dashboard' }
    : { label: 'Get Started Free', to: '/auth' };
  const secondaryCta = isAuthenticated
    ? { label: 'Configure System', to: '/onboarding' }
    : { label: 'View Demo', to: '#demo' };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-slate-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <Zap size={16} />
            <span>AI-Powered Solar Energy Management</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
            SolarIQ
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-4 font-medium">
            Empowering innovation through Insights and Predictions
          </p>
          
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12">
            Harness the power of machine learning to optimize your solar energy production, predict output, and maximize your investment returns.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link 
              to={primaryCta.to}
              className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2 hover:-translate-y-1"
            >
              {primaryCta.label}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link 
              to={secondaryCta.to}
              className="bg-white text-slate-700 px-8 py-4 rounded-full font-semibold text-lg border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              {secondaryCta.label}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-600 mb-2">95%</div>
              <div className="text-sm text-slate-500">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-cyan-600 mb-2">10K+</div>
              <div className="text-sm text-slate-500">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-600 mb-2">50M+</div>
              <div className="text-sm text-slate-500">kWh Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-cyan-600 mb-2">24/7</div>
              <div className="text-sm text-slate-500">Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
