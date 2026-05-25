import React from 'react';
import { useParams } from 'react-router-dom';
import { AlertTriangle, Lightbulb } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import { useDashboard } from '../../hooks/useDashboard.js';
import AlertCard from '../../components/alerts/AlertCard.jsx';
import RecommendationCard from '../../components/alerts/RecommendationCard.jsx';

const Alerts = () => {
  const { panelId } = useParams();
  const { data: dashboardData, loading, error } = useDashboard(panelId);

  const alerts = dashboardData?.insights?.alerts || [];
  const recommendations = dashboardData?.insights?.recommendations || [];
  const userPanelId = dashboardData?.meta?.userPanelId || panelId;
  const totalPanels = dashboardData?.meta?.totalPanels;

  if (loading) {
    return (
      <Layout>
        <div className="p-8 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">Loading alerts and recommendations...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-8 max-w-5xl mx-auto">
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-6">
            <p className="text-red-700 dark:text-red-200">Error loading alerts: {error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">System Alerts & Insights</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Real-time monitoring and actionable recommendations for Panel #{userPanelId}
            {totalPanels ? ` of ${totalPanels}` : ''}
          </p>
        </div>

        {/* Alerts Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">System Alerts</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {alerts.length} {alerts.length === 1 ? 'alert' : 'alerts'} detected
              </p>
            </div>
          </div>

          {alerts.length === 0 ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg p-6 text-center">
              <p className="text-green-700 dark:text-green-300 font-semibold">✓ No alerts at this time</p>
              <p className="text-green-600 dark:text-green-400 text-sm mt-2">Your solar system is operating normally.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <AlertCard
                  key={index}
                  severity={alert.severity}
                  type={alert.type}
                  message={alert.message}
                />
              ))}
            </div>
          )}
        </div>

        {/* Recommendations Section */}
        <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Lightbulb className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Recommendations</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {recommendations.length} {recommendations.length === 1 ? 'recommendation' : 'recommendations'} for optimization
              </p>
            </div>
          </div>

          {recommendations.length === 0 ? (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg p-6 text-center">
              <p className="text-blue-700 dark:text-blue-300 font-semibold">No recommendations at this time</p>
              <p className="text-blue-600 dark:text-blue-400 text-sm mt-2">Your system is already optimized.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <RecommendationCard
                  key={index}
                  priority={rec.priority}
                  category={rec.category}
                  message={rec.message}
                />
              ))}
            </div>
          )}
        </div>

        {/* Insights Score */}
        {dashboardData?.insights?.score && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 rounded-xl p-8 text-white mt-8">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold opacity-90">System Insight Score</h4>
                <p className="text-blue-100 text-sm mt-1">Overall system health and optimization</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-extrabold">{dashboardData?.insights?.score}</div>
                <div className="text-blue-100 text-sm">/ 100</div>
              </div>
            </div>
            <div className="mt-4 w-full bg-blue-500/20 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${dashboardData?.insights?.score}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Alerts;
