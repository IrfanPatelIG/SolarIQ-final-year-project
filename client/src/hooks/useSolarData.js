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
        console.log('🌞 Fetching solar data with config:', solarData);
        const response = await solarAPI.getSolarData(solarData);
        console.log('📊 Raw API Response:', response);
        const processedData = response.data || response;
        console.log('✅ Processed Solar Data:', processedData);
        setData(processedData);
      } catch (err) {
        setError(err.message || 'Failed to fetch solar data');
        console.error('❌ Solar data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(solarData)]);

  return { data, loading, error };
};
