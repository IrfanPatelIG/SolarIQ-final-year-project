import React from 'react';
import { BarChart3, TrendingUp, Sun, Activity, Download, Cloud, CloudRain, CheckCircle, AlertTriangle } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import { useAnalytics } from '../../hooks/useAnalytics.js';

const Analytics = () => {
  const { data: analyticsData, loading, error } = useAnalytics('daily-energy');

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Page Header & Filter */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Performance Analytics</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Detailed energy production insights for the current cycle.</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Range</label>
            <div className="relative">
              <select className="appearance-none bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl pl-4 pr-10 py-2.5 text-sm font-semibold shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer">
                <option>Last 30 Days</option>
                <option>Current Quarter</option>
                <option>Year to Date</option>
                <option>Custom Range</option>
              </select>
              <Activity className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Output */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl transition-all hover:-translate-y-1 flex flex-col justify-between h-40 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Total Output</span>
              <span className="bg-yellow-500 text-slate-900 px-2 py-0.5 rounded-full text-[10px] font-black tracking-tighter">+12.4%</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">842.6</span>
                <span className="text-lg font-bold text-slate-500 dark:text-slate-400">MWh</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">Vs 749.2 MWh last period</p>
            </div>
          </div>

          {/* Average Efficiency */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl transition-all hover:-translate-y-1 flex flex-col justify-between h-40 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Avg Efficiency</span>
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full text-[10px] font-black tracking-tighter">STABLE</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">94.8</span>
                <span className="text-lg font-bold text-slate-500 dark:text-slate-400">%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-yellow-500 w-[94.8%]"></div>
              </div>
            </div>
          </div>

          {/* Peak Generation */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl transition-all hover:-translate-y-1 flex flex-col justify-between h-40 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Peak Time</span>
              <Sun className="text-yellow-500" size={20} />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">13:42</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Daily average peak window</p>
            </div>
          </div>

          {/* Active Hardware */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl transition-all hover:-translate-y-1 flex flex-col justify-between h-40 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Uptime</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-[10px] font-bold text-green-600">ONLINE</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">99.9</span>
                <span className="text-lg font-bold text-slate-500 dark:text-slate-400">%</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">2,140 Active Panel Clusters</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">Loading analytics data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-6 mb-8">
            <p className="text-red-700 dark:text-red-200">Error loading analytics: {error}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Analytics;
