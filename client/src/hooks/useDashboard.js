import { useState, useEffect } from 'react';
import * as dashboardAPI from '../api/dashboardAPI.js';

export const useDashboard = (panelId, startDate = null, endDate = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!panelId) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await dashboardAPI.getDashboardData(panelId, startDate, endDate);
        setData(response.data || response);
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [panelId, startDate, endDate]);

  return { data, loading, error };
};
