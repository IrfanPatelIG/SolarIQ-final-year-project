import { useEffect, useState } from 'react';
import * as dashboardAPI from '../api/dashboardAPI.js';

export const usePanels = () => {
  const [panels, setPanels] = useState([]);
  const [totalPanels, setTotalPanels] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPanels = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await dashboardAPI.getUserPanels();
        const payload = response.data || response || {};
        const nextPanels = Array.isArray(payload) ? payload : payload.panels || [];

        setPanels(nextPanels);
        setTotalPanels(payload.totalPanels ?? nextPanels.length);
      } catch (err) {
        setError(err.message || 'Failed to fetch panels');
        console.error('Panel list fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPanels();
  }, []);

  return { panels, totalPanels, loading, error };
};
