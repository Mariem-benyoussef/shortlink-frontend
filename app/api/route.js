export async function POST(req) {
  try {
    const { chemin_personnalise } = await req.json();
    const response = await fetch(
      "http://127.0.0.1:8000/api/check-chemin-unique",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chemin_personnalise }),
      }
    );
    const data = await response.json();

    console.log("Laravel API response:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in cheminUnique:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
