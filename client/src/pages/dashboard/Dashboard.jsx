import React from "react";
import { Link, useParams } from "react-router-dom";
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
  Sun,
  Gauge,
  Compass,
  Droplets,
  Thermometer,
  Target,
  BarChart3,
  Bell,
} from "lucide-react";
import Layout from "../../components/layout/Layout";
import { useDashboard } from "../../hooks/useDashboard.js";
import { usePanels } from "../../hooks/usePanels.js";
import HeroForecastCard from "../../components/dashboard/HeroForecastCard.jsx";
import EnergyForecastChart from "../../components/dashboard/EnergyForecastChart.jsx";
import WeatherVsEnergyChart from "../../components/dashboard/WeatherVsEnergyChart.jsx";
import WeatherGauges from "../../components/dashboard/WeatherGauges.jsx";
import DashboardKPICards from "../../components/dashboard/DashboardKPICards.jsx";
import EfficiencyBarChart from "../../components/dashboard/EfficiencyBarChart.jsx";
import EfficiencyBreakdownChart from "../../components/dashboard/EfficiencyBreakdownChart.jsx";
import PanelPerformanceChart from "../../components/dashboard/PanelPerformanceChart.jsx";
import CloudCoverVsEnergyChart from "../../components/dashboard/CloudCoverVsEnergyChart.jsx";
import WeeklyEnergyDistributionChart from "../../components/dashboard/WeeklyEnergyDistributionChart.jsx";
import AlertsList from "../../components/dashboard/AlertsList.jsx";
import RecommendationsList from "../../components/dashboard/RecommendationsList.jsx";

const formatLocation = (location) => {
  if (!location) return "Location not available";

  const parts = [location.city, location.state, location.country].filter(
    Boolean,
  );
  return parts.length
    ? parts.join(", ")
    : `${location.latitude}, ${location.longitude}`;
};

const formatNumber = (value, digits = 1) => {
  const number = Number(value);
  return Number.isFinite(number) ? number.toFixed(digits) : "0.0";
};

const normalizeAlert = (alert, index) => ({
  id: `${alert.type || "alert"}-${index}`,
  type: alert.severity === "high" ? "critical" : "warning",
  title: `${alert.type || "System"} alert`,
  desc: alert.message || "System alert detected.",
  time: "JUST NOW",
});

const normalizeRecommendation = (recommendation, index) => ({
  id: `${recommendation.category || "recommendation"}-${index}`,
  title: `${recommendation.category || "System"} recommendation`,
  desc: recommendation.message || "Review this recommendation.",
});

const normalizeDashboardData = (dashboardData) => {
  if (!dashboardData) {
    return {
      currentGeneration: "0.0",
      predictedYield: "0.0",
      efficiency: "0.0",
      weather: { temp: 0, humidity: 0, uvIndex: "N/A" },
      alerts: [],
      recommendations: [],
    };
  }

  if (
    dashboardData.weather &&
    dashboardData.alerts &&
    dashboardData.recommendations
  ) {
    return dashboardData;
  }

  const forecast =
    dashboardData.forecast || dashboardData.analytics?.dailyEnergy || [];
  const weatherImpact = dashboardData.analytics?.weatherImpact || [];
  const firstWeather = weatherImpact[0] || {};
  const totalForecastEnergy = forecast.reduce(
    (sum, item) => sum + Number(item.energy || item.predicted_energy_kwh || 0),
    0,
  );
  const efficiencyScore =
    dashboardData.efficiency?.overall?.efficiencyScore ?? 0;

  // Use currentWeather if available, otherwise fallback to forecast weather
  const currentWeather = dashboardData.currentWeather || firstWeather;

  return {
    currentGeneration: formatNumber(dashboardData.heroCard?.energy),
    predictedYield: formatNumber(totalForecastEnergy),
    efficiency: formatNumber(efficiencyScore),
    weather: {
      temp: Math.round(Number(currentWeather.temperature || 0)),
      humidity: Math.round(Number(currentWeather.humidity || 0)),
      uvIndex:
        currentWeather.cloud_cover !== undefined
          ? `${Math.round(Number(currentWeather.cloud_cover))}% clouds`
          : "N/A",
    },
    alerts: (dashboardData.insights?.alerts || []).map(normalizeAlert),
    recommendations: (dashboardData.insights?.recommendations || []).map(
      normalizeRecommendation,
    ),
  };
};

const PanelList = () => {
  const { panels, totalPanels, loading, error } = usePanels();

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Your Solar Panels
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {totalPanels} configured {totalPanels === 1 ? "panel" : "panels"}.
              Choose one to open its dashboard.
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
            <p className="text-slate-500 dark:text-slate-400">
              Loading your panels...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-6">
            <p className="text-red-700 dark:text-red-200">
              Error loading panels: {error}
            </p>
          </div>
        )}

        {!loading && !error && panels.length === 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              No panels configured yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Add your first solar installation to generate predictions and
              dashboard insights.
            </p>
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
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                        Panel #{panel.userPanelId || panel.panel_id}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                        <MapPin size={16} />
                        {formatLocation(location)}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <SlidersHorizontal
                        className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors"
                        size={20}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                        Area
                      </p>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
                        {panel.area} m2
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                        Tilt
                      </p>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
                        {panel.tilt} deg
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                        Facing
                      </p>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
                        {panel.orientation}
                      </p>
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
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [hasFetchedDates, setHasFetchedDates] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const {
    data: dashboardData,
    loading,
    error,
  } = useDashboard(panelId, startDate, endDate);

  // Initially fetch without dates to get available dates
  React.useEffect(() => {
    if (panelId && !hasFetchedDates) {
      setHasFetchedDates(true);
    }
  }, [panelId, hasFetchedDates]);

  // Set default date range when available dates are loaded
  React.useEffect(() => {
    if (
      dashboardData?.meta?.availableDates &&
      dashboardData.meta.availableDates.length > 0 &&
      !startDate &&
      !endDate
    ) {
      const availableDates = dashboardData.meta.availableDates;
      const firstDate = availableDates[0];

      // Set a 5-day range by default
      setStartDate(firstDate);
      const lastDate = availableDates[Math.min(4, availableDates.length - 1)];
      setEndDate(lastDate);
      setSelectedDate(new Date(firstDate));
    }
  }, [dashboardData?.meta?.availableDates, startDate, endDate]);

  // Handle date dropdown change
  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);
    setSelectedDate(selected);
    const formattedDate = selected.toISOString().split("T")[0];
    
    // Set a 5-day range starting from the selected date
    setStartDate(formattedDate);
    const availableDates = dashboardData?.meta?.availableDates || [];
    const selectedIndex = availableDates.indexOf(formattedDate);
    const endIndex = Math.min(selectedIndex + 4, availableDates.length - 1);
    setEndDate(availableDates[endIndex]);
  };

  // Get available dates from database (all dates, not just current range)
  const getAvailableDates = () => {
    return dashboardData?.meta?.availableDates || [];
  };

  if (!panelId) {
    return <PanelList />;
  }

  const userPanelId = dashboardData?.meta?.userPanelId || panelId;
  const totalPanels = dashboardData?.meta?.totalPanels;

  if (loading && !dashboardData) {
    return (
      <Layout>
        <div className="p-8 max-w-7xl mx-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
            <p className="text-slate-500 dark:text-slate-400">
              Loading dashboard...
            </p>
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
            <p className="text-red-700 dark:text-red-200">
              Error loading dashboard: {error}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Page Header with Date Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Dashboard
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Live monitoring for Panel #{userPanelId}
              {totalPanels ? ` of ${totalPanels}` : ""}
            </p>
          </div>

          {/* Date Dropdown */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">
              Select Date:
            </label>
            <select
              value={
                selectedDate ? selectedDate.toISOString().split("T")[0] : ""
              }
              onChange={handleDateChange}
              className="bg-transparent border-none text-slate-900 dark:text-slate-100 font-semibold focus:outline-none cursor-pointer"
            >
              {getAvailableDates().map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-1 flex gap-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sun size={18} />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BarChart3 size={18} />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'alerts'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bell size={18} />
            Alerts
          </button>
        </div>

        {/* Dashboard Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <DashboardKPICards dashboardData={dashboardData} selectedPanelId={panelId} />

            {/* Hero Forecast Card */}
            <HeroForecastCard
              heroCard={dashboardData?.heroCard}
              currentWeather={dashboardData?.currentWeather}
              panelInfo={dashboardData?.db?.panel}
            />

            {/* Energy Forecast Chart */}
            <EnergyForecastChart forecast={dashboardData?.forecast} />

            {/* Weather vs Energy Chart */}
            <WeatherVsEnergyChart
              weatherImpact={dashboardData?.analytics?.weatherImpact}
            />

            {/* Weather Gauges */}
            <WeatherGauges currentWeather={dashboardData?.currentWeather} />
          </div>
        )}

        {/* Analytics Tab Content */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Efficiency Bar Chart */}
            <EfficiencyBarChart efficiencyData={dashboardData?.efficiency?.daily} />

            {/* Efficiency Breakdown Chart */}
            <EfficiencyBreakdownChart efficiencyData={dashboardData?.efficiency?.daily} />

            {/* Panel Performance Chart */}
            <PanelPerformanceChart
              panelPerformance={dashboardData?.analytics?.panelPerformance}
              selectedPanelId={panelId}
            />

            {/* Cloud Cover vs Energy Chart */}
            <CloudCoverVsEnergyChart weatherImpact={dashboardData?.analytics?.weatherImpact} />

            {/* Weekly Energy Distribution Chart */}
            <WeeklyEnergyDistributionChart distribution={dashboardData?.analytics?.distribution} />
          </div>
        )}

        {/* Alerts Tab Content */}
        {activeTab === 'alerts' && (
          <div className="space-y-8">
            {/* Alerts List */}
            <AlertsList alerts={dashboardData?.insights?.alerts} />

            {/* Recommendations List */}
            <RecommendationsList recommendations={dashboardData?.insights?.recommendations} />
          </div>
        )}
      </div>

      <button className="fixed bottom-8 right-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-4 rounded-2xl shadow-2xl active:scale-95 transition-all flex items-center gap-2 group z-50 hover:shadow-lg hover:shadow-blue-600/50">
        <Plus size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-sm whitespace-nowrap">
          View Report
        </span>
      </button>
    </Layout>
  );
};

export default Dashboard;
