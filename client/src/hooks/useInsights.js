import { useState, useEffect } from 'react';
import * as insightsAPI from '../api/insightsAPI.js';

export const useInsights = (params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await insightsAPI.getInsights(params);
        setData(response.data || response);
      } catch (err) {
        setError(err.message || 'Failed to fetch insights');
        console.error('Insights fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(params)]);

  return { data, loading, error };
};
