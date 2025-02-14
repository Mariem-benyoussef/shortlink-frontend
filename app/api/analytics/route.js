export async function GET(request) {
  try {
    const apiUrl = "http://127.0.0.1:8000/analytics";
    const response = await fetch(apiUrl);
    console.log("response1", response);

    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des données: ${response.statusText}`
      );
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in fetchAnalytics:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
}
