import { useState, useEffect } from 'react';
import * as solarAPI from '../api/solarAPI.js';

export const useSolarData = (solarData = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!solarData) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await solarAPI.getSolarData(solarData);
        setData(response.data || response);
      } catch (err) {
        setError(err.message || 'Failed to fetch solar data');
        console.error('Solar data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(solarData)]);

  return { data, loading, error };
};
