import React from 'react';
import { useParams } from 'react-router-dom';
import { BarChart3, TrendingUp, Sun, Activity, Download, AlertTriangle } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import { useDashboard } from '../../hooks/useDashboard.js';
import EfficiencyChart from '../../components/analytics/EfficiencyChart.jsx';
import EfficiencyBreakdownChart from '../../components/analytics/EfficiencyBreakdownChart.jsx';
import PanelPerformanceChart from '../../components/analytics/PanelPerformanceChart.jsx';
import CloudCoverScatterPlot from '../../components/analytics/CloudCoverScatterPlot.jsx';

const Analytics = () => {
  const { panelId } = useParams();
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [hasFetchedDates, setHasFetchedDates] = React.useState(false);

  const { data: dashboardData, loading, error } = useDashboard(panelId, startDate, endDate);

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

  if (loading) {
    return (
      <Layout>
        <div className="p-8 max-w-7xl mx-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">Loading analytics...</p>
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
            <p className="text-red-700 dark:text-red-200">Error loading analytics: {error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  const userPanelId = dashboardData?.meta?.userPanelId || panelId;
  const totalPanels = dashboardData?.meta?.totalPanels;
  const dailyEfficiency = dashboardData?.efficiency?.daily || [];
  const panelPerformance = dashboardData?.analytics?.panelPerformance || [];
  const weatherImpact = dashboardData?.analytics?.weatherImpact || [];
  const totalEnergy = dashboardData?.analytics?.dailyEnergy?.reduce(
    (sum, item) => sum + Number(item.energy || 0),
    0,
  ) || 0;

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Page Header with Date Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Performance Analytics</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Detailed energy production and efficiency insights for Panel #{userPanelId}
              {totalPanels ? ` of ${totalPanels}` : ''}
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

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Energy */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl transition-all hover:-translate-y-1 flex flex-col justify-between h-40 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Total Energy</span>
              <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black tracking-tighter">↑ Recent</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">{Number(totalEnergy).toFixed(2)}</span>
                <span className="text-lg font-bold text-slate-500 dark:text-slate-400">kWh</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">Period total</p>
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
                <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">
                  {Number(
                    dailyEfficiency.reduce((sum, item) => sum + Number(item.efficiencyScore || 0), 0) /
                      (dailyEfficiency.length || 1)
                  ).toFixed(1)}
                </span>
                <span className="text-lg font-bold text-slate-500 dark:text-slate-400">%</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Average across period</p>
            </div>
          </div>

          {/* Peak Day */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl transition-all hover:-translate-y-1 flex flex-col justify-between h-40 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Peak Day</span>
              <Sun className="text-yellow-500" size={20} />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                  {Math.max(
                    ...dashboardData?.analytics?.dailyEnergy?.map((item) => Number(item.energy || 0)) || [0]
                  ).toFixed(2)}
                </span>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">kWh</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Highest daily output</p>
            </div>
          </div>

          {/* Weather Impact Days */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl transition-all hover:-translate-y-1 flex flex-col justify-between h-40 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Best Weather Day</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-[10px] font-bold text-green-600 dark:text-green-400">OPTIMAL</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                  {Math.min(
                    ...dashboardData?.analytics?.weatherImpact?.map((item) => Number(item.cloud_cover || 100)) || [0]
                  ).toFixed(0)}%
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Lowest cloud cover</p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Efficiency Bar Chart */}
          <EfficiencyChart dailyEfficiency={dailyEfficiency} />

          {/* Efficiency Breakdown Stacked Chart */}
          <EfficiencyBreakdownChart dailyEfficiency={dailyEfficiency} />
        </div>

        {/* Full Width Charts */}
        <div className="space-y-8">
          {/* Panel Performance Horizontal Bar Chart */}
          <PanelPerformanceChart panelPerformance={panelPerformance} selectedPanelId={panelId} />

          {/* Cloud Cover vs Energy Scatter Plot */}
          <CloudCoverScatterPlot weatherImpact={weatherImpact} />
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
