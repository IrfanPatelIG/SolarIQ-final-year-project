import React from 'react';
import { AlertTriangle, Info, Zap, Battery, CheckCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';

const Alerts = () => {
  return (
    <Layout>
      <div className="p-8 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-2">System Alerts</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Real-time performance and integrity monitoring.</p>
          </div>
          {/* Filter Button Group */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button className="px-6 py-2 rounded-lg text-sm font-semibold bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm">All</button>
            <button className="px-6 py-2 rounded-lg text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Critical</button>
            <button className="px-6 py-2 rounded-lg text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Normal</button>
          </div>
        </div>

        {/* Alert Grid/List */}
        <div className="space-y-4">
          {/* Alert Card: Critical */}
          <div className="group bg-white dark:bg-slate-900 p-6 rounded-xl flex items-start gap-6 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800 relative overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 flex items-center justify-center rounded-lg">
              <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="bg-red-500 text-white text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-sm">CRITICAL</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">10 minutes ago</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">Inverter 3 efficiency dropped below 80%</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">System detected a significant output variance in the Northwest array. Manual inspection recommended for thermal overheating.</p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold tracking-wide hover:bg-blue-700 transition-colors whitespace-nowrap">Resolve Now</button>
              <button className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-xs font-semibold px-4 py-2 transition-colors">Dismiss</button>
            </div>
          </div>

          {/* Alert Card: Normal */}
          <div className="group bg-white dark:bg-slate-900 p-6 rounded-xl flex items-start gap-6 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800 relative overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center rounded-lg">
              <Info className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="bg-blue-600 text-white text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-sm">NORMAL</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">2 hours ago</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">Scheduled maintenance successful</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Firmware update v4.2.1 was successfully applied to all Tesla Powerwall units in the East sector.</p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-xs font-bold tracking-wide hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors whitespace-nowrap">View Log</button>
              <button className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-xs font-semibold px-4 py-2 transition-colors">Dismiss</button>
            </div>
          </div>

          {/* Alert Card: Performance */}
          <div className="group bg-white dark:bg-slate-900 p-6 rounded-xl flex items-start gap-6 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800 relative overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"></div>
            <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center rounded-lg">
              <Zap className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="bg-yellow-500 text-slate-900 text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-sm">PERFORMANCE</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">5 hours ago</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">Peak generation record reached</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Today's solar yield exceeded historical average by 15%. Ideal atmospheric conditions detected.</p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-xs font-bold tracking-wide hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors whitespace-nowrap">Analytics</button>
              <button className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-xs font-semibold px-4 py-2 transition-colors">Dismiss</button>
            </div>
          </div>

          {/* Alert Card: Critical */}
          <div className="group bg-white dark:bg-slate-900 p-6 rounded-xl flex items-start gap-6 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800 relative overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 flex items-center justify-center rounded-lg">
              <Battery className="text-red-600 dark:text-red-400" size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="bg-red-500 text-white text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-sm">CRITICAL</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">Yesterday, 11:45 PM</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">Grid decoupling event: Backup active</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Local grid connection lost. System has transitioned to autonomous storage mode. Critical loads are prioritized.</p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold tracking-wide hover:bg-blue-700 transition-colors whitespace-nowrap">Resolve Now</button>
              <button className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-xs font-semibold px-4 py-2 transition-colors">Dismiss</button>
            </div>
          </div>
        </div>

        {/* Quiet Metadata Footer */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-widest mb-4">End of alerts</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Monitoring Live System Status
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Alerts;
