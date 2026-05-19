import React from 'react';
import { Lightbulb, CheckCircle, AlertCircle, Info } from 'lucide-react';

const RecommendationsList = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400">No recommendations for this panel</p>
      </div>
    );
  }

  const getPriorityConfig = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
      case 'critical':
        return {
          icon: AlertCircle,
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-500',
          textColor: 'text-red-700 dark:text-red-200',
          badgeBg: 'bg-red-200 dark:bg-red-800',
          badgeText: 'text-red-800 dark:text-red-200',
        };
      case 'medium':
      case 'warning':
        return {
          icon: Lightbulb,
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
          icon: CheckCircle,
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
        <Lightbulb className="text-blue-600 dark:text-blue-400" size={24} />
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Recommendations
        </h3>
        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded-full">
          {recommendations.length}
        </span>
      </div>

      <div className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
        {recommendations.map((rec, index) => {
          const config = getPriorityConfig(rec.priority);
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
                      {rec.category || 'System'} Recommendation
                    </h4>
                    <span
                      className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${config.badgeBg} ${config.badgeText}`}
                    >
                      {rec.priority || 'info'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {rec.message || 'Review this recommendation.'}
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

export default RecommendationsList;
