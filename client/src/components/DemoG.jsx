import React from "react";
import { Link } from 'react-router-dom';
import { TrendingUp, Zap, Shield, BarChart3, Sun, Cloud, Activity } from 'lucide-react';

const DemoGraphsPage = () => {
  return (
    <section className="w-full bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to optimize your solar energy production and maximize your returns
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Predictions</h3>
            <p className="text-slate-600">
              Advanced machine learning algorithms predict your solar energy output with 95% accuracy
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Monitoring</h3>
            <p className="text-slate-600">
              Track your energy production in real-time with live updates and instant alerts
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Alerts</h3>
            <p className="text-slate-600">
              Get notified about system issues, maintenance needs, and optimization opportunities
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Advanced Analytics</h3>
            <p className="text-slate-600">
              Deep insights into your energy patterns with detailed charts and performance metrics
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sun className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Weather Integration</h3>
            <p className="text-slate-600">
              Automatic weather data integration for accurate forecasting and planning
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Efficiency Tracking</h3>
            <p className="text-slate-600">
              Monitor panel efficiency and identify areas for improvement to maximize output
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Optimize Your Solar Energy?</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already maximizing their solar investment with SolarIQ
            </p>
            <Link 
              to="/auth"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoGraphsPage;
