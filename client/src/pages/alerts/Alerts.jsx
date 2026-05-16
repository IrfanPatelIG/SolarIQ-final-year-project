import React from 'react';
import { AlertTriangle, Info, Zap, Battery, CheckCircle } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import { useInsights } from '../../hooks/useInsights.js';

const Alerts = () => {
  const { data: insightsData, loading, error } = useInsights();

  const mockAlerts = [
    { id: 1, type: 'critical', title: 'Inverter 3 efficiency dropped below 80%', desc: 'System detected a significant output variance in the Northwest array. Manual inspection recommended for thermal overheating.', time: '10 minutes ago' },
    { id: 2, type: 'normal', title: 'Scheduled maintenance successful', desc: 'Firmware update v4.2.1 was successfully applied to all Tesla Powerwall units in the East sector.', time: '2 hours ago' },
    { id: 3, type: 'performance', title: 'Peak generation record reached', desc: 'Today\'s solar yield exceeded historical average by 15%. Ideal atmospheric conditions detected.', time: '5 hours ago' },
    { id: 4, type: 'critical', title: 'Grid decoupling event: Backup active', desc: 'Local grid connection lost. System has transitioned to autonomous storage mode. Critical loads are prioritized.', time: 'Yesterday, 11:45 PM' },
  ];

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
            <button className="px-6 py-2 rounded-lg text-sm font-semibold bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm hover:shadow-md transition-all">All</button>
            <button className="px-6 py-2 rounded-lg text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all">Critical</button>
            <button className="px-6 py-2 rounded-lg text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all">Normal</button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">Loading alerts...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-6 mb-8">
            <p className="text-red-700 dark:text-red-200">Error loading alerts: {error}</p>
          </div>
        )}

        {/* Alert Grid/List */}
        <div className="space-y-4">
          {mockAlerts.map((alert) => (
            <div key={alert.id} className="group bg-white dark:bg-slate-900 p-6 rounded-xl flex items-start gap-6 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 relative overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800">
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                alert.type === 'critical' ? 'bg-red-500' : alert.type === 'performance' ? 'bg-yellow-500' : 'bg-blue-600'
              }`}></div>
              <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg ${
                alert.type === 'critical' ? 'bg-red-100 dark:bg-red-900/30' : alert.type === 'performance' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
              }`}>
                {alert.type === 'critical' ? <AlertTriangle className="text-red-600 dark:text-red-400" size={24} /> : alert.type === 'performance' ? <Zap className="text-yellow-600 dark:text-yellow-400" size={24} /> : <Info className="text-blue-600 dark:text-blue-400" size={24} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`text-white text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-sm ${
                    alert.type === 'critical' ? 'bg-red-500' : alert.type === 'performance' ? 'bg-yellow-500 text-slate-900' : 'bg-blue-600'
                  }`}>{alert.type.toUpperCase()}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">{alert.time}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">{alert.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{alert.desc}</p>
              </div>
              <div className="flex flex-col gap-2">
                {alert.type === 'critical' && <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold tracking-wide hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 active:scale-95 transition-all whitespace-nowrap">Resolve Now</button>}
                {alert.type !== 'critical' && <button className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-xs font-bold tracking-wide hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-700 dark:hover:text-blue-300 hover:shadow-sm active:scale-95 transition-all whitespace-nowrap">{alert.type === 'performance' ? 'Analytics' : 'View Log'}</button>}
                <button className="text-slate-500 dark:text-slate-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs font-semibold px-4 py-2 rounded-lg transition-all">Dismiss</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Alerts;
