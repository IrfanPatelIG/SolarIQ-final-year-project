import React from 'react';
import { BarChart3, TrendingUp, Sun, Activity, Download, Cloud, CloudRain, CheckCircle, AlertTriangle } from 'lucide-react';
import Layout from '../components/layout/Layout';

const Analytics = () => {
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

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Dual-Line Chart: Predicted vs Actual */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-xl relative overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100">Output Variance</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Predicted vs. Actual generation trends</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Predicted</span>
                </div>
              </div>
            </div>
            {/* Chart Placeholder */}
            <div className="relative h-64 flex items-end justify-between gap-1">
              <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none opacity-20">
                <div className="border-t border-slate-300 dark:border-slate-600 w-full"></div>
                <div className="border-t border-slate-300 dark:border-slate-600 w-full"></div>
                <div className="border-t border-slate-300 dark:border-slate-600 w-full"></div>
                <div className="border-t border-slate-300 dark:border-slate-600 w-full"></div>
                <div className="border-t border-slate-300 dark:border-slate-600 w-full"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart3 className="text-slate-300 dark:text-slate-600" size={64} />
              </div>
              <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-2 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
              </div>
            </div>
          </div>

          {/* Bar Chart: Efficiency Trends */}
          <div className="bg-blue-600 text-white p-8 rounded-xl flex flex-col shadow-sm">
            <h3 className="font-bold text-xl mb-2">Efficiency Heatmap</h3>
            <p className="text-sm text-blue-100/60 mb-8">Conversion rates by peak hour clusters</p>
            <div className="flex-1 flex items-end gap-3 px-2">
              <div className="flex-1 bg-blue-400 rounded-t-lg h-[40%] hover:bg-yellow-400 transition-colors"></div>
              <div className="flex-1 bg-blue-400 rounded-t-lg h-[65%] hover:bg-yellow-400 transition-colors"></div>
              <div className="flex-1 bg-blue-400 rounded-t-lg h-[90%] hover:bg-yellow-400 transition-colors"></div>
              <div className="flex-1 bg-blue-400 rounded-t-lg h-[82%] hover:bg-yellow-400 transition-colors"></div>
              <div className="flex-1 bg-blue-400 rounded-t-lg h-[55%] hover:bg-yellow-400 transition-colors"></div>
              <div className="flex-1 bg-blue-400 rounded-t-lg h-[30%] hover:bg-yellow-400 transition-colors"></div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-blue-100/80">Current Efficiency</span>
                <span className="text-2xl font-black text-yellow-400">92.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Table Section */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="p-6 bg-white dark:bg-slate-900 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Daily Performance Logs</h3>
            <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <Download size={18} />
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-800 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Daily Output (kWh)</th>
                  <th className="px-6 py-4">Panel Efficiency</th>
                  <th className="px-6 py-4">Weather Condition</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-6 py-5 font-semibold text-slate-900 dark:text-slate-100">Oct 24, 2023</td>
                  <td className="px-6 py-5 font-bold">28.4</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-16 bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[96%]"></div>
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">96.2%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Sun className="text-yellow-500" size={18} />
                      <span className="text-slate-700 dark:text-slate-300">Clear Sky</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Optimal</span>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-6 py-5 font-semibold text-slate-900 dark:text-slate-100">Oct 23, 2023</td>
                  <td className="px-6 py-5 font-bold">14.2</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-16 bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-[72%]"></div>
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">72.4%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Cloud className="text-slate-400" size={18} />
                      <span className="text-slate-700 dark:text-slate-300">Overcast</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Reduced</span>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-6 py-5 font-semibold text-slate-900 dark:text-slate-100">Oct 22, 2023</td>
                  <td className="px-6 py-5 font-bold">29.1</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-16 bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[98%]"></div>
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">98.1%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Sun className="text-yellow-500 fill-yellow-500" size={18} />
                      <span className="text-slate-700 dark:text-slate-300">High Intensity</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Optimal</span>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-6 py-5 font-semibold text-slate-900 dark:text-slate-100">Oct 21, 2023</td>
                  <td className="px-6 py-5 font-bold">9.4</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-16 bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 w-[45%]"></div>
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">45.8%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <CloudRain className="text-blue-400" size={18} />
                      <span className="text-slate-700 dark:text-slate-300">Heavy Rain</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold">Critical Low</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
