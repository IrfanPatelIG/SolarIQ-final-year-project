import { useState, useEffect } from 'react';
import * as dashboardAPI from '../api/dashboardAPI.js';

const unwrapDashboardPayload = (response) => {
  let payload = response;

  while (
    payload &&
    typeof payload === 'object' &&
    Object.prototype.hasOwnProperty.call(payload, 'data') &&
    (Object.prototype.hasOwnProperty.call(payload, 'success') ||
      Object.prototype.hasOwnProperty.call(payload, 'status') ||
      !payload.heroCard)
  ) {
    payload = payload.data;
  }

  return payload;
};

export const useDashboard = (panelId, startDate = null, endDate = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    if (!panelId) {
      setData(null);
      return () => {
        ignore = true;
      };
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await dashboardAPI.getDashboardData(panelId, startDate, endDate);
        if (!ignore) {
          setData(unwrapDashboardPayload(response));
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Failed to fetch dashboard data');
          console.error('Dashboard fetch error:', err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [panelId, startDate, endDate]);

  return { data, loading, error };
};
