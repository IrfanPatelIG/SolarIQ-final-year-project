import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from 'lucide-react';

const HeroForecastCard = ({ heroCard, currentWeather, panelInfo }) => {
  if (!heroCard || !currentWeather) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400">Loading forecast data...</p>
      </div>
    );
  }

  const getWeatherIcon = (cloudCover) => {
    if (cloudCover > 80) return <CloudRain size={48} className="text-slate-500" />;
    if (cloudCover > 50) return <Cloud size={48} className="text-slate-500" />;
    return <Sun size={48} className="text-yellow-500" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 rounded-2xl p-8 text-white shadow-lg border border-blue-500/20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Energy Value */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-blue-100 text-sm font-semibold opacity-90 mb-2">Today's Forecast</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-extrabold">{Number(heroCard.energy).toFixed(2)}</span>
              <span className="text-2xl font-bold text-blue-100">kWh</span>
            </div>
          </div>
          <div className="text-blue-100 text-sm mt-4">
            <p>Panel: {panelInfo?.panel_id || 'N/A'}</p>
            <p className="text-xs opacity-75 mt-1">Orientation: {panelInfo?.orientation || 'N/A'} • Tilt: {panelInfo?.tilt || 'N/A'}°</p>
          </div>
        </div>

        {/* Center: Weather Icon */}
        <div className="flex flex-col items-center justify-center">
          {getWeatherIcon(currentWeather.cloud_cover)}
          <p className="text-blue-100 mt-3 text-sm font-medium capitalize">
            {currentWeather.description || `${Math.round(currentWeather.cloud_cover)}% Cloudy`}
          </p>
        </div>

        {/* Right: Weather Details */}
        <div className="space-y-3">
          <div className="bg-blue-500/20 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-blue-100 text-xs font-semibold opacity-75">Temperature</p>
            <p className="text-2xl font-bold">{Math.round(currentWeather.temperature)}°C</p>
          </div>
          <div className="bg-blue-500/20 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-blue-100 text-xs font-semibold opacity-75">Humidity</p>
            <p className="text-2xl font-bold">{Math.round(currentWeather.humidity)}%</p>
          </div>
          <div className="bg-blue-500/20 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-blue-100 text-xs font-semibold opacity-75">Cloud Cover</p>
            <p className="text-2xl font-bold">{Math.round(currentWeather.cloud_cover)}%</p>
          </div>
        </div>
      </div>

      {/* Date Info */}
      <div className="mt-6 pt-6 border-t border-blue-400/30">
        <p className="text-blue-100 text-sm font-medium">{formatDate(heroCard.date)}</p>
      </div>
    </div>
  );
};

export default HeroForecastCard;
