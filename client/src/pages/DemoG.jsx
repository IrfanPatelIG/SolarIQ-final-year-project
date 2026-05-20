import React from 'react';

const DemoGraphsPage = () => {
  return (
    <section className="py-20 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 text-center mb-12">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1: Real-time Monitoring */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 p-8 rounded-xl border border-blue-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold">⚡</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Real-time Monitoring</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Track your solar panel performance in real-time with instant updates and alerts.
            </p>
          </div>

          {/* Feature 2: AI Predictions */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 p-8 rounded-xl border border-purple-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold">🤖</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">AI-Powered Predictions</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Get accurate energy output predictions using machine learning algorithms.
            </p>
          </div>

          {/* Feature 3: Weather Analysis */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 p-8 rounded-xl border border-green-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold">🌤️</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Weather Impact Analysis</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Understand how weather conditions affect your solar energy production.
            </p>
          </div>

          {/* Feature 4: Performance Analytics */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-900 dark:to-slate-800 p-8 rounded-xl border border-orange-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold">📊</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Performance Analytics</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Detailed analytics and insights to optimize your solar system efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoGraphsPage;
