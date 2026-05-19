import React from 'react';
import { AlertTriangle, Info, Zap, AlertCircle } from 'lucide-react';

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'high':
    case 'critical':
      return {
        border: 'border-red-500',
        bg: 'bg-red-50 dark:bg-red-900/20',
        icon: 'bg-red-100 dark:bg-red-900/30',
        iconColor: 'text-red-600 dark:text-red-400',
        badge: 'bg-red-500 text-white',
        line: 'bg-red-500',
      };
    case 'medium':
    case 'warning':
      return {
        border: 'border-yellow-500',
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        icon: 'bg-yellow-100 dark:bg-yellow-900/30',
        iconColor: 'text-yellow-600 dark:text-yellow-400',
        badge: 'bg-yellow-500 text-slate-900',
        line: 'bg-yellow-500',
      };
    case 'low':
    default:
      return {
        border: 'border-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        icon: 'bg-blue-100 dark:bg-blue-900/30',
        iconColor: 'text-blue-600 dark:text-blue-400',
        badge: 'bg-blue-500 text-white',
        line: 'bg-blue-500',
      };
  }
};

const AlertCard = ({ severity = 'low', type, message }) => {
  const colors = getSeverityColor(severity);

  const getIcon = () => {
    if (severity === 'high' || severity === 'critical') {
      return <AlertTriangle size={24} />;
    }
    if (severity === 'medium') {
      return <Zap size={24} />;
    }
    return <Info size={24} />;
  };

  return (
    <div
      className={`
        group bg-white dark:bg-slate-900 border-l-4 ${colors.line} p-6 rounded-lg
        transition-all duration-300 hover:shadow-lg hover:-translate-y-1
        flex items-start gap-4 relative overflow-hidden
        border border-slate-200 dark:border-slate-800
      `}
    >
      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${colors.icon}`}>
        <div className={colors.iconColor}>{getIcon()}</div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm ${colors.badge}`}>
            {severity.toUpperCase()}
          </span>
          {type && (
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 capitalize">
              {type}
            </span>
          )}
        </div>

        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
          {type?.charAt(0).toUpperCase() + type?.slice(1)} Alert
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{message}</p>
      </div>

      <button className="flex-shrink-0 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
        ✕
      </button>
    </div>
  );
};

export default AlertCard;
