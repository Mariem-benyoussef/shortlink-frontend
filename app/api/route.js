// export async function POST(req) {
//   try {
//     const { chemin_personnalise } = await req.json();
//     const response = await fetch(
//       "http://127.0.0.1:8000/api/check-chemin-unique",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ chemin_personnalise }),
//       }
//     );
//     const data = await response.json();

//     console.log("Laravel API response:", data);

//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.error("Error in cheminUnique:", error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }
// export async function POST(req) {
//   try {
//     const { destination } = await req.json();
//     const response = await fetch(
//       "http://127.0.0.1:8000/api/check-destination-unique",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ destination }),
//       }
//     );
//     const data = await response.json();

//     console.log("Laravel API response:", data);

//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.error("Error in destinationUnique:", error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }

export async function POST(req) {
  try {
    const { chemin_personnalise, destination } = await req.json();

    let apiUrl = "";
    let requestBody = {};

    if (chemin_personnalise) {
      apiUrl = "http://127.0.0.1:8000/api/check-chemin-unique";
      requestBody = { chemin_personnalise };
    } else if (destination) {
      apiUrl = "http://127.0.0.1:8000/api/check-destination-unique";
      requestBody = { destination };
    } else {
      return new Response(JSON.stringify({ error: "Invalid request data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    // console.log("Laravel API response:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
