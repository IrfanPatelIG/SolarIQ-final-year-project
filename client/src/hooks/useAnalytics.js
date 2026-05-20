import { useState, useEffect } from 'react';
import * as analyticsAPI from '../api/analyticsAPI.js';

export const useAnalytics = (type = 'daily-energy', params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        switch (type) {
          case 'daily-energy':
            response = await analyticsAPI.getDailyEnergy(params);
            break;
          case 'weather-impact':
            response = await analyticsAPI.getWeatherImpact(params);
            break;
          case 'distribution':
            response = await analyticsAPI.getEnergyDistribution(params);
            break;
          case 'panel-performance':
            response = await analyticsAPI.getPanelPerformance(params);
            break;
          case 'efficiency':
            response = await analyticsAPI.getPanelEfficiency(params);
            break;
          default:
            throw new Error('Invalid analytics type');
        }
        setData(response.data || response);
      } catch (err) {
        setError(err.message || 'Failed to fetch analytics data');
        console.error('Analytics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, JSON.stringify(params)]);

  return { data, loading, error };
};
