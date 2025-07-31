import { useState, useEffect } from 'react';

const useDashboardInstances = () => {
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstances = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/`);
        console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);
        if (!res.ok) throw new Error('Failed to fetch instances');
        const data = await res.json();
        setInstances(data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstances();
  }, []);

  return { instances, loading, error };
};

export default useDashboardInstances;
