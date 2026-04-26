import React from 'react';
import { Cloud, TrendingUp, Zap, AlertTriangle, Lightbulb, MessageSquare, Plus, BarChart3, Activity } from 'lucide-react';
import Layout from '../components/layout/Layout';

const Dashboard = () => {
  // Mock data - will be replaced with API results
  const dashboardData = {
    currentGeneration: '42.8',
    predictedYield: '512',
    efficiency: '94.2',
    weather: {
      temp: 24,
      humidity: 42,
      uvIndex: 'High'
    },
    alerts: [
      { id: 1, type: 'critical', title: 'Inverter #04 Overheating', desc: 'Temperature exceeding safety threshold (85°C). System has entered low-performance mode.', time: '12 MINUTES AGO' },
      { id: 2, type: 'warning', title: 'Communication Lag - Sensor Array B', desc: 'Latency detected in data transmission. Potential interference from weather conditions.', time: '1 HOUR AGO' }
    ],
    recommendations: [
      { id: 1, title: 'Optimize Storage Cycle', desc: 'Energy prices are predicted to spike at 19:00. Switch to Battery Discharge mode at 18:45 to maximize ROI.' },
      { id: 2, title: 'Maintenance Window Open', desc: 'High cloud cover predicted for Tuesday. Ideal time to schedule physical panel cleaning for Inverter #04.' }
    ]
  };

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Operational Overview</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Live data from San Jose Solar Field Alpha</p>
          </div>
          <div className="flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-2 rounded-lg font-bold text-sm">
            <Zap size={18} />
            CURRENT GENERATION: {dashboardData.currentGeneration} kWh
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Weather Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cloud className="text-blue-600 dark:text-blue-400" size={64} />
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Local Weather</h3>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tighter">{dashboardData.weather.temp}°C</div>
              <div className="space-y-1">
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <Activity className="mr-1" size={16} /> {dashboardData.weather.humidity}% Humidity
                </div>
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <Zap className="mr-1" size={16} /> {dashboardData.weather.uvIndex} UV Index
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium flex items-center">
                <Lightbulb className="mr-1" size={16} /> Optimal panel temperature
              </p>
            </div>
          </div>

          {/* Prediction Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp className="text-yellow-500" size={64} />
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Predicted Yield</h3>
            <div className="text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tighter">
              {dashboardData.predictedYield}<span className="text-2xl font-bold ml-1 text-slate-500 dark:text-slate-400">kWh</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Expected by 18:00 Today</p>
            <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-yellow-500 h-full w-3/4 rounded-full"></div>
            </div>
          </div>

          {/* Efficiency Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">System Efficiency</h3>
              <div className="flex items-baseline gap-2">
                <div className="text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tighter">{dashboardData.efficiency}%</div>
                <span className="text-green-600 dark:text-green-400 text-sm font-bold flex items-center">
                  <TrendingUp size={16} /> 1.2%
                </span>
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              <div className="h-8 flex-1 bg-blue-600/5 rounded-sm"></div>
              <div className="h-10 flex-1 bg-blue-600/10 rounded-sm"></div>
              <div className="h-12 flex-1 bg-blue-600/20 rounded-sm"></div>
              <div className="h-14 flex-1 bg-blue-600/40 rounded-sm"></div>
              <div className="h-16 flex-1 bg-blue-600 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Main Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Large Chart Container */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Solar Prediction Trends</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Forecasting next 24 hours of energy production</p>
              </div>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button className="px-3 py-1 text-xs font-bold rounded-md bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400">Hourly</button>
                <button className="px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">Daily</button>
              </div>
            </div>
            {/* Chart placeholder - will use Recharts */}
            <div className="h-64 w-full bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="text-slate-400 mx-auto mb-2" size={48} />
                <p className="text-slate-500 dark:text-slate-400 text-sm">Chart will display API data</p>
              </div>
            </div>
            <div className="flex justify-between mt-4 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
              <span>06:00</span>
              <span>09:00</span>
              <span>12:00</span>
              <span>15:00</span>
              <span>18:00</span>
              <span>21:00</span>
            </div>
          </div>

          {/* Comparison Bar Chart */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Historical Benchmarking</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Performance vs. Prior Month</p>
            <div className="flex-1 flex items-end justify-between gap-4 pb-4">
              {['MON', 'TUE', 'WED', 'THU'].map((day, idx) => (
                <div key={day} className="w-full flex flex-col items-center gap-2">
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-t-lg h-32 relative group">
                    <div 
                      className={`absolute bottom-0 w-full rounded-t-lg transition-all group-hover:opacity-80 ${
                        day === 'WED' ? 'bg-yellow-500 h-32' : 'bg-blue-600 h-' + (24 - idx * 4)
                      }`}
                    ></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{day}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Current Avg</p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">12.4 kWh</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Previous Avg</p>
                <p className="text-xl font-bold text-slate-400">11.1 kWh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panels: Alerts & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Alerts Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-red-100 dark:bg-red-900/30 px-6 py-4 flex justify-between items-center">
              <h3 className="text-sm font-extrabold text-red-900 dark:text-red-100 uppercase tracking-wider flex items-center">
                <AlertTriangle className="mr-2" size={18} /> System Alerts
              </h3>
              <span className="bg-red-900 dark:bg-red-700 text-white px-2 py-0.5 rounded text-[10px] font-bold">{dashboardData.alerts.length} ACTIVE</span>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {dashboardData.alerts.map((alert) => (
                <div key={alert.id} className="p-6 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                  <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${
                    alert.type === 'critical' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-slate-200 dark:bg-slate-700'
                  }`}>
                    <AlertTriangle className={alert.type === 'critical' ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'} size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{alert.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{alert.desc}</p>
                    <span className="text-[10px] text-red-600 dark:text-red-400 font-bold mt-2 block">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">VIEW ALL ALERTS</button>
          </div>

          {/* Recommendations Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center">
                <Lightbulb className="mr-2" size={18} /> Smart Recommendations
              </h3>
            </div>
            <div className="p-6 space-y-6 flex-1">
              {dashboardData.recommendations.map((rec, idx) => (
                <div key={rec.id} className={`relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-full ${
                  idx === 0 ? 'before:bg-yellow-500' : 'before:bg-blue-600'
                }`}>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{rec.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{rec.desc}</p>
                  <button className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center group">
                    {idx === 0 ? 'Apply Suggestion' : 'Schedule Now'} <TrendingUp className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-6 mt-auto">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <img 
                    alt="Specialist" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4eH5MzryV4eQjCgAbimZK-bpRB9gV-IBqurUdpKv0kX1GMi_tVWabp3i7h9io_awJ4Av_zk8aWgMlPXhJ9TBrA7yLhosiYrxlya6S-f8YhkzHnuQNYxthDroXQ2Ap8cKu-l1skAKd2VgaioQK0lVU7PfBT7aHY93HoOKMCkyUm5ZAvjTXxf5a7S7SWpH_RVkaR6dPc5j8SqzlqtCc3yeyQVmTRs3Vb-z1ARZ4tiksXYLlJjErI-z74q9fwGWqZ5TxKy77CjJGh_9q"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Consult an Expert</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Our solar engineers are online.</p>
                </div>
                <button className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">Chat</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-4 rounded-2xl shadow-2xl active:scale-95 transition-all flex items-center gap-2 group z-50">
        <Plus size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-sm whitespace-nowrap">Create Report</span>
      </button>
    </Layout>
  );
};

export default Dashboard;
