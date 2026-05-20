import React from 'react';
import { Lightbulb, AlertCircle, Zap, Wrench } from 'lucide-react';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return {
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-300 dark:border-red-700',
        badge: 'bg-red-500 text-white',
        icon: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
      };
    case 'medium':
      return {
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        border: 'border-yellow-300 dark:border-yellow-700',
        badge: 'bg-yellow-500 text-slate-900',
        icon: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
      };
    case 'low':
    default:
      return {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-300 dark:border-blue-700',
        badge: 'bg-blue-500 text-white',
        icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      };
  }
};

const getCategoryIcon = (category) => {
  switch (category) {
    case 'panel':
      return <Wrench size={24} />;
    case 'performance':
      return <Zap size={24} />;
    case 'system':
      return <AlertCircle size={24} />;
    default:
      return <Lightbulb size={24} />;
  }
};

const RecommendationCard = ({ priority = 'medium', category, message }) => {
  const colors = getPriorityColor(priority);

  return (
    <div
      className={`
        bg-white dark:bg-slate-900 border ${colors.border} ${colors.bg}
        p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1
        flex items-start gap-4
      `}
    >
      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${colors.icon}`}>
        {getCategoryIcon(category)}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm ${colors.badge}`}>
            {priority}
          </span>
          {category && (
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 capitalize bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
              {category}
            </span>
          )}
        </div>

        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1 capitalize">
          {category} Recommendation
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{message}</p>
      </div>

      <button className="flex-shrink-0 text-slate-300 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
        →
      </button>
    </div>
  );
};

export default RecommendationCard;
