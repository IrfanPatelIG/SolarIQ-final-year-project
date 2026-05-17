import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  Cloud,
  Lightbulb,
  MapPin,
  Plus,
  SlidersHorizontal,
  TrendingUp,
  Zap,
} from 'lucide-react';
import Layout from '../../components/layout/Layout';
import { useDashboard } from '../../hooks/useDashboard.js';
import { usePanels } from '../../hooks/usePanels.js';

const formatLocation = (location) => {
  if (!location) return 'Location not available';

  const parts = [location.city, location.state, location.country].filter(Boolean);
  return parts.length ? parts.join(', ') : `${location.latitude}, ${location.longitude}`;
};

const formatNumber = (value, digits = 1) => {
  const number = Number(value);
  return Number.isFinite(number) ? number.toFixed(digits) : '0.0';
};

const normalizeAlert = (alert, index) => ({
  id: `${alert.type || 'alert'}-${index}`,
  type: alert.severity === 'high' ? 'critical' : 'warning',
  title: `${alert.type || 'System'} alert`,
  desc: alert.message || 'System alert detected.',
  time: 'JUST NOW',
});

const normalizeRecommendation = (recommendation, index) => ({
  id: `${recommendation.category || 'recommendation'}-${index}`,
  title: `${recommendation.category || 'System'} recommendation`,
  desc: recommendation.message || 'Review this recommendation.',
});

const normalizeDashboardData = (dashboardData) => {
  if (!dashboardData) {
    return {
      currentGeneration: '0.0',
      predictedYield: '0.0',
      efficiency: '0.0',
      weather: { temp: 0, humidity: 0, uvIndex: 'N/A' },
      alerts: [],
      recommendations: [],
    };
  }

  if (dashboardData.weather && dashboardData.alerts && dashboardData.recommendations) {
    return dashboardData;
  }

  const forecast = dashboardData.forecast || dashboardData.analytics?.dailyEnergy || [];
  const weatherImpact = dashboardData.analytics?.weatherImpact || [];
  const firstWeather = weatherImpact[0] || {};
  const totalForecastEnergy = forecast.reduce(
    (sum, item) => sum + Number(item.energy || item.predicted_energy_kwh || 0),
    0,
  );
  const efficiencyScore = dashboardData.efficiency?.overall?.efficiencyScore ?? 0;

  // Use currentWeather if available, otherwise fallback to forecast weather
  const currentWeather = dashboardData.currentWeather || firstWeather;

  return {
    currentGeneration: formatNumber(dashboardData.heroCard?.energy),
    predictedYield: formatNumber(totalForecastEnergy),
    efficiency: formatNumber(efficiencyScore),
    weather: {
      temp: Math.round(Number(currentWeather.temperature || 0)),
      humidity: Math.round(Number(currentWeather.humidity || 0)),
      uvIndex: currentWeather.cloud_cover !== undefined
        ? `${Math.round(Number(currentWeather.cloud_cover))}% clouds`
        : 'N/A',
    },
    alerts: (dashboardData.insights?.alerts || []).map(normalizeAlert),
    recommendations: (dashboardData.insights?.recommendations || []).map(normalizeRecommendation),
  };
};

const PanelList = () => {
  const { panels, totalPanels, loading, error } = usePanels();

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Your Solar Panels</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {totalPanels} configured {totalPanels === 1 ? 'panel' : 'panels'}. Choose one to open its dashboard.
            </p>
          </div>
          <Link
            to="/onboarding"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-bold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            <Plus size={18} />
            New Installation
          </Link>
        </div>

        {loading && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
            <p className="text-slate-500 dark:text-slate-400">Loading your panels...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-6">
            <p className="text-red-700 dark:text-red-200">Error loading panels: {error}</p>
          </div>
        )}

        {!loading && !error && panels.length === 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">No panels configured yet</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Add your first solar installation to generate predictions and dashboard insights.</p>
            <Link
              to="/onboarding"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 active:scale-95 transition-all"
            >
              Start Setup
              <Plus size={18} />
            </Link>
          </div>
        )}

        {!loading && !error && panels.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {panels.map((panel) => {
              const location = panel.Location || panel.location;

              return (
                <Link
                  key={panel.panel_id}
                  to={`/dashboard/${panel.panel_id}`}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">Panel #{panel.userPanelId || panel.panel_id}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                        <MapPin size={16} />
                        {formatLocation(location)}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <SlidersHorizontal className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" size={20} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Area</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">{panel.area} m2</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Tilt</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">{panel.tilt} deg</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Facing</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">{panel.orientation}</p>
                    </div>
                  </div>

                  <div className="mt-5 text-sm font-bold text-blue-600 dark:text-blue-400">
                    Open dashboard
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

const Dashboard = () => {
  const { panelId } = useParams();
  const { data: dashboardData, loading, error } = useDashboard(panelId);

  // Console log dashboard data when loaded
  React.useEffect(() => {
    if (dashboardData) {
      console.log('📊 Dashboard Data Loaded:', {
        panelId,
        currentGeneration: dashboardData?.heroCard?.energy,
        forecast: dashboardData?.forecast,
        efficiency: dashboardData?.efficiency,
        alerts: dashboardData?.insights?.alerts,
        weather: dashboardData?.weather,
      });
    }
  }, [dashboardData, panelId]);

  if (!panelId) {
    return <PanelList />;
  }

  const displayData = normalizeDashboardData(dashboardData);
  const userPanelId = dashboardData?.meta?.userPanelId || panelId;
  const totalPanels = dashboardData?.meta?.totalPanels;

  if (loading && !dashboardData) {
    return (
      <Layout>
        <div className="p-8 max-w-7xl mx-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
            <p className="text-slate-500 dark:text-slate-400">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-8 max-w-7xl mx-auto">
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-6">
            <p className="text-red-700 dark:text-red-200">Error loading dashboard: {error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Operational Overview</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Live data from Solar Panel #{userPanelId}
              {totalPanels ? ` of ${totalPanels}` : ''}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-2 rounded-lg font-bold text-sm">
            <Zap size={18} />
            CURRENT GENERATION: {displayData.currentGeneration} kWh
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cloud className="text-blue-600 dark:text-blue-400" size={64} />
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Local Weather</h3>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tighter">{displayData.weather.temp} C</div>
              <div className="space-y-1">
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <Activity className="mr-1" size={16} /> {displayData.weather.humidity}% Humidity
                </div>
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <Zap className="mr-1" size={16} /> {displayData.weather.uvIndex}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium flex items-center">
                <Lightbulb className="mr-1" size={16} /> Weather impact estimate
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp className="text-yellow-500" size={64} />
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Predicted Yield</h3>
            <div className="text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tighter">
              {displayData.predictedYield}<span className="text-2xl font-bold ml-1 text-slate-500 dark:text-slate-400">kWh</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Expected across selected forecast range</p>
            <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-yellow-500 h-full w-3/4 rounded-full"></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">System Efficiency</h3>
              <div className="flex items-baseline gap-2">
                <div className="text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tighter">{displayData.efficiency}%</div>
                <span className="text-green-600 dark:text-green-400 text-sm font-bold flex items-center">
                  <TrendingUp size={16} /> score
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-red-100 dark:bg-red-900/30 px-6 py-4 flex justify-between items-center">
              <h3 className="text-sm font-extrabold text-red-900 dark:text-red-100 uppercase tracking-wider flex items-center">
                <AlertTriangle className="mr-2" size={18} /> System Alerts
              </h3>
              <span className="bg-red-900 dark:bg-red-700 text-white px-2 py-0.5 rounded text-[10px] font-bold">{displayData.alerts.length} ACTIVE</span>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {displayData.alerts.length === 0 && (
                <div className="p-6">
                  <p className="text-sm text-slate-500 dark:text-slate-400">No active alerts for this panel.</p>
                </div>
              )}
              {displayData.alerts.map((alert) => (
                <div key={alert.id} className="p-6 flex gap-4 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all group">
                  <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${
                    alert.type === 'critical' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                  >
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
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center">
                <Lightbulb className="mr-2" size={18} /> Smart Recommendations
              </h3>
            </div>
            <div className="p-6 space-y-6 flex-1">
              {displayData.recommendations.length === 0 && (
                <p className="text-sm text-slate-500 dark:text-slate-400">No recommendations available yet.</p>
              )}
              {displayData.recommendations.map((rec, idx) => (
                <div key={rec.id} className={`relative pl-6 p-4 -m-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:shadow-sm transition-all before:absolute before:left-0 before:top-4 before:bottom-4 before:w-1 before:rounded-full ${
                  idx === 0 ? 'before:bg-yellow-500' : 'before:bg-blue-600'
                }`}
                >
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{rec.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{rec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button className="fixed bottom-8 right-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-4 rounded-2xl shadow-2xl active:scale-95 transition-all flex items-center gap-2 group z-50">
        <Plus size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-sm whitespace-nowrap">Create Report</span>
      </button>
    </Layout>
  );
};

export default Dashboard;
