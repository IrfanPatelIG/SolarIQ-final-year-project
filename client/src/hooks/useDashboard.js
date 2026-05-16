import { useState, useEffect } from 'react';
import * as dashboardAPI from '../api/dashboardAPI.js';

export const useDashboard = (panelId) => {
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
        const response = await dashboardAPI.getDashboardData(panelId);
        setData(response.data || response);
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [panelId]);

  return { data, loading, error };
};
