import React from 'react';
import KPICard from './KPICard';
import { Zap, TrendingUp, Sun, Activity } from 'lucide-react';

const DashboardKPICards = ({ dashboardData, selectedPanelId }) => {
  if (!dashboardData) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400">Loading KPI data...</p>
      </div>
    );
  }

  const heroCard = dashboardData.heroCard || {};
  const forecast = dashboardData.forecast || [];
  const efficiency = dashboardData.efficiency?.overall || {};
  const meta = dashboardData.meta || {};

  // Calculate total energy from forecast
  const totalEnergy = forecast.reduce((sum, item) => sum + Number(item.energy || 0), 0);
  
  // Calculate average efficiency
  const avgEfficiency = efficiency.efficiencyScore || 0;

  return (
    <div className="space-y-6">
      {/* Selected Panel Main KPI Cards */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
          Selected Panel Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            icon={Zap}
            label="Today's Energy"
            value={Number(heroCard.energy || 0).toFixed(2)}
            unit="kWh"
            suffix={`Panel #${meta.userPanelId}`}
            color="blue"
          />
          <KPICard
            icon={TrendingUp}
            label="Total Forecast"
            value={totalEnergy.toFixed(2)}
            unit="kWh"
            suffix="Selected period"
            color="green"
          />
          <KPICard
            icon={Activity}
            label="Efficiency Score"
            value={avgEfficiency.toFixed(1)}
            unit="%"
            suffix="Overall performance"
            color="purple"
          />
          <KPICard
            icon={Sun}
            label="Weather Impact"
            value={Number(dashboardData.currentWeather?.cloud_cover || 0).toFixed(0)}
            unit="%"
            suffix="Cloud cover"
            color="yellow"
          />
        </div>
      </div>

      {/* Total System Overview KPI Cards */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
          Total System Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPICard
            icon={Sun}
            label="Total Panels"
            value={meta.totalPanels || 0}
            unit="panels"
            suffix="Configured"
            color="blue"
          />
          <KPICard
            icon={Zap}
            label="System Energy"
            value={(totalEnergy * (meta.totalPanels || 1)).toFixed(2)}
            unit="kWh"
            suffix="Estimated total"
            color="green"
          />
          <KPICard
            icon={Activity}
            label="Current Panel"
            value={`#${meta.userPanelId}`}
            unit=""
            suffix={`of ${meta.totalPanels} panels`}
            color="purple"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardKPICards;
