import React from 'react';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

const CircularGauge = ({ value, max = 100, label, unit, icon: Icon, color = 'blue' }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    blue: {
      ring: 'text-blue-500',
      bg: 'text-blue-100 dark:text-blue-900/30',
      icon: 'text-blue-600 dark:text-blue-400',
    },
    orange: {
      ring: 'text-orange-500',
      bg: 'text-orange-100 dark:text-orange-900/30',
      icon: 'text-orange-600 dark:text-orange-400',
    },
    green: {
      ring: 'text-green-500',
      bg: 'text-green-100 dark:text-green-900/30',
      icon: 'text-green-600 dark:text-green-400',
    },
    purple: {
      ring: 'text-purple-500',
      bg: 'text-purple-100 dark:text-purple-900/30',
      icon: 'text-purple-600 dark:text-purple-400',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
      <div className="relative w-32 h-32 mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-slate-200 dark:text-slate-700"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colors.ring} transition-all duration-300`}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {Icon && <Icon size={24} className={colors.icon} />}
          <span className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            {Number(value).toFixed(0)}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">{unit}</span>
        </div>
      </div>

      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 text-center">{label}</h4>
    </div>
  );
};

const WeatherGauges = ({ currentWeather }) => {
  if (!currentWeather) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400">No weather data available</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Current Weather</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Real-time weather conditions</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <CircularGauge
          value={currentWeather.temperature || 0}
          max={50}
          label="Temperature"
          unit="°C"
          icon={Thermometer}
          color="orange"
        />
        <CircularGauge
          value={currentWeather.humidity || 0}
          max={100}
          label="Humidity"
          unit="%"
          icon={Droplets}
          color="blue"
        />
        <CircularGauge
          value={currentWeather.cloud_cover || 0}
          max={100}
          label="Cloud Cover"
          unit="%"
          icon={Cloud}
          color="purple"
        />
        <CircularGauge
          value={currentWeather.wind_speed || 0}
          max={30}
          label="Wind Speed"
          unit="m/s"
          icon={Wind}
          color="green"
        />
      </div>
    </div>
  );
};

export default WeatherGauges;
