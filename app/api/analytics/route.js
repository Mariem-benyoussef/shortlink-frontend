export async function GET(req) {
  try {
    // Extract query parameters from the request URL
    const url = new URL(req.url);
    const destination = url.searchParams.get("destination"); // Get the 'destination' query parameter

    // Build the URL for the Laravel API request
    const apiUrl = new URL("http://127.0.0.1:8000/analytics");
    if (destination) {
      apiUrl.searchParams.append("destination", destination); // Append 'destination' if provided
    }

    // Fetch data from the Laravel backend
    const response = await fetch(apiUrl.toString());

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the response with the data
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in fetchAnalytics:", error);

    // Return an error response
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
