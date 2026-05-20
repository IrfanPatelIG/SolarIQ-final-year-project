import React from 'react';

const KPICard = ({ icon: Icon, label, value, unit = '', suffix = '', trend = null, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          {label}
        </span>
        {Icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">
          {value}
        </span>
        {unit && <span className="text-lg font-bold text-slate-500 dark:text-slate-400">{unit}</span>}
      </div>

      {suffix && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{suffix}</p>
      )}

      {trend && (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          <span className={`text-xs font-bold ${
            trend.type === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {trend.type === 'up' ? '↑' : '↓'} {trend.value}
          </span>
        </div>
      )}
    </div>
  );
};

export default KPICard;
