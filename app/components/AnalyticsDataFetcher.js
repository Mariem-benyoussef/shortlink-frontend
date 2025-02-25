import { use, useEffect } from "react";

export default function AnalyticsDataFetcher({
  destination,
  setAnalyticsData,
  setError,
}) {
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        console.log("destination", destination);
        const encodedDestination = encodeURIComponent(destination); // Encode the destination URL
        console.log("Encoded destination", encodedDestination);

        const response = await fetch(
          `/api/shortlinks/destination/${encodedDestination}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch analytics: ${response.statusText}`);
        }

        const data = await response.json();

        const countriesData = processCountriesData(data.info);
        console.log("countriesData", countriesData);
        const devicesData = processDevicesData(data.info);
        console.log("devicesData", devicesData);
        const sourcesData = processSourcesData(data.info);
        console.log("sourcesData", sourcesData);

        setAnalyticsData({
          countries: countriesData,
          devices: devicesData,
          sources: sourcesData,
        });
      } catch (error) {
        console.error("Error in fetching analytics data:", error);
        setError(error.message);
      }
    };

    if (destination) {
      fetchAnalyticsData();
    }
  }, [destination, setAnalyticsData, setError]);

  const processCountriesData = (info) => {
    const countryMap = info.reduce((acc, entry) => {
      const country = entry.country;
      if (country) {
        acc[country] =
          (acc[country] || 0) + parseInt(entry.screenPageViewsPerUser);
      }
      return acc;
    }, {});

    return Object.keys(countryMap).map((country) => ({
      country,
      clicks: countryMap[country],
    }));
  };

  const processDevicesData = (info) => {
    const deviceMap = info.reduce((acc, entry) => {
      const device = entry.deviceCategory;
      if (device) {
        acc[device] =
          (acc[device] || 0) + parseInt(entry.screenPageViewsPerUser);
      }
      return acc;
    }, {});

    return Object.keys(deviceMap).map((device) => ({
      device,
      clicks: deviceMap[device],
    }));
  };
  const processSourcesData = (info) => {
    const sourceMap = info.reduce((acc, entry) => {
      const source = entry.sessionSource;
      if (source) {
        acc[source] =
          (acc[source] || 0) + parseInt(entry.screenPageViewsPerUser);
      }
      return acc;
    }, {});

    return Object.keys(sourceMap).map((source) => ({
      source,
      clicks: sourceMap[source],
    }));
  };

  return null;
}
