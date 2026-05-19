import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

const AlertsList = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400">No active alerts for this panel</p>
      </div>
    );
  }

  const getSeverityConfig = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
      case 'critical':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-500',
          textColor: 'text-red-700 dark:text-red-200',
          badgeBg: 'bg-red-200 dark:bg-red-800',
          badgeText: 'text-red-800 dark:text-red-200',
        };
      case 'medium':
      case 'warning':
        return {
          icon: AlertCircle,
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-500',
          textColor: 'text-yellow-700 dark:text-yellow-200',
          badgeBg: 'bg-yellow-200 dark:bg-yellow-800',
          badgeText: 'text-yellow-800 dark:text-yellow-200',
        };
      case 'low':
      case 'info':
      default:
        return {
          icon: Info,
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-500',
          textColor: 'text-blue-700 dark:text-blue-200',
          badgeBg: 'bg-blue-200 dark:bg-blue-800',
          badgeText: 'text-blue-800 dark:text-blue-200',
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Active Alerts
        </h3>
        <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-bold px-2 py-1 rounded-full">
          {alerts.length}
        </span>
      </div>

      <div className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
        {alerts.map((alert, index) => {
          const config = getSeverityConfig(alert.severity);
          const Icon = config.icon;

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${config.bgColor} ${config.borderColor}`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${config.textColor}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 capitalize">
                      {alert.type || 'System'} Alert
                    </h4>
                    <span
                      className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${config.badgeBg} ${config.badgeText}`}
                    >
                      {alert.severity || 'info'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {alert.message || 'System alert detected.'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsList;
