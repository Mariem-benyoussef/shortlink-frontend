import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/shortlinks`;

async function fetchShortlinkAnalytics(destination) {
  // Decode the URL to get the original destination
  const decodedDestination = decodeURIComponent(destination);

  const response = await fetch(`${API_URL}/destination/${decodedDestination}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Application: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Analytics not found");
  }

  return response.json();
}

// GET handler to fetch analytics for a shortlink
export async function GET(request, { params }) {
  try {
    const { destination } = await params;
    // console.log("Decoded Destination**********:", destination);

    const analytics = await fetchShortlinkAnalytics(destination);
    // console.log("Analytics Data*************:", analytics);

    // if (!Array.isArray(analytics.info)) {
    //   throw new Error("Invalid data format: 'info' is not an array");
    // }

    // Extract data from the 'info' array
    const infoData = analytics.info.map((entry) => ({
      city: entry.city,
      country: entry.country,
      date: entry.date,
      deviceCategory: entry.deviceCategory,
      sessionSource: entry.sessionSource,
      screenPageViewsPerUser: entry.screenPageViewsPerUser,
    }));

    // console.log("Extracted Analytics Data:", infoData);

    return NextResponse.json({
      destination: analytics.destination,
      info: infoData,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics", details: error.message },
      { status: 500 }
    );
  }
}
