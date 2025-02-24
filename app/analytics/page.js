"use client";
import { useEffect, useState } from "react";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const fetchData = async () => {
      try {
        const apiUrl = "/api/analytics"; // Use absolute URL if needed, e.g., "https://example.com/api/analytics"
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(
            `Erreur lors de la récupération des statistiques: ${response.statusText}`
          );
        }

        const data = await response.json();
        if (isMounted) {
          setAnalyticsData(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup to avoid state updates on unmounted component
    };
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!analyticsData) return <p>Aucune donnée disponible</p>;

  return (
    <div>
      <h2>Statistiques Google Analytics</h2>

      <h3>Stats par clic</h3>
      <pre>{JSON.stringify(analyticsData.clickStats || {}, null, 2)}</pre>

      <h3>Stats par jour</h3>
      <pre>{JSON.stringify(analyticsData.dailyStats || {}, null, 2)}</pre>

      <h3>Stats par source</h3>
      <pre>{JSON.stringify(analyticsData.sourceStats || {}, null, 2)}</pre>

      <h3>Stats par type d’appareil</h3>
      <pre>{JSON.stringify(analyticsData.deviceStats || {}, null, 2)}</pre>

      <h3>Liens les plus performants</h3>
      <pre>{JSON.stringify(analyticsData.topLinks || {}, null, 2)}</pre>

      {/* Add shortlink stats if available */}
      {analyticsData.shortlinkStats && (
        <>
          <h3>Statistiques du Shortlink</h3>
          <pre>
            {JSON.stringify(analyticsData.shortlinkStats || {}, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
};

export default Analytics;
